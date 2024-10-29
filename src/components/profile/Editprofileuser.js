import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Loading from "../loading/Loading";

function Editprofileuser() {
  let [loading, setloading] = useState(true);

  let [fname, setfname] = useState("");
  let [lname, setlname] = useState("");
  let [email, setemail] = useState("");
  let [phone, setphone] = useState("");
  let [password, setpassword] = useState("");

  let [accept, setaccept] = useState(false);
  let [emailError, setemailError] = useState("");

  let Navigate = useNavigate();

  let token = window.localStorage.getItem("token");
  // console.log(token);

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
      setfname(data.data[0].first_name);
      setlname(data.data[0].last_name);
      setemail(data.data[0].email);
      setphone(data.data[0].mobile);
      // console.log(fname);
    } catch (error) {
      console.log(error);
    }
  }

  async function formsubmit(e) {
    e.preventDefault();

    try {
      let res = await axios.post(
        "https://almutamayizun.videosep.com/api/user/update",
        {
          first_name: fname,
          last_name: lname,
          email: email,
          mobile: phone,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // إضافة التوكن
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        window.localStorage.setItem("email", email);
        Navigate("/profile");
      }
      console.log(res);
    } catch (error) {
      // console.log(error);
      setemailError(error);
    }
  }

  useEffect(() => {
    dataUser();
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);

  let context = useOutletContext();
  let lang = localStorage.getItem("lang");

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="userShow">
            <form onSubmit={formsubmit}>
              {emailError.status === 422 && (
                <span className="error">
                  {lang === "en"
                    ? "يوجد خطا في ارسال البيانات "
                    : "There was an error sending data"}
                </span>
              )}
              <label htmlFor="FirstName">
                {lang === "ar" ? "First Name" : "الاسم الاول"}
              </label>
              <input
                type="text"
                placeholder={fname}
                className="FirstName"
                id="FirstName"
                value={fname}
                onChange={(e) => setfname(e.target.value)}
              />
              <label htmlFor="LastName">
                {lang === "ar" ? "Last Name" : "اسم العائلة"}
              </label>
              <input
                type="text"
                placeholder={lname}
                className="LastName"
                id="LastName"
                value={lname}
                onChange={(e) => setlname(e.target.value)}
              />
              <label htmlFor="email">
                {lang === "ar" ? "Email" : "البريد الالكتروني"}
              </label>
              <input
                type="email"
                id="email"
                className="email"
                placeholder={email}
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
              <label htmlFor="PhoneNumber">
                {lang === "ar" ? "Phone Number" : "رقم الهاتف"}
              </label>
              <div className={` phone ${lang}`}>
                <input
                  type="text"
                  placeholder={phone}
                  id="PhoneNumber"
                  className="PhoneNumber"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
              </div>
              <label htmlFor="password">
                {lang === "ar" ? "Password (Optional)" : "كلمة المرور"}
              </label>
              <input
                type="password"
                id="password"
                placeholder={lang === "ar" ? "(Optional)" : "ادخال كلمة المرور"}
                className="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <button type="submit">
                {lang === "ar" ? "Up Date" : "تحديث"}
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Editprofileuser;
