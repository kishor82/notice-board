import { useEffect, useState } from "react";
import TableListing from "../TableListing";
import Modal from "../Modal";
import "./index.css";
import { useAuth } from "../../utils/AuthProvider";

const data = [
  {
    planYear: 2016,
    desc: "In-Network Deductible",
    type: "Individual",
    current: 469.62,
    max: 1000,
  },
  {
    planYear: 2017,
    desc: "Out-of-Network Out-of-Pocket",
    type: "Individual",
    current: 834.98,
    max: 1500,
  },
  {
    planYear: 2016,
    desc: "Out-of-Network Deductible",
    type: "Family",
    current: 203.41,
    max: 3000,
  },
  {
    planYear: 2017,
    desc: "In-Network Deductible",
    type: "Individual",
    current: 568.91,
    max: 3000,
  },
  {
    planYear: 2017,
    desc: "In-Network Out-of-Pocket",
    type: "Family",
    current: 34.48,
    max: 1000,
  },
  {
    planYear: 2017,
    desc: "Out-of-Network Deductible",
    type: "Family",
    current: 334.58,
    max: 1000,
  },
  {
    planYear: 2017,
    desc: "Out-of-Network Out-of-Pocket",
    type: "Family",
    current: 792.09,
    max: 1500,
  },
  {
    planYear: 2017,
    desc: "Out-of-Network Deductible",
    type: "Individual",
    current: 269.64,
    max: 3000,
  },
  {
    planYear: 2016,
    desc: "Out-of-Network Deductible",
    type: "Family",
    current: 321.46,
    max: 1000,
  },
  {
    planYear: 2017,
    desc: "Out-of-Network Deductible",
    type: "Individual",
    current: 393.79,
    max: 1000,
  },
  {
    planYear: 2017,
    desc: "Out-of-Network Out-of-Pocket",
    type: "Individual",
    current: 284.33,
    max: 1000,
  },
  {
    planYear: 2017,
    desc: "Out-of-Network Out-of-Pocket",
    type: "Individual",
    current: 504.29,
    max: 1500,
  },
  {
    planYear: 2016,
    desc: "In-Network Out-of-Pocket",
    type: "Individual",
    current: 554.94,
    max: 3000,
  },
  {
    planYear: 2016,
    desc: "In-Network Deductible",
    type: "Family",
    current: 255.86,
    max: 1000,
  },
  {
    planYear: 2016,
    desc: "In-Network Deductible",
    type: "Individual",
    current: 254.34,
    max: 1500,
  },
  {
    planYear: 2017,
    desc: "Out-of-Network Deductible",
    type: "Individual",
    current: 693.35,
    max: 1000,
  },
  {
    planYear: 2017,
    desc: "In-Network Out-of-Pocket",
    type: "Family",
    current: 674.62,
    max: 3000,
  },
  {
    planYear: 2016,
    desc: "In-Network Deductible",
    type: "Individual",
    current: 803.1,
    max: 3000,
  },
  {
    planYear: 2016,
    desc: "In-Network Out-of-Pocket",
    type: "Family",
    current: 181.98,
    max: 1500,
  },
  {
    planYear: 2017,
    desc: "Out-of-Network Deductible",
    type: "Individual",
    current: 871.33,
    max: 3000,
  },
];
export const Admin = () => {
  const [iseditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { companies, departments, permission, roles } = useAuth();
  const [editUser, setEditUser] = useState({
    email: "existing@emai.com",
    company: "Apple",
    department: "IT",
    status: false,
    permission: "",
    role: "User",
  });

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
  const handleEdit = (e, item) => {
    e.preventDefault();
    setIsEditModalOpen((value) => !value);
    console.log("><><><>Edit", item);
  };

  const handleDelete = (e, item) => {
    e.preventDefault();
    console.log("Delete", { item });
    toogleDeleteModal();
  };
  const columns = [
    { title: "Plan Year", value: "planYear" },
    { title: "Description", value: "desc" },
    { title: "Type", value: "type" },
    { title: "Current", value: "current" },
    { title: "Maximum", value: "max" },
    {
      title: "Acknowledge",
      render: function (item) {
        const max = item.max.toFixed(2);
        const percent = Math.round((item.current / max) * 100);
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
      render: function (item) {
        return (
          <div className="action">
            <button
              type="button"
              onClick={(e) => handleEdit(e, item)}
              className="edit_button"
            >
              <i className="fa-solid fa-pen-circle"></i>
            </button>
            <button
              type="button"
              onClick={(e) => handleDelete(e, item)}
              className="delete_button"
            >
              <i className="fa-solid fa-circle-trash"></i>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <section>
      <TableListing columns={columns} data={data} sortBy="current" />
      <Modal
        isOpen={iseditModalOpen}
        toggleModal={() => setIsEditModalOpen((value) => !value)}
      >
        <div className="edit_form">
          <form>
            <h2>Edit User</h2>
            <div class="input-group">
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleEditChange}
                placeholder="Email Address"
              />
              <label>Email Address</label>
            </div>
            <div class="input-group">
              <select
                value={editUser.company}
                onChange={handleEditChange}
                name="company"
              >
                {companies.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </select>
              <label>Company</label>
            </div>
            <div class="input-group">
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
            <div class="input-group">
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
                <i class="switch__icon"></i>
                <span class="switch__span">
                  {editUser.status ? "Active" : "Deactive"}
                </span>
                <label>Status</label>
              </div>
            </label>

            <button type="button" onClick={() => console.log(editUser)}>
              Save
            </button>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        toggleModal={toogleDeleteModal}
        type="alert"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={() => toogleDeleteModal()}
      >
        <h4>Are you sure you want delete this user? </h4>
      </Modal>
    </section>
  );
};
