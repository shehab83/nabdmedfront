import React, { useState } from "react";
import "./loginandsignup.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import {
  faApple,
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
function Login(prpos) {
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let [accept, setaccept] = useState(false);
  let [emailError, setemailError] = useState(false);

  let Navigate = useNavigate();

  async function formSubmit(e) {
    let flog = true;
    e.preventDefault();
    setaccept(true);
    if (password.length < 8) {
      flog = false;
    } else {
      flog = true;
    }
    try {
      if (flog) {
        let res = await axios.post(
          "https://almutamayizun.videosep.com/api/login",
          {
            email: email,
            password: password,
          }
        );
        if (res.status === 200) {
          window.localStorage.setItem("email", email);
          let token = res.data.data.token;
          localStorage.setItem("token", token);
          Navigate(`/`);
        }
      }
    } catch (error) {
      setemailError(error.status);
      // console.log(error);
    }
  }

  let [showpassword, setshowpassword] = useState(false);
  let togglePassword = () => {
    setshowpassword(!showpassword);
  }

  return (
    <div className="container">
      <div className={`login ${prpos.langs} `}>
        <div className="row">
          <div className="col-12 col-md-6 d-md-block d-none">
            <div className="imges">
              <img src="/imges/login.png" alt="..." />
            </div>
          </div>
          <div className="col-12 col-md-6 form">
            <div className="img">
              <img src="/imges/nav.png" alt="..." />
            </div>
            {prpos.langs === "en" ? (
              <h5>ابدأ الآن</h5>
            ) : (
              <h5>Get Started now</h5>
            )}
            {prpos.langs === "en" ? (
              <p>
                أنشئ حسابًا أو قم بتسجيل الدخول
                <br /> لاستكشاف تطبيقنا
              </p>
            ) : (
              <p>
                Create an account or log in to explore <br /> about our app
              </p>
            )}
            <div className="links">
              <div className="links-div">
                <div>
                  <Link to={"/login"} className="link1">
                    {prpos.langs === "en" ? "تسجيل الدخول" : "Login"}
                  </Link>
                </div>
                <div>
                  <Link to={"/signup"} className="link2 hed">
                    {prpos.langs === "en" ? "انشاء حساب" : "Sign Up"}
                  </Link>
                </div>
              </div>
            </div>
            <form onSubmit={formSubmit}>
              {accept && emailError === 401 && (
                <span className="error">
                  {prpos.langs === "en"
                    ? "خطا في الايمل او كلمه السر"
                    : "Error in email or password"}
                </span>
              )}
              <label htmlFor="email">
                {prpos.langs === "en" ? "البريد الالكتروني" : "Email"}
              </label>
              <input
                type="email"
                id="email"
                className="email"
                placeholder={
                  prpos.langs === "en"
                    ? "ادخل البريد الالكتروني"
                    : "Enter Email"
                }
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
              <label htmlFor="password">
                {prpos.langs === "en" ? "كلمة المرور" : "Password"}
              </label>
              <input
                type={showpassword ? "text" : "password"}
                id="password"
                placeholder={
                  prpos.langs === "en" ? "ادخل كلمة المرور" : "Enter Password"
                }
                className="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              {password.length < 8 && accept && (
                <span className="error">
                  {prpos.langs === "en"
                    ? "كلمة المرور قصيرة"
                    : "Password too short"}
                </span>
              )}
              <div className="chec">
                <div>
                  <input onClick={togglePassword} type="checkbox" id="check" />
                  <label htmlFor="check">
                    {prpos.langs === "en" ? "تذكرني" : "Remember me"}
                  </label>
                </div>
                <div>
                  <Link>
                    {prpos.langs === "en"
                      ? "نسيت كلمة المرور؟"
                      : "Forgot Password?"}
                  </Link>
                </div>
              </div>
              <button type="submit">
                {prpos.langs === "en" ? "تسجيل الدخول" : "Log in"}
              </button>
            </form>
            <p className="or">{prpos.langs === "en" ? "أو" : "Or"}</p>
            <div className="icons">
              <FontAwesomeIcon icon={faGoogle} className="icon" />
              <FontAwesomeIcon icon={faFacebook} className="icon" />
              <FontAwesomeIcon icon={faApple} className="icon" />
              <FontAwesomeIcon icon={faMobileScreenButton} className="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
