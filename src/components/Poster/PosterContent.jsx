// import { useEffect, useRef, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { BASEURL } from "../../constant/constant";
// import domtoimage from "dom-to-image";
// import jsPDF from "jspdf";
// import "./PosterContent.css";

// const PosterContent = () => {
//   const [singalDocData, setSinglDocData] = useState({});
//   let { id } = useParams();

//   const posterRef1 = useRef(null);
//   const posterRef2 = useRef(null);
//   const posterRef3 = useRef(null);
//   const posterRef4 = useRef(null);
//   const posterRef5 = useRef(null);
//   const posterRef6 = useRef(null);
//   useEffect(() => {
//     GetDoctorById();
//     getPosterById()
//   }, []);

//   async function GetDoctorById() {
//     try {
//       let response = await fetch(`${BASEURL}/getdoctor/${id}`);
//       let data = await response.json();
//       setSinglDocData(data[0]);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   async function getPosterById(){
//     try {
//       let response = await fetch(`${BASEURL}/getSelectedImages/${id}`);
//       let data = await response.json();
//       console.log(data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const profileImageUrl = singalDocData.imgurl || "";

//   // const handleSave = async (posterRef) => {
//   //   const poster = posterRef.current;
//   //   const profileImage = poster.querySelector(".profile-poster");
//   //   const profilename = poster.querySelector(".namediv");

//   //   profilename.style.marginTop = "15px";
//   //   profilename.style.fontSize = "80px";

//   //   profileImage.style.width = "400px"; // Adjust the width as needed
//   //   profileImage.style.height = "400px"; // Adjust the height as needed

//   //   const dataUrl = await domtoimage.toPng(poster, {
//   //     width: 1300,
//   //     height: 2000,
//   //   });
//   //     const link = document.createElement("a");
//   //     link.href = dataUrl;
//   //     link.download = "poster.png";
//   //     link.click();
//   //   const profileImage1 = poster.querySelector(".profile-poster");
//   //   profileImage1.style.width = "6em"; // Adjust the width as needed
//   //   profileImage1.style.height = "6em"; // Adjust the height as needed

//   //   const profilename1 = poster.querySelector(".namediv");

//   //   profilename1.style.marginTop = "";
//   //   profilename1.style.fontSize = "";
//   // };
//   // const handleSave = async (posterRef) => {
//   //   const poster = posterRef.current;

//   //   // Create a clone of the poster element
//   //   const posterClone = poster.cloneNode(true);
//   //   const profileImageClone = posterClone.querySelector(".profile-poster");
//   //   const profilenameClone = posterClone.querySelector(".namediv");
//   //   const profilemobileClone = posterClone.querySelector(".mobdiv");
//   //   const profilecityClone = posterClone.querySelector(".citydiv");

//   //   // Modify the clone

//   //   profileImageClone.style.width = "700px"; // Adjust the width as needed
//   //   profileImageClone.style.height = "700px"; // Adjust the height as needed
//   //   profileImageClone.style.position = "absolute";
//   //   profileImageClone.style.top = "29%";
//   //   profileImageClone.style.left = "33%";
//   //   profileImageClone.style.borderRadius = "50%";

//   //   profilenameClone.style.position = "absolute";
//   //   profilenameClone.style.top = "56%"
//   //   profilenameClone.style.left = "36%";
//   //   profilenameClone.style.fontSize = "200px";

//   //   profilemobileClone.style.position = "absolute";
//   //   profilemobileClone.style.top = "67%"
//   //   profilemobileClone.style.left = "18%";
//   //   profilemobileClone.style.fontSize = "70px";

//   //   profilecityClone.style.position = "absolute";
//   //   profilecityClone.style.top = "67%"
//   //   profilecityClone.style.left = "52%";
//   //   profilecityClone.style.fontSize = "70px";

//   //   // Create a temporary <img> element with the background image as its source
//   //   const bgImg = new Image();
//   //   bgImg.src = '../../dist/img/poster.jpg';

//   //   // Wait for the background image to load before generating the image
//   //   bgImg.onload = async () => {
//   //     // Create a temporary canvas
//   //     const canvas = document.createElement("canvas");
//   //     canvas.width = bgImg.width;
//   //     canvas.height = bgImg.height;
//   //     const ctx = canvas.getContext("2d");

//   //     // Draw the background image onto the canvas
//   //     ctx.drawImage(bgImg, 0, 0);

//   //     // Draw the poster content on top of the background image
//   //     const dataUrl = await domtoimage.toPng(posterClone, {
//   //       width: 2000,
//   //       height: 3181,
//   //     });

