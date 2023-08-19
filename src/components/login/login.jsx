import { useContext, useState } from "react";
import s from "./login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../../constant/constant";
import { IdContext } from "../../context/AuthContext";
function Login() {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handelId } = useContext(IdContext);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(empId, password);
    try {
      let response = await axios.post(`${BASEURL}/login`, { empId, password });

      
      handelId(response.data.empID);
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userId", response.data.empID);
     
        navigate("/dashboard");
   
    } catch (error) {
      setError("Invalid Credential");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={s.logbody}>
      <div className={`${s.page_wrapper} ${s.p_b_100} ${s.font_poppins}`}>
        <div className={`${s.wrapper} ${s.wrapper_w780}`}>
          <div className={`${s.card} ${s.card_3}`}>
            <div className={s.card_heading}></div>
            <div className={s.card_body}>
              <div style={{ marginBottom: "36px" }}>
                <h2 className={s.title}>Sign-In</h2>
                <p>Enter your login credentials</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className={s.input_group}>
                  <input
                    className={s.input_style_3}
                    type="text"
                    placeholder="Employee Id"
                    name="email"
                    onChange={(e) => {
                      setEmpId(e.target.value);
                    }}
                  />
                </div>

                <div className={s.input_group} style={{}}>
                  <input
                    id="password-field"
                    className={s.input_style_3}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <span
                    className={`fa fa-fw  field-icon toggle-password ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                    style={{
                      float: "right",
                      marginLeft: "-25px",
                      marginTop: "14px",
                      paddingRight: "10px",
                      position: "relative",
                      zIndex: 2,
                    }}
                    onClick={togglePasswordVisibility}
                  ></span>
                  <a
                    href=""
                    style={{
                      textAlign: "end",
                      textDecoration: "none",
                      color: "#000",
                    }}
                  >
                    <p>Forgot Password?</p>
                  </a>
                  {error && <p style={{ color: "red" }}>😈 {error}</p>}
                </div>

                <div className={s.p_t_10} style={{ textAlign: "center" }}>
                  <button className={`${s.btn} ${s.btn_pill}`} type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
