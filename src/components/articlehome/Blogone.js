import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "./blogone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faPlay } from "@fortawesome/free-solid-svg-icons";

function Blogone(props) {
  let [bolgsulg, setblogsulg] = useState({});
  let [images, setImages] = useState([]);
  let { bolgslug } = useParams();

  useEffect(() => {
    fetch(`https://almutamayizun.videosep.com/api/blogger-Show/${bolgslug}`)
      .then((res) => res.json())
      .then((data) => {
        setblogsulg(data.data[0]);
        setImages(data.data[0].cover);
      });
  }, [bolgslug]);

  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let [show, setshow] = useState("");
  function notshow() {
    if (show) {
      setshow("");
    } else {
    }
  }
  return (
    <div className={`blogone ${props.langs}`}>
      <div className="container">
      <Link className="backblog" to={"/blogpage"}>
          <FontAwesomeIcon icon={faLeftLong} className={`back ${props.langs}`} /> {props.langs === "en" ? "رجوع" : "Back"}
        </Link>
        {props.langs === "en" ? <h5 style={{marginBottom:"20px"}}>تفاصيل المقاله</h5> : <h5 style={{marginBottom:"20px"}}>Article details</h5>}
        <div className="row">
          <div className="col-12 col-md-6 ">
            <div className="slider-container">
              <div
                style={{ position: "relative" }}
                className="text-align-center position-relative"
              >
                {images.length > 1 ? (
                  <Slider {...settings}>
                    {images.map((image, index) => (
                      <div key={index}>
                        <img
                          width={"100%"}
                          src={image.file_name}
                          alt={`Slide ${index}`}
                        />
                        <span className="play">
                          <Link
                            onClick={() => {
                              setshow("show");
                            }}
                            className=""
                          >
                            <FontAwesomeIcon icon={faPlay} />
                          </Link>
                        </span>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  images.length === 1 && (
                    <div>
                      <img
                        width={"100%"}
                        src={images[0].file_name}
                        alt="Single Image"
                      />
                      <span className="play-img">
                        <Link
                          onClick={() => {
                            setshow("show");
                          }}
                        >
                          <FontAwesomeIcon icon={faPlay} />
                        </Link>
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 cont">
            {props.langs === "en" ? (
              <p>{bolgsulg.created_at2}</p>
            ) : (
              <p>{bolgsulg.created_at2}</p>
            )}

            {props.langs === "en" ? (
              <h2>{bolgsulg.name_ar}</h2>
            ) : (
              <h2>{bolgsulg.name}</h2>
            )}

            {props.langs === "en" ? (
              <h6>{bolgsulg.title_ar}</h6>
            ) : (
              <h4>{bolgsulg.title}</h4>
            )}

            {props.langs === "en" ? (
              <h6>{bolgsulg.description_ar}</h6>
            ) : (
              <p>{bolgsulg.description}</p>
            )}
          </div>
        </div>
        {show === "show" ? (
          <div className="model" onClick={notshow}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Pa89SlaVOlM?si=zQ2noxhNJe9NL7Ie"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            {/* {bolgsulg.video} */}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Blogone;