//   //     // Get the Image data from the poster content
//   //     const img = new Image();
//   //     img.src = dataUrl;
//   //     img.onload = () => {
//   //       // Draw the poster content on top of the background image
//   //       ctx.drawImage(img, 0, 0);

//   //       // Convert the canvas to a data URL and create a download link
//   //       const imageWithBackground = canvas.toDataURL("image/png");
//   //       const link = document.createElement("a");
//   //       link.href = imageWithBackground;
//   //       link.download = "poster.png";
//   //       link.click();

//   //       // Clean up the temporary canvas
//   //       canvas.remove();
//   //     };
//   //   };
//   // };

//   // const handleSave2 = async (posterRef) => {
//   //   const poster = posterRef.current;
//   //   // Create a clone of the poster element
//   //   const posterClone = poster.cloneNode(true);
//   //   const profileImageClone = posterClone.querySelector(".profile-poster2");
//   //   const profilenameClone = posterClone.querySelector(".docname2");

//   //   // Modify the clone

//   //   profileImageClone.style.width = "400px"; // Adjust the width as needed
//   //   profileImageClone.style.height = "400px"; // Adjust the height as needed
//   //   profileImageClone.style.position = "absolute";
//   //   profileImageClone.style.top = "5.5%";
//   //   profileImageClone.style.left = "10%";
//   //   profileImageClone.style.borderRadius = "5%";

//   //   profilenameClone.style.position = "absolute";
//   //   profilenameClone.style.top = "20%"
//   //   profilenameClone.style.left = "9%";
//   //   profilenameClone.style.fontSize = "90px";
//   //   // Create a temporary <img> element with the background image as its source
//   //   const bgImg = new Image();
//   //   bgImg.src = '../../dist/img/A3poster.jpg';

//   //   // Wait for the background image to load before generating the image
//   //   bgImg.onload = async () => {
//   //     // Create a temporary canvas
//   //     const canvas = document.createElement("canvas");
//   //     canvas.width = bgImg.width;
//   //     canvas.height = bgImg.height;
//   //     const ctx = canvas.getContext("2d");

//   //     // Draw the background image onto the canvas
//   //     ctx.drawImage(bgImg, 0, 0);

//   //     // Draw the poster content on top of the background image
//   //     const dataUrl = await domtoimage.toPng(posterClone, {
//   //       width: 1680,
//   //       height: 2374,
//   //     });

//   //     // Get the Image data from the poster content
//   //     const img = new Image();
//   //     img.src = dataUrl;
//   //     img.onload = () => {
//   //       // Draw the poster content on top of the background image
//   //       ctx.drawImage(img, 0, 0);

//   //       // Convert the canvas to a data URL and create a download link
//   //       const imageWithBackground = canvas.toDataURL("image/png");
//   //       const link = document.createElement("a");
//   //       link.href = imageWithBackground;
//   //       link.download = "poster.png";
//   //       link.click();

//   //       // Clean up the temporary canvas
//   //       canvas.remove();
//   //     };
//   //   };
//   // };

//   // const handleSave3 = async (posterRef) => {
//   //   const poster = posterRef.current;
//   //   // Create a clone of the poster element
//   //   const posterClone = poster.cloneNode(true);
//   //   const profileImageClone = posterClone.querySelector(".profile-poster3");
//   //   const profilenameClone = posterClone.querySelector(".docname3");

//   //   // Modify the clone

//   //   profileImageClone.style.width = "380px"; // Adjust the width as needed
//   //   profileImageClone.style.height = "400px"; // Adjust the height as needed
//   //   profileImageClone.style.position = "absolute";
//   //   profileImageClone.style.top = "2%";
//   //   profileImageClone.style.left = "8%";
//   //   profileImageClone.style.borderRadius = "5%";

//   //   profilenameClone.style.position = "absolute";
//   //   profilenameClone.style.top = "16%"
//   //   profilenameClone.style.left = "6%";
//   //   profilenameClone.style.fontSize = "90px";
//   //   // Create a temporary <img> element with the background image as its source
//   //   const bgImg = new Image();
//   //   bgImg.src = '../../dist/img/A3poster1.jpg';

//   //   // Wait for the background image to load before generating the image
//   //   bgImg.onload = async () => {
//   //     // Create a temporary canvas
//   //     const canvas = document.createElement("canvas");
//   //     canvas.width = bgImg.width;
//   //     canvas.height = bgImg.height;
//   //     const ctx = canvas.getContext("2d");

//   //     // Draw the background image onto the canvas
//   //     ctx.drawImage(bgImg, 0, 0);

