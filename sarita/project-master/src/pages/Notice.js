import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import APIServices from "../apiUtils/APIServices";
import NoticeForm from "../components/notice/NoticeForm";

const Notice = () => {
  const [notice, setNotice] = useState();
  const [noticeList, setNoticeList] = useState();
  const [showNoticeList, setShowNoticeList] = useState(true);

  useEffect(() => {
    if (!!noticeList) {
    } else fetchNotice();
  }, [noticeList]);
  const api = new APIServices("notice");

  const fetchNotice = async () => {
    const { data, success } = await api.get();
    if (success) {
      setNoticeList(data);
    }
  };

  const onCreate =async  (data) => {
    const { success } = await api.post({ ...data,_id: undefined });
    if (success) {
      setShowNoticeList(true);
      fetchNotice();
    }
  };

  const onUpdate = async (data) => {
    const { success } = await api.put(data?._id, data);
    if (success) {
      setShowNoticeList(true);
      fetchNotice();
    }
  };

  const onDelete = async (id, name) => {
     if (window.confirm(`Are you sure you want to delete notice :${name}`)) {
      const { success } = await api.delete(id);
      if (success) {
        alert(`Notice deleted successfully. Name:${name}`);
        fetchNotice();
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setNotice(undefined);
    const form = e.target;
    let isValid = true;
    let data = {};
    Array.from(form.elements).forEach((a) => {
      if (a.checkValidity()) {
        if (!!a.id) data[a.id] = a.value;
      } else isValid = false;
    });
    if (!!isValid) !!data.id ? onUpdate(data) : onCreate(data);
  };

  return (
    <section className="d-flex justify-content-between">
     

      <div className="col col-12 mt-4 bg-white p-4">
        <div
          className="col col-12 p-0"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0px 0px 10px 0px",
          }}
        >
          <div className="col col-3 h3 p-0">
          Notice {!!showNoticeList ? "List" : "Form"}
          </div>
          <button
            className={`col col-2 btn btn-${
              showNoticeList ? "success" : "danger"
            } btn-sm m-0`}
            style={{ height: 40 }}
            onClick={(_) => setShowNoticeList(!showNoticeList)}
          >
            {showNoticeList ? "Add new Notice" : "Back"}
          </button>
        </div>
        {showNoticeList ? (
          noticeList?.length ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
             {noticeList?.map((notice) => (
                  <tr key={`notice-${notice?._id}`}>
                    <th scope="row">{notice?.date}</th>
                    <td>{notice?.title}</td>
                    <td>{notice?.description}</td>
                    <td>
                  <FontAwesomeIcon
                    icon={faPen}
                    size="lg"
                    color="blue"
                    title="Edit"
                    onClick={(_) => {
                      setShowNoticeList(false);
                      setNotice();
                    }}
                  />
                  &nbsp; &nbsp;
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="lg"
                    color="red"
                    title="Delete"
                    onClick={(_) => onDelete(notice?._id, notice?.name)}
                  />
                </td>
              </tr>
             ))}
            </tbody>
          </table>
          ) : (
            <h4> No notices added yet.</h4>
          )
        ) : (
          <NoticeForm
            onSubmit={submitHandler}
            onCancel={(_) => {
              setShowNoticeList(true);
              setNotice();
            }}
            data={notice}
          />
        )}
      </div>
    </section>
  );
};

export default Notice;
