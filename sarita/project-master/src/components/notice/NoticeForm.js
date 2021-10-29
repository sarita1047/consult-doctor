import React from "react";

const NoticeForm = ({ onSubmit, onCancel, data }) => {
  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <input type="hidden" id="id" value={data?.id} />
        <div className="form-row">
          <InputField
            id="date"
            type="date"
            value={data?.date}
            label="Date"
            width={4}
          />
          <InputField
            id="title"
            value={data?.phone}
            label="Title"
            width={4}
          />
         
          
          <InputField
            id="descritption"
            value={data?.description}
            label="Description"
            width={4}
          
          />
          
        </div>
        <div className="form-row">
          <button
            className="btn btn-sm btn-primary col-2 m-2"
            style={{ height: 40 }}
          >
            Save
          </button>
          <button
            className="btn btn-sm btn-danger col-2 m-2"
            style={{ height: 40 }}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeForm;

const InputField = ({ id, value, label, width = 6, ...rest }) => (
  <div className={`form-group form-group-1 col-${width}`}>
    <label htmlFor={id}>{label}</label>
    <input className="form-control" id={id} defaultValue={value} {...rest} />
  </div>
);
