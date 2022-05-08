import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../utils/AuthProvider";
import Card from "../Card";
import Search from "../Search";
import Modal from "../Modal";
import Loader from "../Loader";
import "./index.css";

const getNoticeList = async (department) => {
  try {
    const data = await axios.post("/api/notice/data", { department });
    return data;
  } catch (error) {
    toast.error("Something Went Wrong!");
  }
};

export const Dashboard = () => {
  const [department, setDepartment] = useState(""); // set users department initially
  const { token, departments } = useAuth();
  const emptyNotice = {
    title: "",
    notice: "",
    department: token.department,
    acknowledge: false,
  };
  const [isOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [noticeData, setNoticeData] = useState(emptyNotice);
  const [noticeLists, setNoticeList] = useState([]);
  const [isAcknowledgeModalOpen, setIsAcknowledgeModalOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      console.log({ departments });
      const noticeList = await getNoticeList(token.department);
      setDepartment(token.department);
      setNoticeList(noticeList.data.data);
    })();
  }, []);

  const tootgleModal = () => {
    setIsModalOpen((value) => !value);
  };

  const onChangeDepartment = (e) => {
    console.log({ Data: e.target.value });
    setDepartment(e.target.value);
  };

  const closeModal = () => {
    tootgleModal();
    setTimeout(() => {
      setIsEdit(false);
      setNoticeData(emptyNotice);
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

  const handleEditNotice = ({ data, index }) => {
    setIsEdit(true);
    console.log(data);
    setNoticeData(() => {
      return {
        ...noticeData,
        ...data,
        index,
      };
    });
    tootgleModal();
  };

  const handleSaveNotive = async () => {
    setIsLoading(true);
    if (isEdit) {
      const { index, _id } = noticeData;
      // Call API here
      try {
        await axios.put(`/api/notice/${_id}`, noticeData);
        noticeLists[index] = noticeData;
        setNoticeList(noticeLists);
        toast.success("Notice Edited Successfully.");
        setTimeout(() => {
          tootgleModal();
          setNoticeData(emptyNotice);
          setIsEdit(true);
        }, 500);
      } catch (error) {
        console.log(error);
        toast.error("Error Editing Notice");
      }
    } else {
      // Call API and wait for the response
      try {
        await axios.post("/api/add-notice", noticeData);
        const newData = [noticeData, ...noticeLists];
        setNoticeList(newData);
        toast.success("Created  Notice Successfully.");
        setTimeout(() => {
          tootgleModal();
        }, 500);
      } catch (error) {
        toast.error("Error Creating Notice");
      }
    }
    setIsLoading(false);
  };

  const handleAcknowledge = async () => {
    const { index, _id } = noticeData;
    console.log({ noticeData });
    try {
      await axios.put(`/api/acknowledge-notice/${token._id}`, {
        notice_id: _id,
      });
      noticeLists[index] = noticeData;
      setNoticeList(noticeLists);
      toast.success("Notice Acknowledged");
    } catch (error) {
      toast.error("Error Creating Notice");
    }

    toogleAcknowledgeModal();
  };

  const toogleAcknowledgeModal = () => {
    setNoticeData(emptyNotice);
    setIsAcknowledgeModalOpen((value) => !value);
  };

  const handleAcknowledgeClick = ({ index }) => {
    toogleAcknowledgeModal();
    const acknowledgedData = {
      ...noticeLists[index],
      acknowledge: true,
      index,
    };
    setNoticeData(acknowledgedData);
  };

  const isWritePermission = () => {
    console.log({ token });
    return ["User/w", "Admin"].includes(token.role);
  };

  return (
    <section>
      <div className="item_container">
        <div className="grid_item dashboard_aside">
          <div className="aside_items">
            <div className="icon">
              <i className="fa-solid fa-user"></i>
            </div>
            Authenticated as {token.email}, Dashboard (Protected)
          </div>
          <div className="aside_items search_container">
            <Search />
          </div>
          <div className="aside_items department_options">
            <select
              value={department}
              onChange={onChangeDepartment}
              name="department"
              disabled={token.role !== "Admin"}
            >
              <option value="" disabled hidden>
                Department
              </option>
              {departments.map((dept) => (
                <option
                  key={`dashboard-aside-dept-${dept._id}`}
                  value={dept.name}
                >
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid_item">
          {/* <h3>Search Results</h3> */}
          <div className="card_container">
            <div className="cards">
              {noticeLists.map((data, index) => (
                <Card
                  key={`card-${data._id}`}
                  index={index}
                  data={data}
                  onEdit={handleEditNotice}
                  onAcknowledge={handleAcknowledgeClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isWritePermission() && (
        <div id="add_button">
          <button className="add_notice" onClick={tootgleModal}>
            <i className="fa-solid fa-circle-plus"></i>
          </button>
        </div>
      )}
      <Modal isOpen={isOpen} toggleModal={closeModal}>
        <div className="edit_form">
          <form>
            <h2> {isEdit ? "Edit" : "Create"} Notice</h2>
            <div className="input-group">
              <select
                value={noticeData.department}
                onChange={handleEditChange}
                name="department"
              >
                {departments.map((dept) => (
                  <option key={`edit-form-dept-${dept._id}`} value={dept.name}>
                    {dept.name}
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
              {/* {isEdit ? "Edit" : "Create"}{" "} */}
              {loading ? <Loader /> : isEdit ? "Edit" : "Create"}
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
