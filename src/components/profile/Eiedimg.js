import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./profile.css";
import axios from "axios";

function Eiedimg(props) {
  let handDelete = () => {
    props.setShow("");
  };
  let [img, setimg] = useState(null);
  let [success, setSuccess] = useState(false);
  let [error, setError] = useState(null);
  let token = localStorage.getItem("token");

  async function formSubmit(e) {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("user_image", img);

      let res = await axios.post(
        "https://almutamayizun.videosep.com/api/update-image-user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200 || res.status === 201) {
        props.setShow("");
        window.location.reload();
        // Navigate(`/profile`);
        setSuccess(true);
        setError(null);
      } else {
        setSuccess(false);
        setError("Failed to update image");
      }
    } catch (error) {
      setSuccess(false);
      setError(error.message);
      // console.log(error.message);
    }
  }

  return (
    <div className="editimg">
      {props.show === "show" ? (
        <div className="model">
          <form onSubmit={formSubmit}>
            <div className="mb-2 d-flex justify-content-between ">
              <h5 className="mb-4">
                {props.langs === "en" ? "تعديل صورة" : "Edit Photo"}
              </h5>
              <p onClick={handDelete}>
                <FontAwesomeIcon icon={faDeleteLeft} className="icon-delete" />
              </p>
            </div>
            <input
              style={{ width: "100%" }}
              onChange={(e) => setimg(e.target.files[0])}
              type="file"
              placeholder="Edit Photo"
              required
            />
            <button type="submit">
              {props.langs === "en" ? "تعديل" : "Edit"}
            </button>
            {success && (
              <span className="successmodel">
                {props.langs === "en"
                  ? "تم التعديل بنجاح"
                  : "Updated Successfully"}
              </span>
            )}
            {error && (
              <span className="errormodel">
                {props.langs === "en" ? "حدث خطأ: " + error : "Error: " + error}
              </span>
            )}
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default Eiedimg;
