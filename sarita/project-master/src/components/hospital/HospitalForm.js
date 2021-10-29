import React from "react";

const HospitalForm = ({ onSubmit, onCancel, data }) => {
  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <input type="hidden" id="id" value={data?.id} />
        <div className="form-row">
          <InputField
            id="name"
            value={data?.name}
            label="Name"
            width={4}
          />
          <InputField
            id="phone"
            type="number"
            value={data?.phone}
            label="Phone"
            width={4}
          />
          <InputField
            id="address"
            value={data?.address}
            label="Address"
            width={4}
          />
          
          <InputField
            id="services"
            value={data?.services}
            label="Services"
            width={4}
          />
          <InputField
            id="parking"
            value={data?.parking}
            label="Parking"
            width={4}
          />
          {/* <InputField
            id="Open"
            value={data?.open}
            label="Open"
            width={4}
          /> */}
          
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

export default HospitalForm;

const InputField = ({ id, value, label, width = 6, ...rest }) => (
  <div className={`form-group form-group-1 col-${width}`}>
    <label htmlFor={id}>{label}</label>
    <input className="form-control" id={id} defaultValue={value} {...rest} />
  </div>
);
