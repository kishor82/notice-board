import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../utils/AuthProvider";
import Card from "../Card";
import Search from "../Search";
import Modal from "../Modal";
import "./index.css";
const data = [
  {
    image: "http://placeimg.com/400/200/animals",
    title: "This is title",
    notice:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
    date: "20/2/2022",
  },
  {
    image: "http://placeimg.com/400/200/tech",
    title: "This is title",
    notice:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
    date: "20/2/2022",
  },
  {
    image: "http://placeimg.com/400/200/people",
    title: "This is title",
    notice:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
    date: "20/2/2022",
  },
  {
    image: "http://placeimg.com/400/200/nature",
    title: "This is title",
    notice:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
    date: "20/2/2022",
  },
  {
    image: "http://placeimg.com/400/200/animals",
    title: "This is title",
    notice:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
    date: "20/2/2022",
  },
  {
    image: "http://placeimg.com/400/200/animals",
    title: "This is title",
    notice:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
    date: "20/2/2022",
  },
  {
    image: "http://placeimg.com/400/200/animals",
    title: "This is title",
    notice:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
    date: "20/2/2022",
  },
  {
    image: "http://placeimg.com/400/200/animals",
    title: "This is title",
    notice:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
    date: "20/2/2022",
  },
  {
    image: "http://placeimg.com/400/200/cars",
    title: "This is title",
    notice:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
    date: "20/2/2022",
  },
];

export const Dashboard = () => {
  const emptyNotice = {
    title: "",
    notice: "",
    department: "",
    acknowledge: false,
  };
  const [department, setDepartment] = useState(""); // set users department initially
  const { token, departments } = useAuth();
  const [isOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [noticeData, setNoticeData] = useState(emptyNotice);
  const [noticeLists, setNoticeList] = useState([...data]);
  const [isAcknowledgeModalOpen, setIsAcknowledgeModalOpen] = useState(false);

  const tootgleModal = () => {
    setIsModalOpen((value) => !value);
  };

  const onChangeDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const closeModal = () => {
    tootgleModal();
    setTimeout(() => {
      setIsEdit(false);
    }, 500);
  };

  const handleEditChange = (e) => {
    setNoticeData(() => {
      return {
        ...noticeData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleEditNotice = (data) => {
    setIsEdit(true);
    setNoticeData(() => {
      return {
        ...noticeData,
        ...data,
      };
    });
    tootgleModal();
  };

  const handleSaveNotive = () => {
    if (isEdit) {
      const { index } = noticeData;
      data[index] = noticeData;
      setNoticeList(data);
      toast.success("Notice Edited Successfully.");
      setTimeout(() => {
        tootgleModal();
        setNoticeData(emptyNotice);
        setIsEdit(false);
      }, 500);
    } else {
      // Call API and wait for the response
      const newData = [noticeData, ...noticeLists];
      setNoticeList(newData);
      toast.success("Added Notice Successfully.");
      setTimeout(() => {
        tootgleModal();
      }, 500);
    }
  };

  const handleAcknowledge = () => {
    const { index } = noticeData;
    data[index] = noticeData;
    setNoticeList(data);
    toast.success("Notice Acknowledged");
    toogleAcknowledgeModal();
  };

  const toogleAcknowledgeModal = () => {
    setNoticeData(emptyNotice);
    setIsAcknowledgeModalOpen((value) => !value);
  };

  const handleAcknowledgeClick = ({ index }) => {
    toogleAcknowledgeModal();
    const acknowledgedData = {
      ...data[index],
      acknowledge: true,
      index,
    };
    console.log(data);
    setNoticeData(acknowledgedData);
  };

  return (
    <section>
      <div className="item_container">
        <div className="grid_item dashboard_aside">
          <div className="aside_items">
            <div className="icon">
              <i className="fa-solid fa-user"></i>
            </div>
            Authenticated as {token}, Dashboard (Protected)
          </div>
          <div className="aside_items search_container">
            <Search />
          </div>
          <div className="aside_items department_options">
            <select
              value={department}
              onChange={onChangeDepartment}
              name="department"
            >
              <option value="" disabled hidden>
                Department
              </option>
              {departments.map((dept, index) => (
                <option key={`dashboard-aside-dept-${index}`} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid_item">
          {/* <h3>Search Results</h3> */}
          <div className="card_container">
            <div className="cards">
              {noticeLists.map(
                ({ image, title, date, notice, acknowledge }, index) => (
                  <Card
                    key={`card-${index}`}
                    image={image}
                    index={index}
                    title={title}
                    date={date}
                    notice={notice}
                    acknowledge={acknowledge}
                    onEdit={handleEditNotice}
                    onAcknowledge={handleAcknowledgeClick}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div id="add_button">
        <button className="add_notice" onClick={tootgleModal}>
          <i className="fa-solid fa-circle-plus"></i>
        </button>
      </div>
      <Modal isOpen={isOpen} toggleModal={closeModal}>
        <div className="edit_form">
          <form>
            <h2> {isEdit ? "Edit" : "Create"} Notice</h2>
            <div className="input-group">
              <select value={""} onChange={handleEditChange} name="department">
                <option value="" disabled hidden>
                  Department
                </option>
                {departments.map((dept, index) => (
                  <option key={`edit-form-dept-${index}`} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <label>Department</label>
            </div>
            <div className="input-group">
              <input
                type="text"
                name="title"
                value={noticeData.title}
                onChange={handleEditChange}
                placeholder="Title"
              />
              <label>Title</label>
            </div>
            <div className="input-group">
              <span>
                <textarea
                  name="notice"
                  rows="12"
                  value={noticeData.notice}
                  onChange={handleEditChange}
                />
              </span>
              <label>Notice</label>
            </div>
            <div></div>
            <button type="button" onClick={handleSaveNotive}>
              {isEdit ? "Edit" : "Create"}
            </button>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={isAcknowledgeModalOpen}
        toggleModal={toogleAcknowledgeModal}
        type="alert"
        onCancel={toogleAcknowledgeModal}
        onConfirm={handleAcknowledge}
      >
        <h4>Are you sure? Confirm Acknowledge!</h4>
      </Modal>
    </section>
  );
};
