import "./DashboardContent.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASEURL } from "../../constant/constant";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IdContext } from "../../context/AuthContext";
import CropImg from "../../utils/CropImg";
import ConfirmationPopup from "../../utils/Popup";
import Loader from "../../utils/Loader";
import ImageSelector from "../../utils/ImgSelector";

const DashboardContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [doctordata, setDoctordata] = useState([]);

  const [name, setName] = useState("");
  const [city, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [img, setImage] = useState("");
  const [qualification, setQualification] = useState("");
  const [loading, setLoading] = useState(false);
  const [cropmodel, setCropmodel] = useState(false);
  const [img1, setImage1] = useState("");
  const [cropper, setCropper] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [posimg, setCombinedImageUrl] = useState("");
  const images = [
    {
      id: 1,
      category: "hairloss",
      languages: ["english", "hindi"],
      urlEnglish: "/images/enHair_Loss.jpg",
      urlHindi: "/images/A3poster1.jpg",
    },
    {
      id: 2,
      category: "melasma",
      languages: ["english", "hindi"],
      urlEnglish: "/images/A3poster.jpg",
      urlHindi: "/images/hiMelasma.jpg",
    },
  ];
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("hairloss");
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  console.log(selectedImages);
  const toggleImageSelection = (imageUrl) => {
    if (selectedImages.includes(imageUrl)) {
      setSelectedImages(selectedImages.filter((url) => url !== imageUrl));
    } else {
      setSelectedImages([...selectedImages, imageUrl]);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const filteredImages = images.filter(
    (image) =>
      image.category === selectedCategory &&
      image.languages.includes(selectedLanguage)
  );

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  //const {empId} = useContext(IdContext);

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
    if (!img || !name || !city || !mobile || !qualification) {
      toast.error("Missing required fields");
      return;
    }
    setShowConfirmation(true);

    // try {
    //   toast.info("Loading...");
    //   //setLoading(true);
    //   const formdata = new FormData();

    //   formdata.append("empId",empId)
    //    formdata.append("image",img)
    //    formdata.append("name",name)
    //    formdata.append("city",city)
    //    formdata.append("mobile",mobile)
    //    formdata.append("qualification",qualification)
    //    await axios.post(`${BASEURL}/add-doctor`, formdata);

    //   await getDoctor();
    //   toast.success('Doctor created successfully');
    //  // setLoading(false);
    // ///uploading poster related to doctor
    // // console.log("first")
    // // let image1 = URL.createObjectURL(img)
    // // const profileUrl = image1;
    // // const posterUrl = '../../dist/img/Hair_Loss.jpg'
    // // const doctorName = name;
    // // const doctorDesignation = "Cardiologist";

    // // console.log("come till heare1")
    // // combineImages(profileUrl, posterUrl, doctorName, doctorDesignation)
    // //   .then(async(combinedImageUrl) => {
    // //     // setCombinedImageUrl(combinedImageUrl);
    // // console.log("come till heare2");

    // //     const posterUrl = await uploadFile(combinedImageUrl);
    // //     console.log("poster url",posterUrl);
    // //   })
    // //   .catch((error) => {
    // //     console.error("Error combining images:", error);
    // //   });

    // } catch (error) {
    //   console.log(error);
    // }
    // setName("");
    // setAddress("");
    // setMobile("");
    // setImage("");
    // setQualification("")
  };

  const handleConfirm = async () => {
    try {
      setShowConfirmation(false);
      //setLoading(true);
      const formdata = new FormData();

      formdata.append("empId", empId);
      formdata.append("image", img);
      formdata.append("name", name);
      formdata.append("city", city);
      formdata.append("mobile", mobile);
      formdata.append("qualification", qualification);
      // const doctorPromise = await axios.post(`${BASEURL}/add-doctor`, formdata);

      // let doctor_id = doctorPromise.data.doctorId;

      // await getDoctor();
      // setLoading(false);
      // toast.success("Doctor created successfully");

      // axios
      //   .post(`${BASEURL}/saveSelection`, {
      //     doctorId: doctor_id,
      //     selectedImageUrls: selectedImages,
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      // setLoading(false);
      //uploading poster related to doctor
      console.log("first");
      let image1 = URL.createObjectURL(img);
      const profileUrl = image1;
      const posterUrl = "/images/enHair_Loss.jpg";
      const doctorName = name;
      const doctorDesignation = qualification;

      console.log("come till heare1");
      console.log(profileUrl, doctorName, doctorDesignation);
      combineImages(profileUrl, posterUrl, doctorName, doctorDesignation)
        .then(async (combinedImageUrl) => {
          setCombinedImageUrl(combinedImageUrl);
          console.log(combinedImageUrl);
          console.log("come till heare2");

          //     const posterUrl = await uploadFile(combinedImageUrl);
          //     console.log("poster url",posterUrl);
        })
        .catch((error) => {
          console.error("Error combining images:", error);
        });
    } catch (error) {
      console.log(error);
    }
    setName("");
    setAddress("");
    setMobile("");
    setImage("");
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
                  className="docbtn btn btn-primary float-right"
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
                {currentIndex === 1 ? (
                  <div className="contentdiv active">
                    <form id="formlogin" onSubmit={handelSubmit}>
                      <div id="Register" className="AddDocMain text-center">
                        <h3>Select Poster</h3>

                        <div className="form-group mt-2">
                          <label htmlFor="categorySelect">
                            Select Category:
                          </label>
                          <select
                            className="form-control"
                            id="categorySelect"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                          >
                            <option value="hairloss">Hair Loss</option>
                            <option value="melasma">Melasma</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="languageSelect">
                            Select Language:
                          </label>
                          <select
                            className="form-control"
                            id="languageSelect"
                            value={selectedLanguage}
                            onChange={handleLanguageChange}
                          >
                            <option value="english">English</option>
                            <option value="hindi">Hindi</option>
                            <option value="marathi">Marathi</option>
                          </select>
                        </div>

                        <div className="docform mt-1" style={{ height: "" }}>
                          <div className="container-fluid">
                            <div className="image-list">
                              {filteredImages.map((image) => (
                                <div
                                  key={image.id}
                                  className={`image-item ${
                                    selectedImages.includes(
                                      image[
                                        `url${
                                          selectedLanguage
                                            .charAt(0)
                                            .toUpperCase() +
                                          selectedLanguage.slice(1)
                                        }`
                                      ]
                                    )
                                      ? "selected"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    toggleImageSelection(
                                      image[
                                        `url${
                                          selectedLanguage
                                            .charAt(0)
                                            .toUpperCase() +
                                          selectedLanguage.slice(1)
                                        }`
                                      ]
                                    )
                                  }
                                >
                                  <img
                                    style={{ width: "150px", height: "180px" }}
                                    src={
                                      image[
                                        `url${
                                          selectedLanguage
                                            .charAt(0)
                                            .toUpperCase() +
                                          selectedLanguage.slice(1)
                                        }`
                                      ]
                                    }
                                    alt={`Image ${image.id}`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <input
                        className="btn btn-primary"
                        style={{ width: "200px", marginLeft: "20vw" }}
                        type="submit"
                      />
                    </form>
                  </div>
                ) : (
                  <div className="contentdiv active">
                    <form id="formlogin">
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
                                <label>Address*</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Address"
                                  maxLength="18"
                                  placeholder=" "
                                  value={city}
                                  onChange={(e) => {
                                    setAddress(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Mobile*</label>
                                <input
                                  className="form-control"
                                  type="tel"
                                  name="mobileNumber"
                                  value={mobile}
                                  pattern="\d{10}"
                                  maxLength="10"
                                  onChange={(e) => {
                                    setMobile(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
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
                          </div>
                          <div className="text-center mt-3">
                            {/* <input type="submit" style={{ width: "22%" }} value="Submit" id="Login1" className="docbtn btn btn-success"/> */}
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
                )}
              </div>
              <button
                id="previousButton"
                className="btn btn-primary "
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                id="nextButton"
                className="btn btn-primary float-right"
                onClick={handleNext}
              >
                Next
              </button>
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
  const [img, setImage] = useState(null);
  const [name, setName] = useState(doctor.name);
  const [city, setAddress] = useState(doctor.city);
  const [mobile, setMobile] = useState(doctor.mobile);
  const [qualification, setQualification] = useState(doctor.qualification);
  const [cropmodel, setCropmodel] = useState(false);
  const [img1, setImage1] = useState("");
  const [cropper, setCropper] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading1, setLoading1] = useState(false);

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

    // try {
    //   const formdata = new FormData();

    //    formdata.append("image",img)
    //    formdata.append("name",name)
    //    formdata.append("city",city)
    //    formdata.append("mobile",mobile)
    //    formdata.append("qualification",qualification)

    //   const doctorPromise = await axios.patch(`${BASEURL}/update/${id}`, formdata);
    //   await getDoctor();
    //   toast.success("Doctor Update successfully");
    //   setName('');
    //   setAddress('');
    //   setMobile('');
    //   setImage('');
    //   setQualification('')
    // } catch (error) {
    //   console.log(error);
    // }
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
      const formdata = new FormData();

      formdata.append("image", img);
      formdata.append("name", name);
      formdata.append("city", city);
      formdata.append("mobile", mobile);
      formdata.append("qualification", qualification);

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
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id={`Address-${doctor.id}`}
                          maxLength="200"
                          placeholder=" "
                          value={doctor.city}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Mobile</label>
                        <input
                          type="text"
                          id={`Mobile-${doctor.id}`}
                          className="form-control"
                          maxLength="200"
                          placeholder=" "
                          disabled
                          value={doctor.mobile}
                        />
                      </div>
                    </div>

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
                              setName(e.target.value.trim());
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Address*</label>
                          <input
                            type="text"
                            className="form-control"
                            maxLength="18"
                            value={city}
                            onChange={(e) => {
                              setAddress(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Mobile*</label>
                          <input
                            className="form-control"
                            type="tel"
                            name="mobileNumber"
                            value={mobile}
                            pattern="\d{10}"
                            maxLength="10"
                            onChange={(e) => {
                              setMobile(e.target.value);
                            }}
                          />
                        </div>
                      </div>
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

// function combineImages(profileUrl, posterUrl, doctorName, doctorDesignation) {
//   console.log("running comine images")
//   return new Promise((resolve) => {
//     const profileImg = new Image();
//     const posterImg = new Image();
//     console.log("running comine images1")

//     profileImg.src = profileUrl;
//     posterImg.src = posterUrl;
//     console.log("running comine images2")

//     profileImg.onload = () => {
//     console.log("running comine images5")

//       posterImg.onload = () => {
//     console.log("running comine images55")

//         const canvas = document.createElement("canvas");
//         canvas.width = posterImg.width;
//         canvas.height = posterImg.height;

//         const ctx = canvas.getContext("2d");

//         ctx.drawImage(posterImg, 0, 0, posterImg.width, posterImg.height);

//         // Draw the profile image in a circle
//         const profileX = 200; // Adjust the position of the profile image
//         const profileY = 2200; // Adjust the position of the profile image
//         const profileSize = 600; // Adjust the size of the circular profile image

//         ctx.save();
//         ctx.beginPath();
//         ctx.arc(profileX + profileSize / 2, profileY + profileSize / 2, profileSize / 2, 0, Math.PI * 2);
//         ctx.closePath();
//         ctx.clip();
//         ctx.drawImage(profileImg, profileX, profileY, profileSize, profileSize);
//         ctx.restore();

//         ctx.font = "100px Arial";
//         ctx.fillStyle = "black";

//         //const textX = (canvas.width - ctx.measureText(doctorName).width) / 2;
//         //const textY = canvas.height - 100;

//         ctx.fillText(doctorName, 850, 2420);
//         ctx.fillText(doctorDesignation, 850, 2580);
//         console.log("running comine images3")

//         const dataUrl = canvas.toDataURL("image/png");
//         console.log("running comine images4")

//         resolve(dataUrl);
//       };
//     };
//   });
// }

function combineImages(profileUrl, doctorName, doctorDesignation) {
  return new Promise((resolve) => {
    const posterUrl = "/images/enHair_Loss.jpg"; // Update the poster URL here
    const profileImg = new Image();
    const posterImg = new Image();

    profileImg.onload = () => {
      posterImg.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = posterImg.width;
        canvas.height = posterImg.height;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(posterImg, 0, 0, posterImg.width, posterImg.height);

        // Draw the profile image in a circle
        const profileX = 200; // Adjust the position of the profile image
        const profileY = 2200; // Adjust the position of the profile image
        const profileSize = 600; // Adjust the size of the circular profile image

        ctx.save();
        ctx.beginPath();
        ctx.arc(
          profileX + profileSize / 2,
          profileY + profileSize / 2,
          profileSize / 2,
          0,
          Math.PI * 2
        );
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(profileImg, profileX, profileY, profileSize, profileSize);
        ctx.restore();

        ctx.font = "100px Arial";
        ctx.fillStyle = "black";

        ctx.fillText(doctorName, 850, 2420);
        ctx.fillText(doctorDesignation, 850, 2580);

        const dataUrl = canvas.toDataURL("image/png");
        resolve(dataUrl);
      };

      posterImg.src = posterUrl; // Start loading the poster image
    };

    profileImg.src = profileUrl; // Start loading the profile image
  });
}
