import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup(prpos) {
  let [fname, setfname] = useState("");
  let [lname, setlname] = useState("");
  let [email, setemail] = useState("");
  let [birth, setbirth] = useState("");
  let [phone, setphone] = useState("");
  let [rpassword, setrpassword] = useState("");
  let [password, setpassword] = useState("");
  let [statekey, setstatekey] = useState("1");

  let [accept, setaccept] = useState(false);
  let [emailError, setemailError] = useState("");

  let Navigate = useNavigate();

  async function formSubmitsign(e) {
    let flog = true;
    e.preventDefault();
    setaccept(true);

    if (fname.length <= 0 || lname.length <= 0 || password.length < 8) {
      flog = false;
    } else {
      flog = true;
    }

    if (flog) {
      try {
        if (flog) {
          let res = await axios.post(
            "https://almutamayizun.videosep.com/api/register",
            {
              first_name: fname,
              last_name: lname,
              mobile: phone,
              country_id: statekey,
              email: email,
              password: password,
              birth_of_date: birth,
              password_confirmation: rpassword,
            }
          );
          if (res.status === 200 || res.status === 201 || res.status === 204) {
            window.localStorage.setItem("email", email);
            let token = res.data.data.token;
            localStorage.setItem("token", token);
            Navigate(`/`);
          }
        }
      } catch (error) {
        setemailError(error.status);
        console.log(error);
      }
    }
  }
  // console.log(fname, lname, phone, email, password, birth, statekey ,rpassword);

  let [Key, setKey] = useState([]);
  function gatKey(e) {
    fetch(`https://almutamayizun.videosep.com/api/countries`)
      .then((res) => res.json())
      .then((data) => setKey(data.data));
  }
  useEffect(() => {
    gatKey();
  }, []);
  let state_key = Key.map((item) => {
    return (
      <option key={item.id} value={item.id}>
        {item.number} {prpos.langs === "en" ? item.name_ar : item.name}
      </option>
    );
  });

  // let [selectData,setselectData]=useState("")
  let today = new Date().toISOString().split("T")[0];

  return (
    <div className="container">
      <div className={`login ${prpos.langs}`}>
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
            <h5>{prpos.langs === "ar" ? "Get Started now" : "ابدأ الآن"}</h5>

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
                  <Link to={"/login"} className="link1 hed">
                    {prpos.langs === "ar" ? "Login" : "تسجيل الدخول"}
                  </Link>
                </div>
                <div>
                  <Link to={"/signup"} className="link2">
                    {prpos.langs === "ar" ? "Sign Up" : "انشاء حساب"}
                  </Link>
                </div>
              </div>
            </div>
            <form onSubmit={formSubmitsign}>
              {accept && emailError === 422 && (
                <span className="error">
                  {prpos.langs === "ar"
                    ? "Error in email or phone number"
                    : "خطأ في البريد الالكتروني او رقم الهاتف"}
                </span>
              )}
              <div className="name">
                <div className="namediv">
                  <label htmlFor="FirstName">
                    {prpos.langs === "ar" ? "First Name" : "الاسم الاول"}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      prpos.langs === "ar"
                        ? "Enter First Name"
                        : "ادخال الاسم الاول"
                    }
                    className="FirstName"
                    id="FirstName"
                    value={fname}
                    onChange={(e) => setfname(e.target.value)}
                  />
                  {fname.length <= 1 && accept && (
                    <span className="error">
                      {prpos.langs === "ar"
                        ? "First name is required"
                        : "ادخال الاسم الاول"}
                    </span>
                  )}
                </div>
                <div className="namediv">
                  <label htmlFor="LastName">
                    {prpos.langs === "ar" ? "Last Name" : "اسم العائلة"}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      prpos.langs === "ar"
                        ? "Enter Last Name"
                        : "ادخال الاسم الاخير"
                    }
                    className="LastName"
                    id="LastName"
                    value={lname}
                    onChange={(e) => setlname(e.target.value)}
                  />
                  {lname.length <= 1 && accept && (
                    <span className="error">
                      {prpos.langs === "ar"
                        ? "Last name is required"
                        : " ادخال الاسم الاخير"}
                    </span>
                  )}
                </div>
              </div>
              <label htmlFor="email">
                {prpos.langs === "ar" ? "Email" : "البريد الالكتروني"}
              </label>
              <input
                type="email"
                id="email"
                className="email"
                placeholder={
                  prpos.langs === "ar"
                    ? "Enter Email"
                    : "ادخال البريد الالكتروني"
                }
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />

              <label htmlFor="date">
                {prpos.langs === "ar" ? "Date of Birth" : "تاريخ الميلاد"}
              </label>
              <input
                type="date"
                id="date"
                className="date"
                max={today}
                value={birth}
                onChange={(e) => setbirth(e.target.value)}
              />
              <label htmlFor="PhoneNumber">
                {prpos.langs === "ar" ? "Phone Number" : "رقم الهاتف"}
              </label>
              <div className={` phone ${prpos.langs}`}>
                <select
                  value={statekey}
                  onChange={(e) => setstatekey(e.target.value)}
                >
                  {state_key}
                </select>
                <input
                  type="text"
                  placeholder={
                    prpos.langs === "ar"
                      ? "Enter Phone Number"
                      : "ادخال رقم الهاتف"
                  }
                  id="PhoneNumber"
                  className="PhoneNumber"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
              </div>
              {phone.length <= 8&& phone.length >0 && accept && (
                <span className="error">
                  {prpos.langs === "ar"
                    ? "Phone Number is length 8"
                    : " ادخال رقم الهاتف"}{" "}
                </span>
              )}
              {phone.length ===0 && accept && (
                <span className="error">
                  {prpos.langs === "ar"
                    ? "Phone Number is required"
                    : " ادخال رقم الهاتف"}{" "}
                </span>
              )}

              <label htmlFor="password">
                {prpos.langs === "ar" ? "Password" : "كلمة المرور"}
              </label>
              <input
                type="password"
                id="password"
                placeholder={
                  prpos.langs === "ar" ? "Enter Password" : "ادخال كلمة المرور"
                }
                className="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              {password.length < 8 && accept && (
                <span className="error">
                  {prpos.langs === "ar"
                    ? "Password is length 8"
                    : "الرجاء ادخال كلمة المرور"}
                </span>
              )}
              <label>Confirmation Password</label>
              <input
                className="password"
                type="password"
                placeholder={
                  prpos.langs === "ar"
                    ? "Enter Confirmation Password"
                    : "تأكيد كلمة المرور"
                }
                value={rpassword}
                onChange={(e) => setrpassword(e.target.value)}
              />
              {rpassword !== password && accept && (
                <span className="error">
                  {prpos.langs === "ar"
                    ? "Password mismatch"
                    : "كلمة المرور غير متطابقة"}
                </span>
              )}
              <button type="submit">
                {prpos.langs === "ar" ? "Sign Up" : "انشاء حساب"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