//   //     // Draw the poster content on top of the background image
//   //     const dataUrl = await domtoimage.toPng(posterClone, {
//   //       width: 1680,
//   //       height: 2374,
//   //     });

//   //     // Get the Image data from the poster content
//   //     const img = new Image();
//   //     img.src = dataUrl;
//   //     img.onload = () => {
//   //       // Draw the poster content on top of the background image
//   //       ctx.drawImage(img, 0, 0);

//   //       // Convert the canvas to a data URL and create a download link
//   //       const imageWithBackground = canvas.toDataURL("image/png");
//   //       const link = document.createElement("a");
//   //       link.href = imageWithBackground;
//   //       link.download = "poster.png";
//   //       link.click();

//   //       // Clean up the temporary canvas
//   //       canvas.remove();
//   //     };
//   //   };
//   // };

//   // const handleSave4 = async (posterRef) => {
//   //   const poster = posterRef.current;
//   //   // Create a clone of the poster element
//   //   const posterClone = poster.cloneNode(true);
//   //   const profileImageClone = posterClone.querySelector(".profile-poster4");
//   //   const profilenameClone = posterClone.querySelector(".docname4");

//   //   // Modify the clone

//   //   profileImageClone.style.width = "155px"; // Adjust the width as needed
//   //   profileImageClone.style.height = "160px"; // Adjust the height as needed
//   //   profileImageClone.style.position = "absolute";
//   //   profileImageClone.style.top = "1.2%";
//   //   profileImageClone.style.left = "4.5%";
//   //   profileImageClone.style.borderRadius = "5%";

//   //   profilenameClone.style.position = "absolute";
//   //   profilenameClone.style.top = "16%"
//   //   profilenameClone.style.left = "50%";
//   //   profilenameClone.style.fontSize = "220px";
//   //   // Create a temporary <img> element with the background image as its source
//   //   const bgImg = new Image();
//   //   bgImg.src = '../../dist/img/Doctor_cert.jpg';

//   //   // Wait for the background image to load before generating the image
//   //   bgImg.onload = async () => {
//   //     // Create a temporary canvas
//   //     const canvas = document.createElement("canvas");
//   //     canvas.width = bgImg.width;
//   //     canvas.height = bgImg.height;
//   //     const ctx = canvas.getContext("2d");

//   //     // Draw the background image onto the canvas
//   //     ctx.drawImage(bgImg, 0, 0);

//   //     // Draw the poster content on top of the background image
//   //     const dataUrl = await domtoimage.toPng(posterClone, {
//   //       width: 1680,
//   //       height: 2374,
//   //     });

//   //     // Get the Image data from the poster content
//   //     const img = new Image();
//   //     img.src = dataUrl;
//   //     img.onload = () => {
//   //       // Draw the poster content on top of the background image
//   //       ctx.drawImage(img, 0, 0);

//   //       // Convert the canvas to a data URL and create a download link
//   //       const imageWithBackground = canvas.toDataURL("image/png");
//   //       const link = document.createElement("a");
//   //       link.href = imageWithBackground;
//   //       link.download = "poster.png";
//   //       link.click();

//   //       // Clean up the temporary canvas
//   //       canvas.remove();
//   //     };
//   //   };
//   // };

//   const handleSave5 = async (posterRef) => {
//     const poster = posterRef.current;
//     // Create a clone of the poster element
//     const posterClone = poster.cloneNode(true);
//     const profileImageClone = posterClone.querySelector(".profile-poster5");
//     const profilenameClone = posterClone.querySelector(".namediv5");
//     const qualificationClone = posterClone.querySelector(".qualificationdiv5");

//     // Modify the clone

//     profileImageClone.style.width = "600px"; // Adjust the width as needed
//     profileImageClone.style.height = "600px"; // Adjust the height as needed
//     profileImageClone.style.position = "absolute";
//     profileImageClone.style.top = "74.5%";
//     profileImageClone.style.left = "9%";
//     profileImageClone.style.borderRadius = "50%";

//     profilenameClone.style.position = "absolute";
//     profilenameClone.style.top = "78%"
//     profilenameClone.style.left = "40%";
//     profilenameClone.style.fontSize = "100px";
//     profilenameClone.style.fontFamily ='Dancing Script', 'cursive';
//     profilenameClone.style.fontStyle = "italic";

//     qualificationClone.style.position = "absolute";
//     qualificationClone.style.top = "83%"
//     qualificationClone.style.left = "40%";
//     qualificationClone.style.fontSize = "100px";
//     qualificationClone.style.fontFamily ='Dancing Script','cursive';
//     qualificationClone.style.fontStyle = "italic";
//     // Create a temporary <img> element with the background image as its source
//     const bgImg = new Image();
//     bgImg.src = '/images/Hair_Loss.jpg';

