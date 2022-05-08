/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableListing from "../TableListing";
import Modal from "../Modal";
import "./index.css";
import { useAuth } from "../../utils/AuthProvider";
import axios from "axios";

const getAllUsers = async (company) => {
  try {
    return await axios.post("/api/user", {
      company,
    });
  } catch (error) {
    toast.error("Something Went Wrong!");
  }
};
export const Admin = () => {
  const [iseditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { departments, permission, roles, token } = useAuth();
  const [editUser, setEditUser] = useState({
    email: "",
    company: "",
    department: "",
    status: true,
    permission: "",
    role: "User",
  });
  const [users, setUsers] = useState([]);
  const [noticeCount, setNoticeCount] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await getAllUsers(token && token.company);
      const noticeList = await axios.post("/api/notice/data", {
        department: token.department,
      });
      setNoticeCount(noticeList.data.noticeCount | 1);
      setUsers(res.data.data);
    })();
  }, []);

  const columns = [
    { title: "Company", value: "company" },
    { title: "Email", value: "email" },
    { title: "Department", value: "department" },
    { title: "Role", value: "role" },
    {
      title: "Acknowledge",
      render: function (item) {
        console.log({ item });
        const percent = Math.round(
          (item.acknowledge.length / noticeCount) * 100
        ); // TODO : replace 1000 with actuall notice counts
        return (
          <div
            className="balance"
            style={{
              background: `linear-gradient(to right, #f5b921 ${percent}%, #f2f2f2 ${percent}%)`,
            }}
          >
            {percent} %
          </div>
        );
      },
    },
    {
      title: "Actions",
      render: function (item, index) {
        return (
          <div className="action">
            <button
              type="button"
              onClick={(e) => handleEditClick(e, item, index)}
              className="edit_button"
            >
              <i className="fa-solid fa-pen-circle"></i>
            </button>
            <button
              type="button"
              onClick={(e) => handleDeleteClick(e, item, index)}
              className="delete_button"
            >
              <i className="fa-solid fa-circle-trash"></i>
            </button>
          </div>
        );
      },
    },
  ];

  const toogleDeleteModal = () => {
    setIsDeleteModalOpen((value) => !value);
  };

  const handleEditChange = (e) => {
    setEditUser(() => {
      return {
        ...editUser,
        [e.target.name]: e.target.value,
      };
    });
  };
  useEffect(() => {
    setEditUser(() => {
      return {
        ...editUser,
        permission: permission[editUser.role],
      };
    });
  }, [editUser.role]);

  const handleEditClick = (e, item, index) => {
    e.preventDefault();
    setIsEditModalOpen((value) => !value);
    setEditUser(() => {
      return {
        ...editUser,
        ...item,
        index,
      };
    });
  };

  const handleDeleteClick = (e, item, index) => {
    e.preventDefault();
    setEditUser(() => {
      return {
        ...editUser,
        ...item,
        index,
      };
    });
    toogleDeleteModal();
  };
  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    try {
      const { index } = editUser;
      await axios.delete(`api/user/${editUser._id}`);
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
      toast.success("User Deleted Successfully.");
    } catch (error) {
      toast.error("Error Deleting User.");
    }
    toogleDeleteModal();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const { index, ...payload } = editUser;
      await axios.put(`api/user/${editUser._id}`, payload);
      const updatedUsers = users;
      updatedUsers[index] = payload;
      setUsers(updatedUsers);
      toast.success("User Edited Successfully.");
    } catch (error) {
      toast.error("Error Editing User.");
    }
    setIsEditModalOpen(false);
  };

  return (
    <section className="admin_section">
      <TableListing columns={columns} data={users} sortBy="company" />
      <Modal
        isOpen={iseditModalOpen}
        toggleModal={() => setIsEditModalOpen((value) => !value)}
      >
        <div className="edit_form">
          <form>
            <h2>Edit User</h2>
            <div className="input-group">
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleEditChange}
                placeholder="Email Address"
              />
              <label>Email Address</label>
            </div>
            <div className="input-group">
              <input
                type="text"
                name="company"
                value={editUser.company}
                onChange={handleEditChange}
                readOnly
              />
              <label>Company</label>
            </div>
            <div className="input-group">
              <select
                value={editUser.department}
                onChange={handleEditChange}
                name="department"
              >
                <option value="" disabled hidden>
                  Department
                </option>
                {departments.map((dept) => (
                  <option key={`dept-${dept._id}`} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <label>Department</label>
            </div>
            <div className="input-group">
              <select
                value={editUser.role}
                onChange={handleEditChange}
                name="role"
              >
                {roles.map((dept, index) => (
                  <option key={`dept-${index}`} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <label>Role</label>
            </div>
            <div className="input-group">
              <input
                type="text"
                name="permission"
                value={editUser.permission}
                readOnly
              />
              <label>Permission</label>
            </div>
            <label className="switch">
              <div className="input-group">
                <input
                  className="switch__input"
                  type="checkbox"
                  name="status"
                  checked={editUser.status}
                  onChange={(e) => {
                    handleEditChange({
                      target: {
                        name: e.target.name,
                        value: e.target.checked,
                      },
                    });
                  }}
                />
                <i className="switch__icon"></i>
                <span className="switch__span">
                  {editUser.status ? "Active" : "Deactive"}
                </span>
                <label>Status</label>
              </div>
            </label>

            <button type="button" onClick={handleEdit}>
              Save
            </button>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        toggleModal={toogleDeleteModal}
        type="alert"
        onCancel={toogleDeleteModal}
        onConfirm={handleConfirmDelete}
      >
        <h4>Are you sure you want delete this user? </h4>
      </Modal>
    </section>
  );
};
