
import { Link, useNavigate } from "react-router-dom";
import "./EmpReports.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../constant/constant";
import FileSaver from "file-saver";
import JSZip from "jszip";
const EmpReports = () => {
  const [emp, setEmp] = useState([]);
  const [emplength, setEmpLength] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totaldoctor, setTotalDoctor] = useState([])

  const [sm, setSm] = useState("");
  const [getzm ,setGetzm] = useState([])
  const [zm, setZm] = useState("");
  const [getrm ,setGetrm] = useState([])
  const [rm, setRm] = useState("");
  const [getbm ,setGetbm] = useState([])
  const [repo,setRepo] = useState("1")
  const [employeeData, setEmployeeData] = useState([])
  const [posterlen, setPosterLen] = useState(0);
  const navigate = useNavigate()

  
  const handelNext = () => {
    if ((currentPage * entriesPerPage) < emplength) {
      setCurrentPage(prev => prev + 1);
    }
  };
  const handelPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  useEffect(() => {
    getAllEmp(currentPage);
  }, [currentPage]);

  useEffect(() => {
    getAllEmp1();
    getPosterData();
  }, []);
  async function getAllEmp(page) {
    try {
      let res = await axios.get(`${BASEURL}/getEmpDoc?page=${page}&limit=20`);
      setEmp(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getAllEmp1() {
    try {
      let res = await axios.get(`${BASEURL}/getAllEmp`);
      setEmpLength(res.data.length);
    } catch (error) {
      console.log(error);
    }
  }

  async function getPosterData() {
    try {
      let res = await axios.get(`${BASEURL}/getPoster`);
      setEmployeeData(res.data.transformedResult);
      setPosterLen(res.data.poslength)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getTotalDoc()
   
  },[])
  
  async function getTotalDoc(){
    try {
       let res = await axios.get(`${BASEURL}/doc-data`);
       setTotalDoctor(res.data)
    } catch (error) {
      console.log(error)
    }
  }




  const entriesPerPage = 20;
  const startingEntry = (currentPage - 1) * entriesPerPage + 1;
  //const endingEntry = 20;
  console.log("emplength",emplength)
  const endingEntry = Math.min(startingEntry + entriesPerPage - 1, emplength);
  

  const handelDownloadZip = async () => {
    const zip = new JSZip();

    // Loop through the employee data
    for (const employee of employeeData) {
      const { name,code, posters } = employee;
      const employeeFolder = zip.folder(`${name}_${code}`);

      // Add doctor posters to the employee folder
      for (let i = 0; i < posters.length; i++) {
        try {
          const response = await fetch(`${BASEURL}/uploads/${posters[i].posterUrl}`);
          const blob = await response.blob();
          employeeFolder.file(`poster_${i + 1}.jpg`, blob, { binary: true });
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    }

    // Generate the zip file
    zip.generateAsync({ type: "blob" }).then((content) => {
      // Save the zip file
      FileSaver.saveAs(content, "employee_posters.zip");
    });
  };
  
 
  const hadelReportDownload = async(repo)=>{
    try {
      const response = await fetch(`${BASEURL}/getExcel/${repo}`); // Replace with your API URL
  
      if (response.ok) {
        // Get the filename from the "Content-Disposition" header
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1]
          : 'exported_employee_data.csv';
  
        // Trigger the browser to download the CSV file
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        console.error('API call failed:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
   }

  
   
   const handelDocReport = async(empcode)=>{
    try {
      const response = await fetch(`${BASEURL}/getExcelDoc/${empcode}`); // Replace with your API URL
  
      if (response.ok) {
        // Get the filename from the "Content-Disposition" header
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1]
          : 'exported_employee_data.csv';
  
        // Trigger the browser to download the CSV file
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        console.error('API call failed:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
   }
   


  async function getAllZm(sm) {
    try {
      let res = await axios.get(`${BASEURL}/getZonal/${sm}`);
      
      setGetzm(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
     if(sm){
      getAllZm(sm)
     }
  },[sm])

  async function getAllRm(zm) {
    try {
      let res = await axios.get(`${BASEURL}/getRegional/${zm}`);
      setGetrm(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
     if(zm){
      getAllRm(zm)
     }
  },[zm])


  async function getAllBm(rm) {
    try {
      let res = await axios.get(`${BASEURL}/getBusiness/${rm}`);
     
      setGetbm(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
     if(rm){
      getAllBm(rm)
     }
  },[rm])



  const handelLogOut = ()=>{
    
   
    sessionStorage.removeItem("IsAdminLoggedIn");
    navigate("/adminLogin");
  
 }
 
  

  return (
    <div className="page-container">
      <div className="page-sidebar">
        {/* X-NAVIGATION */}
        <ul className="x-navigation">
          <li className="xn-logo">
            <Link to={"/dashboard/report"} className="brand-link text-center">
              <span className="brand-text font-weight-light">
                <img
                  src="/images/Logo.png"
                  alt=""
                  className="logoMain"
                  style={{}}
                />
              </span>
            </Link>
          </li>

          <li>
            <Link to={"/admin/report"}>
              <span className="fas fa-file p-1"></span>{" "}
              <span className="xn-text">Reports</span>
            </Link>
          </li>
        </ul>
        {/* END X-NAVIGATION */}
        
      </div>
       
      {/* PAGE CONTENT */}
      <div className="page-content">
        {/* START X-NAVIGATION VERTICAL */}
        <ul className="x-navigation x-navigation-horizontal x-navigation-panel">
          <li className="xn-icon-button pull-right dropdown">
            <a href="#" data-toggle="dropdown">
              <span className="fa fa-user"></span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a className="dropdown-item">
                <div className="media">
                  <img
                    src="/images/avatar5.png"
                    alt="User Avatar"
                    className="img-size-50 mr-3 img-circle"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">Welcome Admin</h3>
                    <p className="text-sm"></p>
                    {/* <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1"></i> 4 Hours Ago
                      </p> */}
                  </div>
                </div>

                <div className="dropdown-divider"></div>

                <div onClick={handelLogOut} className="dropdown-item">
                  <i className="fas fa-sign-out-alt mr-3"></i>Logout
                </div>
              </a>
            </div>
          </li>
        </ul>
        

        <div className="page-title">
          <h2> All users</h2>
        </div>

        {/* PAGE CONTENT WRAPPER */}
        <div className="page-content-wrap">
          <div className="row">
            <div className="col-md-12">
              {/* <div className="">
                
                <select
                  name=""
                  id=""
                  className="filterselect"
                  
                  onChange={(e)=> {
                    setSm(e.target.value)
                    if(e.target.value){
                      setRepo(e.target.value);
                    }
                    else{
                      setRepo("1")
                    }
                  }}
                  value={sm}
                >
                  <option value="">All SM</option>
                  <option value={14103}>Pritesh Jayantilal Shah</option>
                  <option value={14334}>Krishna Murthy P.</option>

                </select>
               
              </div> */}
              {/* <div className="">
                <select
                  name=""
                  id=""
                  className="filterselect"
                  
                  onChange={(e)=>{
                    setZm(e.target.value)
                    if(e.target.value){
                      setRepo(e.target.value);
                    }
                    else{
                      setRepo(sm)
                    }
                  }}
                  value={zm}
                > 
                 {sm === "" ? ( <option value="">All ZM</option>):(<><option value="">All ZM</option>
                 
                  { getzm && getzm.map((zmdata)=>(
                    <option key={zmdata.EmpCode} value={zmdata.EmpCode}>{zmdata.EmployeeName}</option>
                  ))}
                 </>
                  
                 )}
                </select>
                
              </div> */}
              {/* <div className="">
                <select
                  name=""
                  id=""
                  className="filterselect"
                  
                  onChange={(e)=> {
                    setRm(e.target.value)
                    if(e.target.value){
                      setRepo(e.target.value);
                    }
                    else{
                      setRepo(zm)
                    }
                  }}
                  value={rm}
                >
                  {sm==="" ||zm==="" ? (<option value="">All RM</option>):<>
                  <option value="">All RM</option>
                  {getrm && getrm.map((rmdata)=>(
                    <option key={rmdata.EmpCode} value={rmdata.EmpCode}>{rmdata.EmployeeName}</option>
                  ))}
                  
                  </>}
                </select>
              </div> */}
              <div className="">
               
                {/* <button
                  className="btn btn-success btn-block mb-5 createuser float-right"
                  onClick={()=>hadelReportDownload(repo)}
                  >
                  Download Report
                </button> */}
                <button
                  className="btn btn-success btn-block mb-5 createuser float-right"
                  onClick={handelDownloadZip}
                >
                  Download Zip
                </button>
              </div>
              <div className="col-md-5"></div>
              <div className="col-md-3 "></div>

              {/* START DEFAULT DATATABLE */}
              <div className="panel panel-default">
                <div className="row treg">
                  <div className="col-md-4 col20">
                    <div className="bgc bgc_4">
                      <span>Total Employees</span>
                      <h2 className="h2cus">
                        {" "}
                        {emplength && (
                          <span id="totalreg">{emplength}</span>
                        )}{" "}
                      </h2>
                    </div>
                  </div>
                  <div className="col-md-4 col20">
                    <div className="bgc bgc_2">
                      <span>Total Doctor</span>
                      <h2 className="h2cus">
                        {" "}
                        {totaldoctor && <span id="totalreg">{totaldoctor.length}</span>}{' '}

                      </h2>
                    </div>
                  </div>

                  <div className="col-md-4 col20">
                    <div className="bgc bgc_5">
                      <span>
                        Total Poster Download <span id="seldatespan"></span>{" "}
                      </span>
                      <h2 className="h2cus">
                        {" "}
                        {posterlen && <span id="totalreg">{posterlen}</span>}{' '}
                        
                        
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="panel-body">
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th>Employee Name</th>
                        <th>HQ</th>

                        <th>Designation</th>
                        <th>EmployeeCode</th>
                        <th>Doctor Created</th>
                        <th>Report</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emp &&
                        emp.map((employee) => {
                          return (
                            <tr key={employee.code}>
                              <td>{employee.name}</td>

                              <td>{employee.hq}</td>
                             
                              <td>{employee.designation}</td>
                              <td>{employee.code}</td>

                              <td>{employee.doctors.length}</td>
                              <td><div onClick={()=>handelDocReport(employee.code)} className="fa fa-download pointer-cursor"></div></td>
                              <td>
                                {" "}
                                <Link to={`/viewdoc/${employee.code}`}>
                                  {" "}
                                  <button
                                    type="button"
                                    className="btn btn-info active"
                                  >
                                    <span className="fa fa-file"></span>
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0px 10px",
                    }}
                  >
                    <div>
                      {" "}
                      Showing {startingEntry} to {endingEntry} of {emplength}{" "}
                      entries
                    </div>
                    <div>
                      <button className="pag-but" onClick={handelPrevious}>
                        Previous
                      </button>
                      <button className="pag-but pag-but-bg">
                        {currentPage}
                      </button>
                      <button className="pag-but" onClick={handelNext}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* END DEFAULT DATATABLE */}
            </div>
          </div>
        </div>
        {/* PAGE CONTENT WRAPPER */}
      </div>
      {/* END PAGE CONTENT */}
    </div>
  );
};

export default EmpReports;
