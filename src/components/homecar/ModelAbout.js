import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./model.css";
import ModelForm from "./Model2";
function Model1About(props) {
  let [showFrom ,setshowFrom]=useState("")
  // function notshowFrom() {
  //   if (showFrom) {
  //     setshowFrom("")
  //   } else {
      
  //   }
  // }
  return (
    <div>
      {props.show === "show" ? (
        <div className="model">
          <div className={`modelAbout`}>
            <div className="div1">
              <div className="div-about">
                <div className="img">
                  <img src="/imges/homecar.png" alt="..." />
                </div>
                <div>
                  <h5>Care of patients with urinary catheters</h5>
                  <span></span>
                  <div className="review">
                    <p className="review1">
                      <FontAwesomeIcon icon={faStar} className="icon" /> 4.7
                    </p>
                    <p className="review2">(332 reviews)</p>
                  </div>
                </div>
              </div>
              <div className="div2">
                <h6>400 SAR</h6>
                <Link onClick={()=>{setshowFrom("showFrom")}} >Book</Link>
              </div>
            </div>
            <div className="div3">
              <h6>About</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur. Elit nulla maecenas
                rhoncus sed pellentesque sit. Consectetur auctor orci aliquam at
                mauris mi neque tortor. Sed vel nisi eu pulvinar massa sit cras
                lectus. Leo tincidunt sed cras egestas. Erat ac felis mattis
                aliquam. Pulvinar tortor cursus semper risus. A ultricies et sed
                est venenatis facilisi turpis. Consectetur molestie porttitor
                adipiscing ipsum aliquet pretium viverra euismod. Proin a cum
                quis non.
              </p>
            </div>
            <div className="div3">
              <h6>Service included</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur. Elit nulla maecenas
                rhoncus sed pellentesque sit. Consectetur auctor orci aliquam at
                mauris mi neque tortor. Sed vel nisi eu pulvinar massa sit cras
                lectus. Leo tincidunt sed cras egestas. Erat ac felis mattis
                aliquam. Pulvinar tortor
              </p>
            </div>
            <div className="div4">
              <div>
                <img src="/imges/info-circle.png" alt="..." />
              </div>
              <div>
                <h6>Instructions</h6>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Neque luctus erat id
                  egestas sapien. Aliquam faucibus leo porttitor ut. Facilisi
                  quis vestibulum aliquet dictum justo. Et fermentum eros massa
                  ultricies sed quisque adipiscing. Venenatis duis etiam.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Model1About;
