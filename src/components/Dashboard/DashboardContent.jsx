import "./DashboardContent.css";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "../../constant/constant";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IdContext } from "../../context/AuthContext";
import CropImg from "../../utils/CropImg";
import ConfirmationPopup from "../../utils/Popup";
import Loader from "../../utils/Loader";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parse, format } from 'date-fns';
const DashboardContent = () => {
  
  const [doctordata, setDoctordata] = useState([]);
  const [name, setName] = useState("");
  const [birthdate1, setBirthdate] = useState(null);
  const [qualification, setQualification] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [mclcode, setMclcode] = useState("");
  const [img, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cropmodel, setCropmodel] = useState(false);
  const [img1, setImage1] = useState("");
  const [cropper, setCropper] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
   

  
  // custem birthdate logic

  //const [startDate, setStartDate] = useState(null);
  const minDate = new Date('1960-01-01');
    
  //console.log(startDate && startDate.toLocaleDateString('en-GB'))
  //const {empId} = useContext(IdContext);
 //console.log(birthdate1)
  const empId = sessionStorage.getItem("userId");

  const getCropData = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], "docimage.png");
        });
      if (file) {
        setImage(file);
      }
    }
    setCropmodel(false);
  };

  const setCropperFun = (cropvalue) => {
    setCropper(cropvalue);
  };

  useEffect(() => {
    getDoctor();
  }, []);

  async function getDoctor() {
    console.log("empid", empId);
    const response = await fetch(`${BASEURL}/getdoctoremp/${empId}`);
    const data = await response.json();
    setDoctordata(data);
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!img || !name || !birthdate1 || !speciality ||!mclcode || !qualification) {
      toast.error("Missing required fields");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      setShowConfirmation(false);
      setLoading(true);
      const formdata = new FormData();
      const birthdate2 = birthdate1.toLocaleDateString('en-GB')
      const birthdate = birthdate2.replace(/\//g, '-');
      console.log(birthdate)
      formdata.append("empId", empId);
      formdata.append("image", img);
      formdata.append("name", name);
      formdata.append("birthdate", birthdate);
      formdata.append("speciality", speciality);
      formdata.append("qualification", qualification);
      formdata.append("mclcode", mclcode);

       const doctorPromise = await axios.post(`${BASEURL}/add-doctor`, formdata);

       let doctor_id = doctorPromise.data.doctorId;

       await getDoctor();
       setLoading(false);
       toast.success("Doctor created successfully");
      setLoading(false);
      navigate(`/dashboard/poster/${doctor_id}`)
    } catch (error) {
      console.log(error);
    }
    setName("");
    setBirthdate("");
    setSpeciality("");
    setImage("");
    setMclcode("");
    setQualification("");
    
  };
  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <div
        className="content-header"
        style={{ backgroundColor: "#c36eca", color: "#fff" }}
      >
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6"></div>
            <div className="col-sm-12 text-right">
              <p className="text-center" style={{ fontSize: "25px" }}>
                Total Doctor : {doctordata && doctordata.length}
                <button
                  type="button"
                  id="Login1"
                  className="btn btn-primary float-right"
                  data-toggle="modal"
                  data-target="#adddoc"
                >
                  Add Doctor
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <section className="content mt-5">
          <div className="container-fluid">
            <div className="row">
              {doctordata &&
                doctordata.map((doctor, i) => {
                  return (
                    <DoctorList
                      key={i}
                      uploadFile={""}
                      getDoctor={getDoctor}
                      doctor={doctor}
                    ></DoctorList>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      <div
        className="modal fade show"
        id="adddoc"
        data-backdrop="static"
        data-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        style={{ paddingRight: "17px" }}
        aria-modal="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close basicedit"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>

              <div id="container">
              <div className="contentdiv active">
                    <form id="formlogin" onSubmit={handelSubmit}>
                      <div id="Register" className="AddDocMain text-cente">
                        <h3>Add Doctors Details</h3>
                        <div className="docphoto">
                          <div className=" text-center">
                            <img
                              src={
                                img
                                  ? URL.createObjectURL(img)
                                  : "/images/userimg.png"
                              }
                              alt=""
                              className="avatar1"
                            />
                            <label htmlFor="upload-input">
                              <div className="icon-container">
                                <i className="fas fa-pen"></i>
                              </div>
                            </label>
                            <input
                              id="upload-input"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                setCropmodel(true);
                                setImage1(
                                  URL.createObjectURL(e.target.files[0])
                                );
                              }}
                            />
                            <p>Doctor Photo</p>
                          </div>
                        </div>
                        <div className="docform">
                          <div className="row mt-2">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Dr Name*</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  // id="Name"

                                  value={name}
                                  onChange={(e) => {
                                    setName(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Date of Birth*</label>
                                <DatePicker
       selected={birthdate1}
      onChange={(date) => setBirthdate(date)}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      minDate={minDate} // Set the minimum date
      placeholderText="DD-MM-YYYY"
      dateFormat="dd-MM-yyyy"
      className="form-control"
    />
                              </div>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Qualification*</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Qualification"
                                  maxLength="18"
                                  value={qualification}
                                  onChange={(e) => {
                                    setQualification(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Speciality*</label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="speciality"
                                  value={speciality}
                              
                                  onChange={(e) => {
                                    setSpeciality(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>MCL code*</label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="mclcode"
                                  value={mclcode}
                              
                                  onChange={(e) => {
                                    setMclcode(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="text-center mt-3">
                            <input type="submit" value="Submit" id="Login1" className="docbtn btn btn-success"/>
                            <span className="error regspan"></span>
                            <div
                              style={{
                                fontSize: "13px",
                                color: "#ca1111",
                                textAlign: "left",
                                fontWeight: "700",
                              }}
                            >
                              * Some fields are mandatory to fill.
                              <br />* Image size should be less than 5 MB
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>

                    {cropmodel && (
                      <CropImg
                        img1={img1}
                        setCropperFun={setCropperFun}
                        getCropData={getCropData}
                      />
                    )}
                  </div>
              </div>
            </div>
          </div>
        </div>
        {showConfirmation && (
          <ConfirmationPopup
            message="Are you sure you want to Add Doctor?"
            onConfirm={() => handleConfirm()}
            onCancel={handleCancel}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardContent;

function DoctorList({ doctor, getDoctor }) {

  const inputDateString = doctor.dateofbirth;



  // Split the input date string by '-' to get day, month, and year components
  const [day, month, year] = inputDateString.split('-');
  
  // Rearrange the components to form the "yyyy-mm-dd" format
  const convertedDateString = `${year}-${month}-${day}`;
  
  console.log("converted date",convertedDateString);
  // Format the Date object
  //const formattedDate = parsedDate.toString();
  //console.log(for)

  const [img, setImage] = useState(null);
  const [name, setName] = useState(doctor.name);
  const [birthdate1, setBirthdate] = useState(new Date(convertedDateString));
  const [qualification, setQualification] = useState(doctor.qualification);
  const [speciality, setSpeciality] = useState(doctor.speciliaty);
  const [mclcode, setMclcode] = useState(doctor.mclcode);
  const [cropmodel, setCropmodel] = useState(false);
  const [img1, setImage1] = useState("");
  const [cropper, setCropper] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const minDate = new Date('1960-01-01');
  
  console.log("in edit section ", birthdate1)
  const getCropData = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], "docimage.png");
        });
      if (file) {
        setImage(file);
      }
    }
    setCropmodel(false);
  };

  const setCropperFun = (cropvalue) => {
    setCropper(cropvalue);
  };

  const handelEditSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmation(true);

  };

  const handelDelete = async (id) => {
    try {
      await axios.delete(`${BASEURL}/delete/${id}`);
      await getDoctor();
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = async (id) => {
    setShowConfirmation(false);
    setLoading1(true);
    try {
      
      
     

       let birthdate2 = birthdate1.toLocaleDateString('en-GB')
       var birthdate = birthdate2.replace(/\//g, '-');
     
      
      const formdata = new FormData();
      formdata.append("image", img);
      formdata.append("name", name);
      formdata.append("birthdate", birthdate);
      formdata.append("speciality", speciality);
      formdata.append("qualification", qualification);
      formdata.append("mclcode", mclcode);

      const doctorPromise = await axios.patch(
        `${BASEURL}/update/${id}`,
        formdata
      );
      await getDoctor();
      toast.success("Doctor Update successfully");
    } catch (error) {
      console.log(error);
    } finally {
      // Hide the loader when the operation is complete
      setLoading1(false);
    }
  };
  const handleCancel = () => {
    // Hide the confirmation popup
    setShowConfirmation(false);
    // Handle cancellation as needed...
  };

  const modalId = `infodoc-${doctor.id}`;
  const editId = `editdoc-${doctor.id}`;

  return (
    <div className="col-md-2 p-1">
      {loading1 ? (
        <Loader />
      ) : (
        <div className="card doc_card">
          <div style={{ position: "relative" }}>
            <div className="img__wrap text-center">
              <img
                id=""
                src={`${BASEURL}/uploads/${doctor.imgurl}`}
                width="199"
                height="177"
                className="img__img"
              />

              <div id="outer" className="img__description">
                <div className="inner">
                  <Link to={`poster/${doctor.id}`} title="View">
                    <i className="nav-icon fas fa-image"></i>
                  </Link>
                </div>

                <div className="inner">
                  <a
                    title="Info"
                    data-toggle="modal"
                    data-target={`#${modalId}`}
                  >
                    <i className="nav-icon fas fa-info"></i>
                  </a>
                </div>

                <div className="inner">
                  <a
                    href=""
                    title="Edit"
                    data-toggle="modal"
                    data-target={`#${editId}`}
                  >
                    <i className="nav-icon fas fa-edit"></i>
                  </a>
                </div>

                <div className="inner" onClick={() => handelDelete(doctor.id)}>
                  <a title="Delete">
                    <i className="nav-icon fas fa-trash"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body ">
            <h5
              className="card-title text-center"
              style={{ fontSize: "1.0rem" }}
            >
              <b>{doctor.name}</b>
            </h5>
          </div>
        </div>
      )}

<div
        className="modal fade show"
        id={modalId}
        // data-backdrop="static"
        //data-keyboard="false"
        style={{ paddingRight: "17px" }}
        //aria-labelledby={`${modalId}-label`}
        // aria-modal="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close basicedit"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>

              <div id="Register1" className="AddDocMain text-center">
                <h3> Doctors Details</h3>
                <div className="docphoto">
                  <img
                    // src="dist/img/avatar04.png"
                    src={`${BASEURL}/uploads/${doctor.imgurl}`}
                    alt="doctor-photo"
                    //className="img-circle img-fluid"
                    className="avatar1"
                  />

                  <p>Doctor Photo</p>
                </div>
                <div className="docform">
                  <div className="row mt-2">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Dr Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="Name1"
                          maxLength="50"
                          //tabIndex="1"
                          placeholder=" "
                          value={`Dr. ${doctor.name}`}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>BirthDate</label>
                        <input
                          type="text"
                          className="form-control"
                          id={`BirthDate-${doctor.id}`}
                        
                        
                          value={doctor.dateofbirth}                          
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Qualification*</label>
                        <input
                          type="text"
                          className="form-control"
                          id={`Qualification-${doctor.id}`}
                          maxLength="18"
                          disabled
                          value={doctor.qualification}
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Speciality</label>
                        <input
                          type="text"
                          id={`Speciality-${doctor.id}`}
                          className="form-control"
                          maxLength="200"
                          placeholder=" "
                          disabled
                          value={doctor.speciliaty}                          
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>MCL code</label>
                        <input
                          type="text"
                          id={`mclcode-${doctor.id}`}
                          className="form-control"
                          
                          disabled
                          value={doctor.mclcode}                          
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade show"
        id={editId}
        style={{ paddingRight: "17px" }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close basicedit"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <form onSubmit={(e) => handelEditSubmit(e)}>
                <div className="AddDocMain text-center">
                  <h3>Edit Doctors Details</h3>
                  <div className="docphoto">
                    <div className=" text-center">
                      <img
                        src={
                          img
                            ? URL.createObjectURL(img)
                            : `${BASEURL}/uploads/${doctor.imgurl}`
                        }
                        alt=""
                        className="avatar1"
                      />

                      {/* <label htmlFor="upload-input1">
                                          <div className="icon-container">
                                            <i className="fas fa-pen"></i>
                                          </div>
                                        </label> */}
                      <input
                        // id="upload-input1"
                        style={{ display: "block" }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setCropmodel(true);
                          setImage1(URL.createObjectURL(e.target.files[0]));
                        }}
                      />
                      <p>Doctor Photo</p>
                    </div>
                  </div>
                  <div className="docform">
                    <div className="row mt-2">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Dr Name*</label>
                          <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Birth Date*</label>
                          <DatePicker
      selected={birthdate1}
      onChange={(date) => setBirthdate(date)}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      minDate={minDate} // Set the minimum date
      placeholderText=""
      dateFormat="dd-MM-yyyy"
      className="form-control"
    />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Qualification*</label>
                          <input
                            type="text"
                            className="form-control"
                            maxLength="18"
                            value={qualification}
                            onChange={(e) => {
                              setQualification(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Speciality*</label>
                          <input
                            type="text"
                            className="form-control"
                            
                            value={speciality}
                            onChange={(e) => {
                              setSpeciality(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>MCL code*</label>
                          <input
                            type="text"
                            className="form-control"
                          
                            value={mclcode}
                            onChange={(e) => {
                              setMclcode(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <input
                        type="submit"
                        value="Submit"
                        style={{ width: "22%" }}
                        className="docbtn btn btn-success"
                      />
                      <span className="error regspan"></span>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#ca1111",
                          textAlign: "left",
                          fontWeight: "700",
                        }}
                      >
                        * Some fields are mandatory to fill.
                        <br />* Image size should be less than 5 MB
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              {cropmodel && (
                <CropImg
                  img1={img1}
                  setCropperFun={setCropperFun}
                  getCropData={getCropData}
                />
              )}
            </div>
            {showConfirmation && (
              <ConfirmationPopup
                message="Are you sure you want to Edit Doctor?"
                onConfirm={() => handleConfirm(doctor.id)}
                onCancel={handleCancel}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