//     // Wait for the background image to load before generating the image
//     bgImg.onload = async () => {
//       // Create a temporary canvas
//       const canvas = document.createElement("canvas");
//       canvas.width = bgImg.width;
//       canvas.height = bgImg.height;
//       const ctx = canvas.getContext("2d");

//       // Draw the background image onto the canvas
//       ctx.drawImage(bgImg, 0, 0);

//       // Draw the poster content on top of the background image
//       const dataUrl = await domtoimage.toPng(posterClone, {
//         width: 2220,
//         height: 2960,
//       });

//       // Get the Image data from the poster content
//       const img = new Image();
//       img.src = dataUrl;
//       img.onload = () => {
//         // Draw the poster content on top of the background image
//         ctx.drawImage(img, 0, 0);

//         // Convert the canvas to a data URL and create a download link
//         const imageWithBackground = canvas.toDataURL("image/png");
//         const link = document.createElement("a");
//         link.href = imageWithBackground;
//         link.download = "poster.png";
//         link.click();

//         // Clean up the temporary canvas
//         canvas.remove();
//       };
//     };
//   };
//   const handleSave6 = async (posterRef) => {
//     const poster = posterRef.current;
//     // Create a clone of the poster element
//     const posterClone = poster.cloneNode(true);
//     const profileImageClone = posterClone.querySelector(".profile-poster6");
//     const profilenameClone = posterClone.querySelector(".namediv6");
//     const qualificationClone = posterClone.querySelector(".qualificationdiv6");

//     // Modify the clone

//     profileImageClone.style.width = "520px"; // Adjust the width as needed
//     profileImageClone.style.height = "520px"; // Adjust the height as needed
//     profileImageClone.style.position = "absolute";
//     profileImageClone.style.top = "64%";
//     profileImageClone.style.left = "8%";
//     profileImageClone.style.borderRadius = "50%";

//     profilenameClone.style.position = "absolute";
//     profilenameClone.style.top = "68%"
//     profilenameClone.style.left = "36%";
//     profilenameClone.style.fontSize = "80px";

//     qualificationClone.style.position = "absolute";
//     qualificationClone.style.top = "73%"
//     qualificationClone.style.left = "36%";
//     qualificationClone.style.fontSize = "80px";
//     // Create a temporary <img> element with the background image as its source
//     const bgImg = new Image();
//     bgImg.src = '/images/Melasma.jpg';

//     // Wait for the background image to load before generating the image
//     bgImg.onload = async () => {
//       // Create a temporary canvas
//       const canvas = document.createElement("canvas");
//       canvas.width = bgImg.width;
//       canvas.height = bgImg.height;
//       const ctx = canvas.getContext("2d");

//       // Draw the background image onto the canvas
//       ctx.drawImage(bgImg, 0, 0);

//       // Draw the poster content on top of the background image
//       const dataUrl = await domtoimage.toPng(posterClone, {
//         width: 2220,
//         height: 2960,
//       });

//       // Get the Image data from the poster content
//       const img = new Image();
//       img.src = dataUrl;
//       img.onload = () => {
//         // Draw the poster content on top of the background image
//         ctx.drawImage(img, 0, 0);

//         // Convert the canvas to a data URL and create a download link
//         const imageWithBackground = canvas.toDataURL("image/png");
//         const link = document.createElement("a");
//         link.href = imageWithBackground;
//         link.download = "poster.png";
//         link.click();

//         // Clean up the temporary canvas
//         canvas.remove();
//       };
//     };
//   };
//   return (
//     <div>
//       <div className="content-header" style={{ backgroundColor: "#c0ebff" }}>
//         <div className="container-fluid">
//           <div className="row mb-2">
//             <div className="col-sm-6"></div>
//             <Link to="/dashboard" className="col-sm-12 text-left">
//                   <button type="button"  className="docbtn btn btn-primary">
//                             <i className="fas fa-arrow-left"></i>
//                   </button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       <section className="content mt-5">
//         <div className="container-fluid">
//           <div className="row">

//             <div>
//               <div className="card bg-light mg-l">
//                 <div className="card-body pt-0 poster-image5" ref={posterRef5}>

//                   <div className="row">
//                     <div className=" text-center">

//                       <div className="profile-image5">
//                         <img
//                           src={`${BASEURL}/uploads/${profileImageUrl}`}
//                           alt=""
//                           className="profile-poster5"
//                         />
//                       </div>
//                       <div className="namediv5">
//                          {singalDocData.name}
//                       </div>

