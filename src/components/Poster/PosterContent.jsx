import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASEURL } from "../../constant/constant";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import "./PosterContent.css";
import axios from "axios";

const PosterContent = () => {

  const empId = sessionStorage.getItem("userId");
  const [singalDocData, setSinglDocData] = useState({});
  const [selectedPoster, setSelectedPoster] = useState([]);
  let { id } = useParams();

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const [categoryb, setCategeory] = useState([]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  useEffect(() => {
    GetDoctorById();
    getPosterById();
  }, []);

  useEffect(() => {
    if (singalDocData && selectedPoster && selectedPoster.length > 0) {
      for (let i = 0; i < selectedPoster.length; i++) {
        let str = selectedPoster[i].img_path.substring(8, 10);
        console.log(str, singalDocData.name, singalDocData.qualification);
      }
    }
  }, []);

  const fetchData = async () => {
    const options = {
      method: "POST",
      url: "https://rapid-translate-multi-traduction.p.rapidapi.com/t",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "7f0907abe3mshbffd796f0d1e962p13edb0jsn184e1efe60fb",
        "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com",
      },
      data: {
        from: "en",
        to: "hi",
        q: "Ajay",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function GetDoctorById() {
    try {
      let response = await fetch(`${BASEURL}/getdoctor/${id}`);
      let data = await response.json();
      setSinglDocData(data[0]);
    } catch (error) {
      console.log(error);
    }
  }
  async function getPosterById() {
    try {
      let response = await fetch(`${BASEURL}/getSelectedImages/${id}`);
      let data = await response.json();
      setSelectedPoster(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getcategeory();
  }, []);

  useEffect(() => {
    getimgname();
  }, [selectedCategory]);

  async function getcategeory() {
    try {
      let response = await fetch(`${BASEURL}/getcategeory`);
      let data = await response.json();
      setCategeory(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getimgname() {
    try {
      let response = await fetch(
        `${BASEURL}/getpostername/${selectedCategory}"`
      );
      let data = await response.json();
      setSelectedImages(data);
    } catch (error) {
      console.log(error);
    }
  }

  const profileImageUrl = singalDocData.imgurl || "";
  const posterRef5 = useRef(null);

  const handleSave5 = async (posterRef, posterPath,docname) => {
    const poster = document.getElementById("pdiv");
    //const poster = posterRef.current;
    // Create a clone of the poster element
    const posterClone = poster.cloneNode(true);
    const profileImageClone = posterClone.querySelector(".profile-poster5");
    const profilenameClone = posterClone.querySelector(".namediv5");
    const qualificationClone = posterClone.querySelector(".qualificationdiv5");
    const specilityclone = posterClone.querySelector(".specilitydiv5");

    // Modify the clone

    profileImageClone.style.width = "200px"; // Adjust the width as needed
    profileImageClone.style.height = "230px"; // Adjust the height as needed
    profileImageClone.style.position = "absolute";
    profileImageClone.style.top = "2%";
    profileImageClone.style.left = "13%";
    //profileImageClone.style.borderRadius = "50%";

    profilenameClone.style.position = "absolute";
    profilenameClone.style.top = "2%";
    profilenameClone.style.left = "40%";
    profilenameClone.style.fontSize = "60px";
    profilenameClone.style.fontFamily ='Poppins';
    //profilenameClone.style.color = 'white'
    // profilenameClone.style.fontStyle = "italic";

    specilityclone.style.position = "absolute";
    specilityclone.style.top = "6%";
    specilityclone.style.left = "40%";
    specilityclone.style.fontSize = "60px";
    specilityclone.fontFamily ='Poppins'

    qualificationClone.style.position = "absolute";
    qualificationClone.style.top = "10%";
    qualificationClone.style.left = "40%";
    qualificationClone.style.fontSize = "60px";
    qualificationClone.fontFamily ='Poppins'
   // qualificationClone.fontWeight = '400'

    // qualificationClone.style.fontFamily ='Dancing Script','cursive';
    // qualificationClone.style.fontStyle = "italic";
    // Create a temporary <img> element with the background image as its source
    const bgImg = new Image();
    bgImg.src = `/images/${posterPath}.jpg`;

    // Wait for the background image to load before generating the image
    bgImg.onload = async () => {
      // Create a temporary canvas
      const canvas = document.createElement("canvas");
      canvas.width = bgImg.width;
      canvas.height = bgImg.height;
      const ctx = canvas.getContext("2d");

      // Draw the background image onto the canvas
      ctx.drawImage(bgImg, 0, 0);

      // Draw the poster content on top of the background image
      const dataUrl = await domtoimage.toPng(posterClone, {
        width: 1080,
        height: 1920,
      });

      // Get the Image data from the poster content
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        // Draw the poster content on top of the background image
        ctx.drawImage(img, 0, 0);

        // Convert the canvas to a data URL and create a download link
        const imageWithBackground = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imageWithBackground;
        link.download = "poster.png";
        link.click();


        // for file object 
       console.log("til heare1")
        canvas.toBlob(async (blob) => {
          // Create a File object from the Blob
          const file = new File([blob], `${docname}poster.png`, { type: "image/png" });
      
       console.log("til heare2")

       try {
         const formData = new FormData();
         formData.append('empId', empId);
         formData.append('image', file);
       console.log("til heare3")

      const response = await axios.post(`${BASEURL}/uploadPoster`, formData);

      console.log('File upload response:', response);
    } catch (error) {
      console.error('File upload error:', error);
    }

  }, "image/png");

        // Clean up the temporary canvas
        canvas.remove();
      };
    };
  };

  return (
    <div>
      <div
        className="content-header"
        style={{ backgroundColor: "#c36eca", color: "#fff" }}
      >
        <p className="text-center" style={{ fontSize: "25px" }}>
          {" "}
          <Link to="/dashboard" className=" text-left">
            <button type="button" className="btn btn-primary float-left">
              <i className="fas fa-arrow-left"></i>
            </button>
          </Link>{" "}
          Total Poster : {selectedImages && selectedImages.length}
        </p>

        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6"></div>
          </div>
        </div>
      </div>

      <div  className="select-container">
        <div className="form-group mt-2 drodownselectdiv">
          <label htmlFor="categorySelect">Select Category:</label>
          <select
            className="form-control"
            id="categorySelect"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categoryb &&
              categoryb.map((category) => (
                <option key={category.value} value={category.catid}>
                  {category.categeoryname}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group mt-2 drodownselectdiv">
          <label htmlFor="languageSelect">Select Language:</label>
          <select
            className="form-control"
            id="languageSelect"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="english">1. English</option>
          </select>
        </div>
      </div>

      <section className="content mt-2">
        <div className="container-fluid">
          <div className="row">
            {selectedImages &&
              selectedImages.map((poster, index) => (
                <div key={index} className="card bg-light ml-3">
                  <div
                    className="card-body pt-0 poster-image5"
                    id="pdiv"
                    style={{
                      backgroundImage: `url(/images/${poster.postername}.jpg)`,
                    }}
                  >
                    <div className="row">
                      <div className=" text-center">
                        <div className="profile-image5">
                          <img
                            src={`${BASEURL}/uploads/${profileImageUrl}`}
                            alt=""
                            className="profile-poster5"
                          />
                        </div>
                        <div className="namediv5">
                          {`Dr.${singalDocData.name}`}
                        </div>
                        <div className="specilitydiv5">
                          {singalDocData.speciliaty}
                        </div>
                        <div className="qualificationdiv5">
                          {singalDocData.qualification}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="text-center">
                      <div
                        onClick={() =>
                          handleSave5(posterRef5, poster.postername,singalDocData.name)
                        }
                        className="btn btn-sm btn-danger"
                      >
                        <i className="fas fa-download"></i> Image
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PosterContent;
