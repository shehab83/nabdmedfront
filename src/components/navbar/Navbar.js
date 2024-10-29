import React from "react";
import "./navbar.css";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function Navbar(props) {
  let Navigate = useNavigate();
  // function logout() {
  //   window.localStorage.removeItem("email");
  //   window.localStorage.removeItem("token");
  //   Navigate(`/`);
  // }

  let handlelLogout = async () => {
    let token = window.localStorage.getItem("token");
    try {
      let res = await axios.post(
        "https://almutamayizun.videosep.com/api/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        window.location.reload();
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("email");
        Navigate(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`nav-bar sticky-top ${props.langs}`}>
      <div className="container-lg  ">
        <nav className="navbar  navbar-expand-lg">
          <Link to={"/"} className="navbar-brand" href="index.html">
            <img src="/imges/nav.png" alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mian"
            aria-controls="mian"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="collapse navbar-collapse" id="mian">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  activeclassname="active"
                  to={"/"}
                  className={`nav-link ${props.langs}`}
                  aria-current="page"
                  href="#home"
                >
                  {props.langs === "ar" ? "Home" : "الرئيسيه"}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeclassname="active"
                  to={"/services"}
                  className={`nav-link ${props.langs}`}
                  href="#about"
                >
                  {props.langs === "ar" ? "Services" : "خدمات"}
                </NavLink>
              </li>
              <li className="nav-item">
                <Link
                  activeclassname="active"
                  to={"/appointments"}
                  className={`nav-link ${props.langs}`}
                  href="#products"
                >
                  {props.langs === "ar" ? "Appointments" : "المواعيد"}
                </Link>
              </li>
              <li className="nav-item">
                <NavLink
                  activeclassname="active"
                  to={"/profile"}
                  className={`nav-link ${props.langs}`}
                  href="#Contact"
                >
                  {props.langs === "ar" ? "Profile" : "الملف الشخصي"}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeclassname="active"
                  to={"/about"}
                  className={`nav-link ${props.langs}`}
                  href="#Contact"
                >
                  {props.langs === "ar" ? " About Us" : "معلومات عنا"}
                </NavLink>
              </li>
            </ul>
            <div className="register">
              {window.localStorage.getItem("email") ? (
                <NavLink
                  className={"user"}
                  activeclassname="active"
                  onClick={() => handlelLogout()}
                >
                  {props.langs === "ar" ? "Log out" : "تسجيل الخروج"}
                </NavLink>
              ) : (
                <NavLink
                  className={"user"}
                  activeclassname="active"
                  to={"/login"}
                >
                  {props.langs === "ar" ? "Login" : "تسجيل الدخول"}
                </NavLink>
              )}
              <button className="but-lang" onClick={props.lang}>
                {props.langs === "en" ? "en" : "ar"}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
