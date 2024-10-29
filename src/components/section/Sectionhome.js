import React from "react";
import "./sectionhome.css";
import { Link } from "react-router-dom";
function Sectionhome(props) {
  return (
    <div style={{ padding: 0 }}>
      <div className="sectionhome">
        {props.langs === "ar" ? (
          <h4>
            Start Your Health <br />
            Journey Here
          </h4>
        ) : (
          <h4>
            ابدأ صحتك
            <br />
            رحلة هنا
          </h4>
        )}
        <div className="links">
          <div>
            <Link className="link1">{props.langs === "en" ? "احجز الاستشارة الآن":"Book Consultation Now"} </Link>
          </div>
          <div>
            <Link className="link2">{props.langs === "en" ? "عرض المزيد":"Learn More"} </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sectionhome;
