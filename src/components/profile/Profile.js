import React, { useEffect, useState } from "react";
import "./profile.css";
import { Link, Outlet } from "react-router-dom";

import Siedbar from "./Siedbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faPen } from "@fortawesome/free-solid-svg-icons";
import Profile1 from "./Profile1";
import Eiedimg from "./Eiedimg";
import Loading from "../loading/Loading";
function Profile(prpos) {
  let [loading, setloading] = useState(true);

  let leng = {
    en: "en",
    ar: "ar",
  };

  let [show, setshow] = useState("");

  let [img, setimg] = useState(
    "/imges/صورة واتساب بتاريخ 1446-04-18 في 18.20.20_9ac20cfe.jpg"
  );
  let token = window.localStorage.getItem("token");

  async function dataUser() {
    if (!token) {
      console.log("No token found");
      return;
    }
    try {
      let res = await fetch(`https://almutamayizun.videosep.com/api/user-show`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      let data = await res.json();
      setimg(data.data[0].user_image); // تأكد من أنك تستخدم المفتاح الصحيح للبيانات المستلمة
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dataUser();
    setTimeout(() => {
      setloading(false);
    }, 10);
  }, [img]);
  // console.log(img);
  return (
    <>
      <div className={`profile ${prpos.langs}`}>
        <div className="container ">
          {prpos.langs === "en" ? (
            <Link to={"/"} className="back">
              <FontAwesomeIcon icon={faLeftLong} className="iconar" /> عوده
            </Link>
          ) : (
            <Link to={"/"} className="back">
              <FontAwesomeIcon icon={faLeftLong} className="icon" /> Back
            </Link>
          )}
          {prpos.langs === "en" ? <h3>الملف الشخصي</h3> : <h3>Profile</h3>}
        </div>
        <div className="container-fluid p-0 backcround-app ">
          <div className="backcround"></div>
        </div>
        <div className="container">
          <div className="img">
            {img === null ? (
              <img
                src="/imges/صورة واتساب بتاريخ 1446-04-18 في 18.20.20_9ac20cfe.jpg"
                alt="..."
              />
            ) : (
              <img src={img} alt="..." />
            )}
            {prpos.langs === "en" ? (
              <FontAwesomeIcon
                onClick={() => {
                  setshow("show");
                }}
                icon={faPen}
                className={`iconen`}
              />
            ) : (
              <FontAwesomeIcon
                onClick={() => {
                  setshow("show");
                }}
                icon={faPen}
                className={`iconar`}
              />
            )}
          </div>
        </div>
        <div className="container-lg">
          <div className="row">
            <div className="side col-3 ">
              <div className="side-itme">
                <Siedbar langs={prpos.langs} />
              </div>
            </div>
            <div className="col-9 p-0">
              {loading ? (
                  <Loading />
              ) : (
                  <Outlet langs={prpos.langs} context={leng} />
              )}
            </div>
          </div>
        </div>
        <Eiedimg langs={prpos.langs} show={show} setShow={setshow} />
      </div>
    </>
  );
}

export default Profile;
