import React, { useEffect, useState } from "react";
import "./articlehome.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
function Articlehome(prpos) {
  let [blogger, setBlogger] = useState([]);
  useEffect(() => {
    fetch("https://almutamayizun.videosep.com/api/blogger")
      .then((res) => res.json())
      .then((data) => setBlogger(data.data));
  }, []);

  // console.log(blogger);

  let bloggershow = blogger.map((itme) => {
    return (
      <div className={`servicediv ${prpos.langs}`}  key={itme.slug}>
        <div className="service">
          <div className="ser-atim">
            <img src={itme.cover} alt="..." />
            <div className="pra">
              <p className="p1">{prpos.langs === "ar" ? "Diet Tips" : "نصائح النظام الغذائي"}</p>
              <p className="p2">{itme.created_at2}</p>
            </div>
            {
              prpos.langs === "ar" ? (
                <h4>{itme.name}</h4>
              ):(
                <h4>{itme.name_ar}</h4>
              )
            }
            {prpos.langs === "ar" ? (
              <p>{itme.title.substring(0, 70)}...</p>
            ):(
              <p>{itme.title_ar.substring(0, 70)}...</p>
            )}
            <Link  to={`/blogpage/${itme.slug}`}  className={prpos.langs}>
              {prpos.langs === "en" ? "عرض المزيد":"Learn More"} <FontAwesomeIcon icon={faRightLong} className="icon" />
            </Link>
          </div>
        </div>
      </div>
    );
  });
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    // autoplay: true,
    autoplaySpeed: 2000,
    // pausehOnHover: true,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container-lg">
      <div className={`articlehome ${prpos.langs}`}>
        <div className="title">
          {prpos.langs === "ar" ? (
            <h2>
              Expert <span>Health</span> Articles and Updates
            </h2>
          ) : (
            <h2>
              خبير <span>صحة</span> المقالات والتحديثات
            </h2>
          )}
          <div>
            <Link to={"/blogpage"}>{prpos.langs === "en" ? "عرض الكل" : "See All"}</Link>
          </div>
        </div>
        <Slider {...settings}>
          {bloggershow}
        </Slider>
      </div>
    </div>
  );
}

export default Articlehome;
