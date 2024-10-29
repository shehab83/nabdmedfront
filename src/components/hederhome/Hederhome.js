import React, { useEffect, useState } from "react";
import "./hederhome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Hederhome(propps) {
  let [heder, setheder] = useState([]);
  useEffect(() => {
    fetch("https://almutamayizun.videosep.com/api/main-background")
      .then((res) => res.json())
      .then((date) => setheder(date.data[0]));
  }, []);

  return (
    <div className="container-lg p-0">
      <div className={`hederhome ${propps.langs}`}>
        <div className="row">
          <div className="col-12 col-md-6 cont">
            <div className="contant">
              <div className="first-div">
                <FontAwesomeIcon icon={faStar} className="icon" />
                <p>
                  {propps.langs === "ar"
                    ? "Rated #1 choice for healthcare appointments by users"
                    : "تم تصنيفه كخيار رقم 1 لمواعيد الرعاية الصحية من قبل المستخدمين"}
                </p>
              </div>
              {propps.langs === "ar" ? (
                <h1 dangerouslySetInnerHTML={{ __html: heder.name }} />
              ) : (
                <h1 dangerouslySetInnerHTML={{ __html: heder.name_ar }} />
              )}
              {propps.langs === "ar" ? (
                <p dangerouslySetInnerHTML={{ __html: heder.description }} />
              ) : (
                <p dangerouslySetInnerHTML={{ __html: heder.description_ar }} />
              )}
              <div className="links">
                <div>
                  <Link className="link1">
                    {propps.langs === "ar"
                      ? "Book Consultation"
                      : "استشارة حول كتاب"}
                  </Link>
                </div>
                <div>
                  <Link className={`link2 ${propps.langs}`}>
                    {propps.langs === "ar" ? "Learn More" : "عرض المزيد"}
                    <FontAwesomeIcon icon={faRightLong} className="icon" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              className={propps.langs}
              width={"100%"}
              src={heder.cover}
              alt="..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hederhome;
