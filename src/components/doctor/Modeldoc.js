import {
  faStar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./doctpr.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axios, { AxiosHeaders } from "axios";

function Modeldoc(props) {
  let handDelete = () => {
    props.setShow("");
  };

  let [success, setsuccess] = useState(false);

  let id = props.id;
  // console.log(id);
  let [doctorsreviews, setdoctorsreviews] = useState([]);
  useEffect(() => {
    fetch(`https://almutamayizun.videosep.com/api/doctors-review/${id}`)
      .then((res) => res.json())
      .then((data) => setdoctorsreviews(data.data));
  }, [id, success]);

  let [Review, setReview] = useState("Review");
  let [userRating, setUserRating] = useState(1);

  // console.log(userRating);

  let [message, setmessage] = useState("");
  let [accept, setaccept] = useState(false);
  let Navigate = useNavigate();
  let [error, seterror] = useState(false);
  let token = localStorage.getItem("token");
  let [active, setactive] = useState(true);
  let [login,setlogin]=useState(false)
  async function formSubmit(e) {
    e.preventDefault();
    if(window.localStorage.getItem("email")){
       try {
      let res = await axios.post(
        "https://almutamayizun.videosep.com/api/add-doctor-rating",
        {
          message: message,
          rating: userRating,
          doctor_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setsuccess(res.data.msg);
      setmessage("");
      setsuccess(true);
      setUserRating(1);
      setaccept(true);
      navigator(`/Servicesdoctorpage/${id}`);
    } catch (error) {
      console.log(error);
      setactive(false);
      seterror(error);
    }
    }else{
      setlogin(true)
    }
   
  }
  function Reviews() {
    setReview("Review");
  }
  function AddReviews() {
    setReview("Add Review");
  }

  let handlRatingChange = (newValue) => {
    setUserRating(newValue);
  };

  let ratingshow =
    doctorsreviews.length > 0 ? (
      doctorsreviews.map((item, index) => {
        return (
          <div key={index} className="div-itme">
            <div className="div-info">
              <div className="img">
                {item.coveruser ? (
                  <img src={item.coveruser} alt="User Cover" />
                ) : (
                  <img
                    src="/imges/صورة واتساب بتاريخ 1446-04-18 في 18.20.20_9ac20cfe.jpg"
                    alt="Default Cover"
                  />
                )}
              </div>
              <div>
                <h5>{item.user}</h5>
                <Stack className="stack" spacing={1}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={item.rating}
                    readOnly
                  />
                </Stack>
              </div>
            </div>
            <p>{item.message}</p>
          </div>
        );
      })
    ) : (
      <div className="div-itme">
        {props.langs === "ar" ? "No Reviews" : "لا يوجد تقييمات"}
      </div>
    );

  return (
    <div className="">
      {props.show === "show" ? (
        <>
          <div>
            <div className="model">
              <div className={`modelAbout`}>
                <div className="div1">
                  <div className="div-about">
                    <div className="img">
                      <img src={props.img} alt="..." />
                    </div>
                    <div>
                      <h5>{props.name}</h5>
                      <p>{props.address}</p>
                      <span></span>
                      <div className="review">
                        <p className="review1">
                          <FontAwesomeIcon icon={faStar} className="icon" />
                          {props.rating}
                        </p>
                        <p className="review2">
                          ({props.ratingcount}
                          {props.langs === "en" ? " عدد التقييمات" : " Reviews"}
                          )
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="div2">
                    <p onClick={handDelete}>
                      <FontAwesomeIcon
                        icon={faXmark}
                        className={`icon-delete ${props.langs}`}
                      />
                    </p>
                    {/* <h6>400 SAR</h6> */}
                  </div>
                </div>
                <div className="links">
                  <NavLink
                    className={Review === "Review" ? "link1active" : "link1"}
                    onClick={Reviews}
                  >
                    {props.langs === "ar" ? "Reviews " : "التعليقات "}
                  </NavLink>
                  <NavLink
                    className={
                      Review === "Add Review" ? "link2active" : "link2"
                    }
                    onClick={AddReviews}
                  >
                    {props.langs === "en" ? " أضف تعليقات" : "Add Reviews"}
                  </NavLink>
                </div>

                {Review === "Add Review" ? (
                  <div className="div-addreview">
                    <form onSubmit={formSubmit}>
                      <div>
                        <label>
                          {props.langs === "en" ? "تقييم" : "Rating"}
                        </label>
                        <Stack spacing={1}>
                          <Rating
                            name="size-medium"
                            defaultValue={1}
                            value={userRating}
                            onChange={(event, newValue) => {
                              handlRatingChange(newValue);
                            }}
                          />
                        </Stack>
                      </div>

                      <label htmlFor="message">
                        {props.langs === "en" ? "رسالة" : "Message"}
                      </label>
                      <textarea
                        id="message"
                        required
                        value={message}
                        onChange={(e) => setmessage(e.target.value)}
                        placeholder={
                          props.langs === "en" ? "ادخل رسالتك" : "Enter Message"
                        }
                      ></textarea>
                      {/* {success === true ? : null} */}
                      {error.status === 500 || error.status === 402 ? (
                        <span className="errormodel">error</span>
                      ) : (
                        success === true &&
                        accept === true && (
                          <span className="successmodel">
                            {props.langs === "en"
                              ? "تم الاضافة بنجاح"
                              : " Added Successfully"}
                          </span>
                        )
                      )}
                      {login&&<span className="errormodel">{props.langs === "en" ? "يجب عليك تسجيل الدخول" : "You must be logged in"}</span>}
                      <br />
                      <button>{props.langs === "en" ? "اضافة" : "Add"}</button>
                    </form>
                  </div>
                ) : (
                  <div className="div-review">{ratingshow}</div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Modeldoc;
