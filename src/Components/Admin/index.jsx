/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableListing from "../TableListing";
import Modal from "../Modal";
import "./index.css";
import { useAuth } from "../../utils/AuthProvider";
import data from "../../MOCK_DATA.json";

export const Admin = () => {
  const [iseditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { departments, permission, roles } = useAuth();
  const [editUser, setEditUser] = useState({
    email: "existing@emai.com",
    company: "Apple",
    department: "IT",
    status: false,
    permission: "",
    role: "User",
  });

  const columns = [
    { title: "Company", value: "company" },
    { title: "Email", value: "email" },
    { title: "Department", value: "department" },
    { title: "Role", value: "role" },
    {
      title: "Acknowledge",
      render: function (item) {
        const percent = Math.round((item.acknowledged / 1000) * 100);
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

  const handleEditClick = (e, item) => {
    e.preventDefault();
    setIsEditModalOpen((value) => !value);
    setEditUser(() => {
      return {
        ...editUser,
        ...item,
      };
    });
  };

  const handleDeleteClick = (e, item) => {
    e.preventDefault();
    toogleDeleteModal();
  };
  const handleConfirmDelete = (e, item) => {
    e.preventDefault();
    toast.success("User Deleted Successfully.");
    toogleDeleteModal();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    toast.success("User Edited Successfully.");
    setIsEditModalOpen(false);
  };

  return (
    <section className="admin_section">
      <TableListing columns={columns} data={data} sortBy="company" />
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
                {departments.map((dept, index) => (
                  <option key={`dept-${index}`} value={dept}>
                    {dept}
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
