import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import APIServices from '../apiUtils/APIServices';
import DoctorForm from '../components/doctor/DoctorForm';

const Doctor = () => {
  const [doctor, setDoctor] = useState();
  const [doctorList, setDoctorList] = useState();
  const [showDoctorList, setShowDoctorList] = useState(true);
  const [filteredDoctor, setFilteredDoctor] = useState(doctorList);
  const [searchDoctor, setSearchDoctor] = useState('');

  const dataToUse = searchDoctor ? filteredDoctor : doctorList;

  useEffect(() => {
    if (!!doctorList) {
    } else fetchDoctor();
  }, [doctorList]);

  const api = new APIServices('doctor');

  const fetchDoctor = async () => {
    const { data, success } = await api.get();
    if (success) {
      //setDoctorList(data?.data);
      setDoctorList(data?.data);
    }
  };

  const onCreate = async (data) => {
    const { success } = await api.post({ ...data, _id: undefined });
    if (success) {
      setShowDoctorList(true);
      fetchDoctor();
    }
  };

  const onUpdate = async (data) => {
    const { success } = await api.put(data?._id, data);
    if (success) {
      setShowDoctorList(true);
      fetchDoctor();
    }
  };

  const onDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete doctor :${name}`)) {
      const { success } = await api.delete(id);
      if (success) {
        alert(`Doctor deleted successfully. Name:${name}`);
        fetchDoctor();
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setDoctor(undefined);
    const form = e.target;
    let isValid = true;
    let data = {};
    Array.from(form.elements).forEach((a) => {
      if (a.checkValidity()) {
        if (!!a.id) {
          if (a.type === 'radio') data[a.id] = a.checked;
          else data[a.id] = a.value;
        }
      } else isValid = false;
    });
    if (!!isValid) !!data._id ? onUpdate(data) : onCreate(data);
  };

  //useEffect(() => {
    //const listClone = [...doctorList];
    //const data = listClone.filter((el) =>
      //el.name.toUpperCase().includes(searchDoctor.toUpperCase())
    //);
    //setFilteredDoctor(data);
  //}, [searchDoctor, doctorList]);

  return (
    <section className='d-flex justify-content-between'>
      <div className='col col-2'>
        <img src={require('../assets/images/doctor.png')} alt='dp' />
      </div>

      <div className='col col-9 mt-4 bg-white p-4'>
        <div
          className='col col-12 p-0'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0px 0px 10px 0px',
          }}
        >
          <div className='col col-3 h3 p-0'>
            Doctor {!!showDoctorList ? 'List' : 'Form'}
          </div>
          <button
            className={`col col-2 btn btn-${
              showDoctorList ? 'success' : 'danger'
            } btn-sm m-0`}
            style={{ height: 40 }}
            onClick={(_) => setShowDoctorList(!showDoctorList)}
          >
            {showDoctorList ? 'Add new Doctor' : 'Back'}
          </button>
        </div>
        {showDoctorList && (
          <input
            type='text'
            placeholder='Search Doctors'
            className='input'
            onChange={(e) => setSearchDoctor(e.target.value)}
            value={searchDoctor}
          />
        )}
        {showDoctorList ? (
          dataToUse?.length ? (
            <>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>NMC No.</th>
                    <th scope='col'>Full Name</th>
                    <th scope='col'>Qualification</th>
                    <th scope='col'>Works At</th>
                    <th scope='col'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataToUse?.map((doctor) => (
                    <tr key={`doctor-${doctor?._id}`}>
                      <th scope='row'>{doctor?.nmcNo}</th>
                      <td>{doctor?.name}</td>
                      <td>{doctor?.qualification}</td>
                      <td>{doctor?.worksAt}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          size='lg'
                          color='blue'
                          title='Edit'
                          onClick={(_) => {
                            setShowDoctorList(false);
                            setDoctor(doctor);
                          }}
                        />
                        &nbsp; &nbsp;
                        <FontAwesomeIcon
                          icon={faTrash}
                          size='lg'
                          color='red'
                          title='Delete'
                          onClick={(_) => onDelete(doctor?._id, doctor?.name)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <h4>No doctors added yet.</h4>
          )
        ) : (
          <DoctorForm
            onSubmit={submitHandler}
            onCancel={(_) => {
              setShowDoctorList(true);
              setDoctor();
            }}
            data={doctor}
          />
        )}
      </div>
    </section>
  );
};

export default Doctor;
