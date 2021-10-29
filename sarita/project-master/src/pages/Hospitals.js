import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import APIServices from "../apiUtils/APIServices";
import HospitalForm from "../components/hospital/HospitalForm";

const Hospital = () => {
  const [hospital, setHospital] = useState();
  const [hospitalList, setHospitalList] = useState();
  const [showHospitalList, setShowHospitalList] = useState(true);

  useEffect(() => {
    if (!!hospitalList) {
    } else fetchHospital();
  }, [hospitalList]);
  const api = new APIServices("hospital");

  const fetchHospital = async () => {
    const { data, success } = await api.get();
    if (success) {
      setHospitalList(data?.data);
    }
  };

  const onCreate = async (data) => {
    const { success } = await api.post({ ...data,_id: undefined });
    if (success) {
      setShowHospitalList(true);
      fetchHospital();
    }
  };
  

  const onUpdate =async (data) => {
    const { success } = await api.put(data?._id, data);
    if (success) {
      setShowHospitalList(true);
      fetchHospital();
    }
  };

  const onDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete hospital :${name}`)) {
      const { success } = await api.delete(id);
      if (success) {
        alert(`Hospital deleted successfully. Name:${name}`);
        fetchHospital();
      }
    }
  };


  const submitHandler = (e) => {
    e.preventDefault();
    setHospital(undefined);
    const form = e.target;
    let isValid = true;
    let data = {};
    Array.from(form.elements).forEach((a) => {
      if (a.checkValidity()) {
        if (!!a.id) {
          if (a.type === "radio") data[a.id] = a.checked;
          else data[a.id] = a.value;
        }
      } else isValid = false;
    });
    if (!!isValid) !!data.id ? onUpdate(data) : onCreate(data);
  };

  return (
    <section className="d-flex justify-content-between">
      <div className="col col-4">
        <img src={require("../assets/images/hsptl.png")} alt="dp" />
      </div>

      <div className="col col-9 mt-4 bg-white p-4">
        <div
          className="col col-12 p-0"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0px 0px 10px 0px",
          }}
        >
          <div className="col col-3 h3 p-0">
            Hospital {!!showHospitalList ? "List" : "Form"}
          </div>
          <button
            className={`col col-2 btn btn-${
              showHospitalList ? "success" : "danger"
            } btn-sm m-0`}
            style={{ height: 40 }}
            onClick={(_) => setShowHospitalList(!showHospitalList)}
          >
            {showHospitalList ? "Add new Hospital" : "Back"}
          </button>
        </div>
        {showHospitalList ? (
          hospitalList?.length ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Services</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {hospitalList?.map((hospital) => (
                  <tr key={`hospital-${hospital?._id}`}>
                    <th scope="row">{hospital?.name}</th>
                    <td>{hospital?.address}</td>
                    <td>{hospital?.services}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faPen}
                    size="lg"
                    color="blue"
                    title="Edit"
                    onClick={(_) => {
                      setShowHospitalList(false);
                      setHospital(hospital);
                    }}
                  />
                  &nbsp; &nbsp;
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="lg"
                    color="red"
                    title="Delete"
                    onClick={(_) => onDelete(hospital?._id, hospital?.name)}
                  />
                </td>
              </tr>
            ))}
            </tbody>
          </table>
           ) : (
            <h4>No hospitals added yet.</h4>
          )
        ) : (
          <HospitalForm
            onSubmit={submitHandler}
            onCancel={(_) => {
              setShowHospitalList(true);
              setHospital();
            }}
            data={hospital}
          />
        )}
      </div>
    </section>
  );
};

export default Hospital;
