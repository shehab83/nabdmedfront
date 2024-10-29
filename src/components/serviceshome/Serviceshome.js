import React from "react";
import "./services.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faRightLong } from "@fortawesome/free-solid-svg-icons";
function Serviceshome(props) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container-lg p-1">
      <div className={`serviceshome ${props.langs}`}>
        <div className="title">
          {props.langs === "en" ? (
            <h2>
              اختر من <span>الخدمات</span>
            </h2>
          ) : (
            <h2>
              choose from <span>Services</span>
            </h2>
          )}
          <div>
            {props.langs === "en" ? (
              <Link>عرض الكل</Link>
            ) : (
              <Link>See All</Link>
            )}
          </div>
        </div>
        <Slider {...settings} className={props.langs}>
          <div className="servicediv ser">
            <div className={`service ${props.langs}`}>
              <div className="ser-atim">
                <div className={`img ${props.langs}`}>
                  <img src="/imges/Services1.png" width={"50px"} alt="..." />
                </div>

                {props.langs === "en" ? (
                  <h4>المشاورات الافتراضية</h4>
                ) : (
                  <h4>Virtual Consultations</h4>
                )}
                <Link to={"/blogpage"}>
                  {props.langs === "en" ? "استشارة كتاب" : "Book consultation"}
                  <FontAwesomeIcon icon={faRightLong} className="icon" />
                </Link>
              </div>
            </div>
          </div>
          <div className="servicediv ser">
            <div className={`service ${props.langs}`}>
              <div className="ser-atim">
                <div className={`img ${props.langs}`}>
                  <img src="/imges/Services2.png" width={"50px"} alt="..." />
                </div>
                {props.langs === "en" ? (
                  <h4>الرعاية المنزلية</h4>
                ) : (
                  <h4>Home Care</h4>
                )}
                <Link to={"/homecar"}>
                  {props.langs === "en" ? "احجز خدمة"  : "Book Service"}
                  <FontAwesomeIcon icon={faRightLong} className="icon" />
                </Link>
              </div>
            </div>
          </div>
          <div className="servicediv ser">
            <div className={`service ${props.langs}`}>
              <div className="ser-atim">
                <div className={`img ${props.langs}`}>
                  <img src="/imges/Services3.png" width={"50px"} alt="..." />
                </div>
                {props.langs === "en" ? (
                  <h4>زيارة الطبيب</h4>
                ) : (
                  <h4>Doctor Visit</h4>
                )}
                <Link to={"/doctor"}>
                 {props.langs === "en" ? "احجز زيارتك" : "Book Visit"}
                  <FontAwesomeIcon icon={faRightLong} className="icon" />
                </Link>
              </div>
            </div>
          </div>

          {/* <div>
          <ul className={`slick-dots ${props.langs}`}>
            <li class="slick-active">
              <button>1</button>
            </li>
            <li class="">
              <button>2</button>
            </li>
            <li class="">
              <button>3</button>
            </li>
          </ul>
          </div> */}
        </Slider>
      </div>
    </div>
  );
}

export default Serviceshome;
