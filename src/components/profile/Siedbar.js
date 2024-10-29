import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, NavLink } from "react-router-dom";

function Siedbar(props) {
  return (
    <div className="sidebar">
      <ul>
        <li className="li1">
          <NavLink
            to={"/profile/patient"}
            className={"link Link1"}
            activeclassname="active"
          >
            <img src="/imges/personalcard.png" alt="..." />

            {props.langs === "en" ? (
              <span>معلومات المرضى</span>
            ) : (
              <span>Personal Information</span>
            )}
          </NavLink>
        </li>
        <li className="li1">
          <NavLink
            to={"/profile/addpatient"}
            className={"link Link1"}
            activeclassname="active"
          >
            <img src="/imges/Body.png" alt="..." />
            {props.langs === "en" ? (
              <span>إضافة المرضى</span>
            ) : (
              <span>Add Patients</span>
            )}
          </NavLink>
        </li>
        <li className="li1">
          <Link to={"Editprofile"} className={"link Link1"}>
            <img src="/imges/money.png" alt="..." />
            {props.langs === "en" ? (
              <span>تعديل الملف الشخصي</span>
            ) : (
              <span>Edit profile</span>
            )}
          </Link>
        </li>
        <li className="file">
          <Link to={""} className={"link"}>
            <img src="/imges/folder-open.png" alt="..." />
            {props.langs === "en" ? (
              <span>الملف الطبي</span>
            ) : (
              <span>Medical File</span>
            )}
          </Link>
        </li>
        <li className="li1">
          <Link to={""} className={"link link2"}>
            <img src="/imges/message-question.png" alt="..." />
            {props.langs === "en" ? <span>التعليمات</span> : <span>FAQ</span>}
          </Link>
        </li>
        <li className="li1">
          <Link to={""} className={"link link2"}>
            <img src="/imges/lock.png" alt="..." />
            {props.langs === "en" ? <span>حماية</span> : <span>Security</span>}
          </Link>
        </li>
        <li className="li1">
          <Link to={""} className={"link link2"} activeclassname="active">
            <img src="/imges/language-square.png" alt="..." />
            {props.langs === "en" ? <span>لغة</span> : <span>Language</span>}
          </Link>
        </li>
        <li>
          <Link to={"/"} className="logout">
            <img src="/imges/logout.png" alt="..." />
            {props.langs === "en" ? (
              <span>تسجيل الخروج</span>
            ) : (
              <span>Log Out</span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Siedbar;
