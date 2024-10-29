import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Loading from "../loading/Loading";

function Eideprofile(props) {
  let [loading, setloading] = useState(true);

  let [name, setname] = useState("");
  let [age, setage] = useState("");
  let [img, setimg] = useState(null);
  let [gender, setgender] = useState("1");

  let [accept, setaccept] = useState(false);
  let [emailError, setemailError] = useState("");
  let [eerror, seteerror] = useState(null);
  let Navigate = useNavigate();

  let token = window.localStorage.getItem("token");
  // console.log(token);

  async function sendData(e) {
    e.preventDefault();
    try {
      let res = await axios.post(
        "https://almutamayizun.videosep.com/api/creat-user-relatives",
        {
          Name: name,
          age: age,
          gender: gender,
          relative_image: img,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res , "res");
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        Navigate(`/profile`);
      }
    } catch (error) {
      console.log(error);
      setemailError(error);
      seteerror(error.message);
    }
  }

  let context = useOutletContext();
  let lang = localStorage.getItem("lang");

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);
  return (
    <div className="container">
      <div className={`profileadd p-0`}>
        <div className="row">
          <div className="col-12 form p-0">
            <form onSubmit={sendData}>
              <div className="container">
                <div className="row">
                  {loading ? (
                    <Loading />
                  ) : (
                    <>
                      {emailError.status === 422 && (
                        <span className="error">
                          {lang === "en"
                            ? "يوجد خطا في ارسال البيانات"
                            : "There was an error sending data"}
                        </span>
                      )}
                      {eerror && (
                        <span className="errormodel">
                          {props.langs === "en"
                            ? "حدث خطأ: " + eerror
                            : "Error: " + eerror}
                        </span>
                      )}

                      <div className="col-12 col-md-6">
                        <label htmlFor="Name">
                          {lang === "en" ? "الاسم" : "Name"}
                        </label>
                        <input
                          type="text"
                          placeholder={
                            lang === "en" ? "ادخل الاسم" : "Enter Name"
                          }
                          className="FirstName"
                          id="Name"
                          onChange={(e) => setname(e.target.value)}
                          value={name}
                        />
                        {name.length <= 1 && accept && (
                          <span className="error">
                            {lang === "ar"
                              ? "name is required"
                              : " ادخال الاسم مطلوب"}
                          </span>
                        )}
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="LastName">
                          {lang === "en" ? "اضافة الصور" : "Add photh"}
                        </label>
                        <input
                          type="file"
                          // placeholder="Last Name"
                          className="LastName"
                          id="LastName"
                          onChange={(e) => setimg(e.target.files[0])}
                          Failed={img}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="PhoneNumber">
                          {lang === "en" ? "الجنس" : "Gender"}
                        </label>
                        <select
                          selected
                          value={gender}
                          onChange={(e) => setgender(e.target.value)}
                        >
                          <option disabled>
                            {lang === "en" ? "اختر الجنس" : "Select gender"}
                          </option>
                          <option value={"1"}>
                            {lang === "en" ? "ذكر" : "man"}
                          </option>
                          <option value={"2"}>
                            {lang === "en" ? "انثى" : "woman"}
                          </option>
                        </select>
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="PhoneNumber">
                          {lang === "en" ? "العمر" : "Age"}
                        </label>
                        <input
                          type="text"
                          placeholder={
                            lang === "en" ? "ادخل العمر" : "Enter Age"
                          }
                          onChange={(e) => setage(e.target.value)}
                          value={age}
                        />
                        {age.length === 0 && accept && (
                          <span className="error">
                            {lang === "ar"
                              ? "age is required"
                              : " ادخال العمر مطلوب"}
                          </span>
                        )}
                      </div>
                      <button type="submit">
                        {lang === "en" ? "ارسال " : "Submit"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Eideprofile;