//                       <div className="qualificationdiv5">
//                        {singalDocData.qualification}

//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="card-footer">
//                   <div className="text-center">
//                     <div
//                       onClick={() => handleSave5(posterRef5)}
//                       className="btn btn-sm btn-danger"
//                     >
//                       <i className="fas fa-download"></i> Image
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div>
//             <div className="card bg-light mg-l">
//                 <div className="card-body pt-0 poster-image6" ref={posterRef6}>

//                   <div className="row">
//                     <div className=" text-center">

//                       <div className="profile-image6">
//                         <img
//                           src={`${BASEURL}/uploads/${profileImageUrl}`}
//                           alt=""
//                           className="profile-poster6"
//                         />
//                       </div>
//                       <div className="namediv6">
//                          {singalDocData.name}
//                       </div>

//                       <div className="qualificationdiv6">
//                        {singalDocData.qualification}

//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="card-footer">
//                   <div className="text-center">
//                     <div
//                       onClick={() => handleSave6(posterRef6)}
//                       className="btn btn-sm btn-danger"
//                     >
//                       <i className="fas fa-download"></i> Image
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PosterContent;

import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASEURL } from "../../constant/constant";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import "./PosterContent.css";
import axios from "axios";

const PosterContent = () => {
  const [singalDocData, setSinglDocData] = useState({});
  const [selectedPoster, setSelectedPoster] = useState([]);
  let { id } = useParams();

  console.log("selected poster", selectedPoster);

  const posterRef5 = useRef(null);

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

  const profileImageUrl = singalDocData.imgurl || "";

  const handleSave5 = async (posterRef, posterPath) => {
    const poster = posterRef.current;
    // Create a clone of the poster element
    const posterClone = poster.cloneNode(true);
    const profileImageClone = posterClone.querySelector(".profile-poster5");
    const profilenameClone = posterClone.querySelector(".namediv5");
    const qualificationClone = posterClone.querySelector(".qualificationdiv5");

    // Modify the clone

    profileImageClone.style.width = "600px"; // Adjust the width as needed
    profileImageClone.style.height = "600px"; // Adjust the height as needed
    profileImageClone.style.position = "absolute";
    profileImageClone.style.top = "74.5%";
    profileImageClone.style.left = "9%";
    profileImageClone.style.borderRadius = "50%";

    profilenameClone.style.position = "absolute";
    profilenameClone.style.top = "78%";
    profilenameClone.style.left = "40%";
    profilenameClone.style.fontSize = "100px";
    (profilenameClone.style.fontFamily = "Dancing Script"), "cursive";
    profilenameClone.style.fontStyle = "italic";

    qualificationClone.style.position = "absolute";
    qualificationClone.style.top = "83%";
    qualificationClone.style.left = "40%";
    qualificationClone.style.fontSize = "100px";
    (qualificationClone.style.fontFamily = "Dancing Script"), "cursive";
    qualificationClone.style.fontStyle = "italic";
    // Create a temporary <img> element with the background image as its source
    const bgImg = new Image();
    bgImg.src = posterPath;

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
        width: 2220,
        height: 2960,
      });

      // Get the Image data from the poster content
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        // Draw the poster content on top of the background image
        ctx.drawImage(img, 0, 0);

        // Convert the canvas to a data URL and create a download link
        const imageWithBackground = canvas.toDataURL("image/png");
        console.log(imageWithBackground);
        // const link = document.createElement("a");
        // link.href = imageWithBackground;
        // link.download = "poster.png";
        // link.click();

        canvas.toBlob(async (blob) => {
          // Create a File object from the Blob
          const file = new File([blob], "poster.png", { type: "image/png" });

          console.log(file);
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
            <button type="button" className="docbtn btn btn-primary float-left">
              <i className="fas fa-arrow-left"></i>
            </button>
          </Link>{" "}
          Total Poster : {selectedPoster && selectedPoster.length}
        </p>

        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6"></div>
          </div>
        </div>
      </div>

      <section className="content mt-5">
        <div className="container-fluid">
          <div className="row">
            {selectedPoster &&
              selectedPoster.map((poster, index) => (
                <div key={index} className="card bg-light mg-l">
                  <div
                    className="card-body pt-0 poster-image5"
                    style={{ backgroundImage: `url(${poster.img_path})` }}
                    ref={posterRef5}
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
                        <div className="namediv5">{singalDocData.name}</div>

                        <div className="qualificationdiv5">
                          {singalDocData.qualification}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="text-center">
                      <div
                        onClick={() => handleSave5(posterRef5, poster.img_path)}
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
