import {
  faCheck,
  faStar,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Rating, Stack } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Slider from "react-slick";
// الخريطه
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
// الخريطه

function Doctorservicemodel(props) {
  var settings = {
    dots: true,
    infinite: false, // تغيير هذا لضمان عدم التكرار
    speed: 500,
    slidesToShow: 7, // الحد الأقصى لعدد الشرائح ليكون 5
    slidesToScroll: 7,
    initialSlide: 0,
    // autoplay: true,
    autoplaySpeed: 2000,
    // pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6, // تقليل العدد عند الشاشات المتوسطة
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 5, // تقليل العدد عند الشاشات الصغيرة
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 3, // عرض 2 شريحة للشاشات الأصغر
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 3, // عرض شريحة واحدة للشاشات الصغيرة جداً
          slidesToScroll: 3,
        },
      },
    ],
  };
  let id = props.id;

  let [doctorsreviews, setdoctorsreviews] = useState([]);
  function Doctorserviceshow() {
    fetch(`https://almutamayizun.videosep.com/api/doctors-services-show/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setdoctorsreviews(data.data);
      });
  }

  let [showreviewsservice, setshowreviewsservice] = useState([]);
  function showReviews() {
    fetch(`https://almutamayizun.videosep.com/api/services-review/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setshowreviewsservice(data.data);
      });
  }

  let [code, setcode] = useState("");
  let [discount, setdiscount] = useState(0);
  let [error, seterror] = useState(null);
  let [newtotal, setnewtotal] = useState(0);

  let appiyCoupon = async () => {
    try {
      let res = await axios.post(
        "https://almutamayizun.videosep.com/api/apply-coupon",
        {
          coupon_code: code,
          order_total: doctorsreviews.price,
        }
      );
      setnewtotal(res.data.new_total);
      setdiscount(res.data.discount);
    } catch (error) {
      seterror(error.response.data.error);
    }
  };

  let [datashow, setdatashow] = useState([]);

  let token = window.localStorage.getItem("token");
  async function dataUser() {
    if (!token) {
      // console.log("No token found");
      return;
    }
    try {
      let res = await fetch(
        `https://almutamayizun.videosep.com/api/user-relatives`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      let data = await res.json();
      setdatashow(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  let [selecs, setselecs] = useState("");
  let selec1 = datashow.map((item) => {
    return <option value={item.id}>{item.Name}</option>;
  });

  let idDoctor = props.id_doctor;
  let [dateDay, setdateDay] = useState([]);
  let [datayear, setdatayear] = useState([]);
  let [datamonth, setdatamonth] = useState([]);
  function dataDate() {
    fetch(`https://almutamayizun.videosep.com/api/doctor-dates/${idDoctor}`)
      .then((res) => res.json())
      .then((data) => {
        setdateDay(data.data);
        setdatayear(data.data);
        setdatamonth(data.data[0]);
      });
  }

  let [idDay, setidDay] = useState(null);
  let [idHour, setidHour] = useState(null);
  let [hourss, sethourss] = useState([]);
  let [showday, setshowday] = useState("");
  let [shownameday, setshownameday] = useState("");
  let [showhour, setshowhour] = useState("");

  function hours() {
    if (idDay === null) {
      return;
    } else {
      fetch(`https://almutamayizun.videosep.com/api/doctor-hours/${idDay}`)
        .then((res) => res.json())
        .then((data) => {
          sethourss(data.data);
        });
    }
  }

  let daysSlider = dateDay.map((itme) => {
    return (
      <NavLink
        className={`day ${idDay === itme.id ? "hho" : ""}`}
        onClick={() => {
          setidDay(itme.id);
          setshowday(itme.date);
          {
            props.langs === "ar"
              ? setshownameday(itme.day_name_english)
              : setshownameday(itme.day_name_arabic);
          }
        }}
        key={itme.id}
      >
        {/* <NavLink> */}
        <p>{itme.day_name_english.substring(0, 3)}</p>
        <h6>{itme.day_number}</h6>
        {/* </NavLink> */}
      </NavLink>
    );
  });

  const [step, setStep] = useState(0);
  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 7)); // تأكد من عدم تجاوز عدد الخطوات
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0)); // تأكد من عدم الرجوع إلى خطوة سلبية
  };

  // model اخفاء ال
  let handDelete = () => {
    props.setShow("");
  };

  let [accept, setaccept] = useState(false);
  let [emailError, setemailError] = useState("");

  let [message, setmessage] = useState("");
  let [Review, setReview] = useState("About");
  let [userRating, setUserRating] = useState(1);
  let [success, setsuccess] = useState(false);

  let [errorlogin, seterrorlogin] = useState(false);
  async function formSubmit(e) {
    e.preventDefault();
    if(window.localStorage.getItem("email")){
          try {
      let res = await axios.post(
        "https://almutamayizun.videosep.com/api/add-service-rating",
        {
          message: message,
          rating: userRating,
          service_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setmessage("");
      setsuccess(true);
      setUserRating(1);
    } catch (error) {
      seterror(error.status);
    }
    }else{
      seterrorlogin(true)
    }

  }

  // الخريطه

  const [markerPosition, setMarkerPosition] = useState([23.8859, 45.0792]); // موقع أولي
  const [locationFound, setLocationFound] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(null);
  const [canProceed, setCanProceed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleLocateUser = () => {
    setLocationFound(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setMarkerPosition(newPosition);
          setLocationFound(true);
          setPermissionGranted(true);
          setCanProceed(true);
          const locationURL = `https://www.google.com/maps?q=${newPosition[0]},${newPosition[1]}`;
          // sendLocationToAPI(locationURL);

          // طباعة الإحداثيات في وحدة التحكم
          // console.log("Current Location (Auto):", newPosition);
        },
        (error) => {
          console.error("Error fetching geolocation", error);
          setPermissionGranted(false);
          setCanProceed(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
      );
      if (response.data.length > 0) {
        const location = response.data[0];
        const newPosition = [
          parseFloat(location.lat),
          parseFloat(location.lon),
        ];
        setMarkerPosition(newPosition);
        setSearchResult(location.display_name);
        setLocationFound(true);

        // طباعة الإحداثيات عند البحث
        console.log("Current Location (Search):", newPosition);
      } else {
        alert("Location not found. Try another search term.");
      }
    } catch (error) {
      console.error("Error fetching location", error);
    }
  };

  function MyMapComponent() {
    const map = useMap();
    useEffect(() => {
      if (locationFound) {
        map.flyTo(markerPosition, 13);
      }
    }, [locationFound, map, markerPosition]);
    return null;
  }

  // مكون لتحديد الموقع يدوياً عند النقر على الخريطة
  function ManualMarkerSetter() {
    useMapEvent("click", (e) => {
      const newPosition = [e.latlng.lat, e.latlng.lng];
      setMarkerPosition(newPosition);
      setLocationFound(true);
      setCanProceed(true);

      // طباعة الإحداثيات عند التحديد اليدوي
      // console.log("Current Location (Manual):", newPosition);
    });
    return null;
  }

  const handleProceed = () => {
    if (canProceed) {
      // nextStep() ;
    } else {
      alert("Please locate your position before proceeding.");
    }
  };

  // الخريطه

  function Reviews() {
    setReview("Review");
  }
  function AddReviews() {
    setReview("Add Review");
  }
  function about() {
    setReview("About");
  }

  let handlRatingChange = (newValue) => {
    setUserRating(newValue);
  };

  useEffect(() => {
    Doctorserviceshow();
    dataUser();
    showReviews();
    dataDate();
    hours();
  }, [id, success, idDay]);

  let total = +doctorsreviews.price;

  let totalNew = total - discount;

  let [login, setlogin] = useState(false);
  async function postData(e) {
    e.preventDefault();
    if (window.localStorage.getItem("email")) {
      if (code === "") {
        setcode("0");
      }
      try {
        let res = await axios.post(
          "https://almutamayizun.videosep.com/api/add-order",
          {
            service_id: String(id),
            bate_id: String(idDay),
            hour_id: String(idHour),
            doctor_id: String(idDoctor),
            relative_id: String(selecs),
            google_maps: String(markerPosition),
            subtotal: String(total),
            discount_code: String(code),
            discount: String(discount),
            total: String(totalNew),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(res);
        nextStep();
      } catch (error) {
        console.log(error);
      }
    } else {
      // alert("Please login first");
      setlogin(true);
    }
  }

  return (
    <div className="">
      {props.show === "show" ? (
        <>
          {/* معلومات التقييمات اضافه تقييم */}
          {step === 0 && (
            <div className="model">
              <div className={`modelAbout`}>
                <div className="div1">
                  <div className="div-about">
                    <div className="img">
                      <img src={doctorsreviews.cover} alt="..." />
                    </div>
                    <div>
                      {props.langs === "ar" ? (
                        <h5>{doctorsreviews.name}</h5>
                      ) : (
                        <h5>{doctorsreviews.name_ar}</h5>
                      )}
                      <span></span>
                      <div className="review">
                        <p className="review1">
                          <FontAwesomeIcon icon={faStar} className="icon" />
                          {doctorsreviews.average_rating}
                        </p>
                        <p className="review2">
                          ({doctorsreviews.ratings_count}{" "}
                          {props.langs === "ar" ? "Reviews" : "التقييمات"})
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="div2">
                    <p onClick={handDelete}>
                      <FontAwesomeIcon
                        icon={faXmark}
                        className={`icon-delete ${props.langs} `}
                      />
                    </p>
                    <h6>{doctorsreviews.price} SAR</h6>
                    {step < 5 && (
                      <Link onClick={nextStep}>
                        {props.langs === "en" ? "التالي" : "Next"}
                      </Link>
                    )}
                  </div>
                </div>
                <div className="links">
                  <NavLink
                    className={Review === "About" ? "link1active" : "link2"}
                    onClick={about}
                  >
                    {props.langs === "ar" ? "About" : "معلومات"}
                  </NavLink>
                  <NavLink
                    className={Review === "Review" ? "link1active" : "link2"}
                    onClick={Reviews}
                  >
                    {props.langs === "ar" ? "Reviews" : "التقييمات"}
                  </NavLink>
                  <NavLink
                    className={
                      Review === "Add Review" ? "link1active" : "link2"
                    }
                    onClick={AddReviews}
                  >
                    {props.langs === "ar" ? "Add Review" : "اضافة تقييم"}
                  </NavLink>
                </div>

                {Review === "Add Review" ? (
                  <div className="div-addreview">
                    <form onSubmit={formSubmit}>
                      <label>
                        {props.langs === "ar" ? "Rating" : "التقييمات"}
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

                      <label htmlFor="message">
                        {props.langs === "ar" ? "Message" : "الرسالة"}
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        required
                        onChange={(e) => setmessage(e.target.value)}
                        placeholder={
                          props.langs === "ar"
                            ? "Enetr Message"
                            : "ادخل الرسالة"
                        }
                      ></textarea>
                      {message.length <= 1 && accept && (
                        <span className="error">
                          {props.langs === "ar"
                            ? "message is required"
                            : " الرسالة مطلوبة"}
                        </span>
                      )}
                      {success === true ? (
                        <span className="successmodel">
                          {props.langs === "en"
                            ? "تم الاضافة بنجاح"
                            : " Added Successfully"}
                        </span>
                      ) : null}
                      {error === 500 ? (
                        <span className="errormodel">
                          {props.langs === "ar"
                            ? "please login"
                            : "برجاء تسجيل الدخول"}
                        </span>
                      ) : null}
                      {errorlogin && (
                        <span className="errormodel">
                          {props.langs === "ar"
                            ? "please login"
                            : "برجاء تسجيل الدخول"}
                        </span>
                      )}
                      <button>
                        {props.langs === "ar" ? "Submit" : "ارسال"}
                      </button>
                    </form>
                  </div>
                ) : Review === "Review" ? (
                  <div className="div-review">
                    {showreviewsservice.length > 0 ? (
                      showreviewsservice.map((item) => (
                        <div key={item.id} className="div-itme">
                          <div className="div-info">
                            <div className="img">
                              {item.coveruser === null ? (
                                <img
                                  src="/imges/صورة واتساب بتاريخ 1446-04-18 في 18.20.20_9ac20cfe.jpg"
                                  alt="Default Cover"
                                />
                              ) : (
                                <img src={item.coveruser} alt="User Cover" />
                              )}
                            </div>
                            <div>
                              <h5>{item.user}</h5>
                              <div
                                style={{ direction: "ltr", display: "flex" }}
                              >
                                <Stack
                                  style={{ direction: "ltr" }}
                                  className="stack"
                                  spacing={1}
                                >
                                  <Rating
                                    name="half-rating-read"
                                    defaultValue={2.5}
                                    precision={item.rating}
                                    readOnly
                                    style={{ direction: "ltr" }}
                                  />
                                </Stack>
                              </div>
                            </div>
                          </div>
                          <p>{item.message}</p>
                        </div>
                      ))
                    ) : (
                      <p>
                        {props.langs === "ar"
                          ? "No Reviews "
                          : "لا يوجد تقييمات"}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="div3">
                      <h6>{props.langs === "ar" ? "About" : "معلومات"}</h6>
                      <p>
                        {props.langs === "ar"
                          ? doctorsreviews.About
                          : doctorsreviews[`About ar`]}
                      </p>
                    </div>
                    <div className="div3">
                      <h6>
                        {props.langs === "ar"
                          ? "Service included"
                          : "الخدمة متضمنة"}
                      </h6>
                      <p>
                        {props.langs === "ar"
                          ? doctorsreviews[`service included`]
                          : doctorsreviews[`service included ar`]}
                      </p>
                    </div>
                    <div className="div4">
                      <div>
                        <img src="/imges/info-circle.png" alt="..." />
                      </div>
                      <div>
                        <h6>
                          {props.langs === "ar" ? "Instructions" : "تعليمات"}
                        </h6>
                        <p>
                          Lorem ipsum dolor sit amet consectetur. Neque luctus
                          erat id egestas sapien. Aliquam faucibus leo porttitor
                          ut. Facilisi quis vestibulum aliquet dictum justo. Et
                          fermentum eros massa ultricies sed quisque adipiscing.
                          Venenatis duis etiam.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          {/* معلومات التقييمات اضافه تقييم */}
          {step === 1 && (
            <div className="model">
              <div className="modelAbout">
                <div className="div1">
                  <div className="div-about">
                    <div className="img">
                      <img src={doctorsreviews.cover} alt="..." />
                    </div>
                    <div>
                      <h5>{doctorsreviews.name}</h5>
                      <span></span>
                      <div className="review">
                        <p className="review1">
                          <FontAwesomeIcon icon={faStar} className="icon" />
                          {doctorsreviews.average_rating}
                        </p>
                        <p className="review2">
                          ({doctorsreviews.ratings_count}{" "}
                          {props.langs === "ar" ? "Reviews" : "التقييمات"})
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="div2">
                    <p onClick={handDelete}>
                      <FontAwesomeIcon
                        icon={faXmark}
                        className={`icon-delete ${props.langs} `}
                      />
                    </p>
                    <h6>{doctorsreviews.price} SAR</h6>
                    {step > 0 && (
                      <Link onClick={prevStep}>
                        {props.langs === "ar" ? "Back" : "العودة"}
                      </Link>
                    )}
                    {step < 5 ? (
                      // <button>
                      <button
                        className={`${!idHour ? "databutton2" : "databutton"}`}
                        onClick={() => {
                          nextStep();
                        }}
                        disabled={!idHour}
                      >
                        {props.langs === "ar" ? "Next" : "التالي"}
                        {/* </button> */}
                      </button>
                    ) : (
                      <button type="submit">Submit</button>
                    )}
                  </div>
                </div>
                <div className="schedule">
                  <h5>{props.langs === "ar" ? "Schedule" : "جدول"}</h5>
                  {datayear.length > 0 ? (
                    <>
                      <div className="month">
                        <img src="/imges/Calendar.png" alt="..." />

                        <h6 style={{ marginLeft: "10px", marginBottom: "0px" }}>
                          {props.langs === "ar"
                            ? datamonth.month_name_english
                            : datamonth.month_name_arabic}
                          , {datayear[0].year}
                        </h6>
                      </div>
                      {/* <div className="days">
                        {dateDay.map((itme) => {
                          return (
                            <NavLink
                              className={`day ${
                                idDay === itme.id ? "hho" : ""
                              }`}
                              onClick={() => {
                                setidDay(itme.id);
                                setshowday(itme.date);
                                {
                                  props.langs === "ar"
                                    ? setshownameday(itme.day_name_english)
                                    : setshownameday(itme.day_name_arabic);
                                }
                              }}
                              key={itme.id}
                            >
                              <p>{itme.day_name_english.substring(0, 3)}</p>
                              <h6>{itme.day_number}</h6>
                            </NavLink>
                          );
                        })}
                      </div> */}
                      <div style={{ textarea: "cnter" }} className="dayslist">
                        <Slider {...settings}>{daysSlider}</Slider>
                      </div>
                      {hourss.length > 0 ? (
                        <div style={{ marginTop: "60px" }} className="times">
                          {hourss.map((itme) => (
                            <NavLink
                              className={`time ${
                                idHour === itme.id ? "hho" : ""
                              }`}
                              onClick={() => {
                                setidHour(itme.id);
                                setshowhour(itme.start_hourtotel);
                              }}
                              key={itme.id}
                            >
                              {itme.start_hour}:00 {itme.pm_am}
                            </NavLink>
                          ))}
                          <p style={{ width: "100%" }}>
                            {props.langs === "ar"
                              ? "choisissez votre hour"
                              : "اختيار الساعة"}
                          </p>
                        </div>
                      ) : (
                        <div style={{ marginTop: "40px" }}>
                          {props.langs === "ar"
                            ? "choisissez votre date"
                            : "اختيار اليوم"}
                        </div>
                      )}
                    </>
                  ) : (
                    <h4 className="error">
                      {props.langs === "ar"
                        ? "لا توجد مواعيد"
                        : "No appointments"}
                    </h4>
                  )}
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="model">
              <div className="modelAbout">
                <p onClick={handDelete}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={`icon-delete ${props.langs} `}
                  />
                </p>
                <div className="map">
                  <p className="pra">
                    {props.langs === "ar"
                      ? " Search for the place or press a button Locate Me"
                      : "ابحث عن المكان أو اضغط على زر حدد موقعي"}
                  </p>
                  {permissionGranted === false && (
                    <div style={{ color: "red", margin: "10px" }}>
                      {props.langs === "ar"
                        ? "Please allow location access in your browser settings."
                        : "يرجى السماح بالوصول إلى الموقع في إعدادات المتصفح الخاص بك."}
                    </div>
                  )}
                  <div
                    style={{
                      position: "relative",
                      height: "380px",
                      width: "100%",
                    }}
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        props.langs === "ar"
                          ? "Search for a place"
                          : "ابحث عن مكان"
                      }
                      className="search-input"
                    />
                    <button onClick={handleSearch} className="search-button">
                      {props.langs === "ar" ? "Search" : "بحث"}
                    </button>

                    <button
                      onClick={handleLocateUser}
                      className="locate-button"
                    >
                      {props.langs === "ar" ? "Locate Me" : "حدد موقعي"}
                    </button>

                    <MapContainer
                      className="map-container"
                      center={markerPosition}
                      zoom={6}
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      {/* عرض موقع الـ Marker */}
                      <Marker position={markerPosition}>
                        <Popup>
                          You are here! Latitude: {markerPosition[0]},
                          Longitude: {markerPosition[1]}
                        </Popup>
                      </Marker>
                      <MyMapComponent />
                      <ManualMarkerSetter /> {/* إضافة مكون التحديد اليدوي */}
                    </MapContainer>

                    {searchResult && (
                      <div className="search-result">
                        Result found: {searchResult}
                      </div>
                    )}
                  </div>
                </div>

                {step > 0 && (
                  <Link className="proceed-button2" onClick={prevStep}>
                    {props.langs === "ar" ? "Back" : "العودة"}
                  </Link>
                )}
                {step < 5 && (
                  <Link onClick={nextStep}>
                    <button
                      onClick={handleProceed}
                      disabled={!canProceed}
                      className={
                        !canProceed ? "proceed-button" : "proceed-button2"
                      }
                    >
                      {props.langs === "ar" ? "Next" : "التالي"}
                    </button>
                  </Link>
                )}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="model">
              <div className="modelAbout">
                <div className="div1">
                  <div className="div-about">
                    <div className="img">
                      <img src={doctorsreviews.cover} alt="..." />
                    </div>
                    <div>
                      {/* <h5>{doctorsreviews.name}</h5> */}
                      {props.langs === "ar" ? (
                        <h5>{doctorsreviews.name}</h5>
                      ) : (
                        <h5>{doctorsreviews.name_ar}</h5>
                      )}
                      <span></span>
                      <div className="review">
                        <p className="review1">
                          <FontAwesomeIcon icon={faStar} className="icon" />
                          {doctorsreviews.average_rating}
                        </p>
                        <p className="review2">
                          ({doctorsreviews.ratings_count}
                          {props.langs === "ar" ? "Review" : "التقييم"})
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="div2">
                    <p onClick={handDelete}>
                      <FontAwesomeIcon
                        icon={faXmark}
                        className={`icon-delete ${props.langs} `}
                      />
                    </p>

                    <h6>{doctorsreviews.price} SAR</h6>
                    {step > 0 && (
                      <Link onClick={prevStep}>
                        {props.langs === "ar" ? "Back" : "رجوع"}
                      </Link>
                    )}
                  </div>
                </div>

                <div className="date">
                  <div>
                    <div className="date">
                      <h6>
                        {props.langs === "ar"
                          ? "Date & Time"
                          : "التاريخ والوقت"}
                      </h6>
                      <Link>{props.langs === "ar" ? "Change" : "يتغير"}</Link>
                    </div>
                    <div className="img">
                      <div>
                        <img src="/imges/Calendar.png" alt="..." />
                      </div>
                      {/* <p>Wednesday, Jun 23, 2021 | 10:00 AM</p> */}
                      <p>
                        {shownameday}, {showday} | {showhour}
                      </p>
                    </div>
                    <div className="img">
                      <div>
                        <img
                          src="/imges/location@2x.png"
                          width={"20px"}
                          alt="..."
                        />
                      </div>
                      <p>{markerPosition}</p>
                    </div>
                  </div>
                  <div className="datails1">
                    <h6>{props.langs === "ar" ? "Patient" : " المريض"}</h6>
                    <div>
                      <FontAwesomeIcon icon={faUser} className="icon" />
                      {/* <input type="text" placeholder="Select patient" /> */}
                      <select
                        onChange={(e) => setselecs(e.target.value)}
                        className="selec1"
                      >
                        <option>{props.langs === "ar" ? "me" : "انا"}</option>
                        {selec1}
                      </select>
                    </div>
                  </div>
                  {/* <div className="datails2">
                      <h6>Payment Detail</h6>
                      <div>
                        <p>Consultation</p>
                        <p className="pice">$60.00</p>
                      </div>
                      <div>
                        <p>Admin Fee</p>
                        <p className="pice">$01.00</p>
                      </div>
                      <p>Aditional Discount</p>
                    </div> */}
                  <div className="coupon">
                    <h6>{props.langs === "ar" ? "Coupon" : " الكوبون"}</h6>
                    <div>
                      <img src="/imges/ticket-discount.png" alt="..." />
                      <input
                        type=" text"
                        placeholder={props.langs === "ar" ? "Code" : "كود"}
                        value={code}
                        onChange={(e) => setcode(e.target.value)}
                      />
                    </div>
                    <button
                      className="apply"
                      type="submit"
                      onClick={appiyCoupon}
                    >
                      {props.langs === "ar" ? "Apply" : "تطبيق"}
                    </button>
                  </div>
                  <div className="total">
                    <h6>{props.langs === "ar" ? "Total" : "المجموع"}</h6>
                    <h5>{doctorsreviews.price} SAR</h5>
                  </div>

                  {discount !== 0 ? (
                    <>
                      <div className="total">
                        <h6>
                          {props.langs === "ar" ? "Coupon name" : "اسم الكوبون"}
                        </h6>
                        <h5>{code}</h5>
                      </div>
                      <div className="total">
                        <h6>{props.langs === "ar" ? "Discount" : "الخصم"}</h6>
                        <h5>{discount} SAR</h5>
                      </div>
                      <div className="total">
                        <h6>
                          {props.langs === "ar"
                            ? "Final total"
                            : "المجموع النهائي"}
                        </h6>
                        <h5>{newtotal} SAR</h5>
                      </div>
                    </>
                  ) : (
                    <p className="errormodel">{error}</p>
                  )}
                  <form onClick={postData}>
                    {login && (
                      <span className="errormodel">
                        {props.langs === "ar"
                          ? "Please login"
                          : "الرجاء تسجيل الدخول"}
                      </span>
                    )}
                    <button className="baynow">
                      {props.langs === "ar" ? "Book Now" : "حجز الان"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="model">
              <div></div>
              <div className="finish">
                <div className="div1">
                  <div className="div2">
                    <div className="div-icon">
                      <FontAwesomeIcon icon={faCheck} className="icon" />
                    </div>
                  </div>
                </div>
                <h5>
                  {props.langs === "ar"
                    ? "Booking Successful"
                    : "`تم الحجز بنجاح"}
                </h5>
                <p>
                  {props.langs === "ar"
                    ? "You can confirm your booking by payment when the doctoraccepts the booking"
                    : "يمكنك تأكيد الحجز عن طريق الدفع عندما يقوم الطبيب بالقبول"}
                </p>
                <Link onClick={handDelete}>
                  {props.langs === "ar" ? "Finish" : "اغلاق"}
                </Link>
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

export default Doctorservicemodel;
