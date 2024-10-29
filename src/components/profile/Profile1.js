import React, { useEffect, useState } from "react";
import "./profile.css";
import { Link, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../loading/Loading";

function Profile1(props) {
  let [loading, setloading] = useState(true);

  let context = useOutletContext();
  let lang = localStorage.getItem("lang");
  let [datashow, setdatashow] = useState([]);
  let token = window.localStorage.getItem("token");
  // console.log(token);

  async function dataUser() {
    if (!token) {
      console.log("No token found");
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
      // console.log(data.data);
      setdatashow(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  let deleteProduct = (itme) => {
    const token = window.localStorage.getItem("token");
    Swal.fire({
      title: `Are You Sure To Delete ${itme.Name} ?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://almutamayizun.videosep.com/api/delete-user-relatives/${itme.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }

        )
          .then((res) => {
            if (!res.ok) {
              // window.location.reload();
              throw new Error("Network response was not ok");
            }
            return res.json();
          })
          .then((data) => dataUser())
          .catch((error) => {
            if (error.message === "Network response was not ok") {
              alert("Network Error");
            } else {
              console.log(error);
            }
          });
      }
    });
  };

  useEffect(() => {
    dataUser();
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);

  let show = datashow.map((itme) => {
    return (
      <div key={itme.id} className="col-12 col-md-6">
        <div className="profile-info">
          <div className="info">
            <div>
              <img width={"50px"} src={itme.relative} alt="..." />
            </div>
            <div>
              <h5>{itme.Name}</h5>
              <div className="info-info">
                <p>
                  <img src="/imges/user-square.png" alt="..." />
                  <span>{itme.age}</span>
                </p>
                <p>
                  <img src="/imges/man.png" alt="..." />
                  <span>{itme.gender === "1" ? "man" : "woman"}</span>
                </p>
              </div>
            </div>
          </div>
          <button onClick={() => deleteProduct(itme)} className="eide">
            {lang === "en" ? "حذف" : "Delete"}
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="profile1">
      <div className="container">
        <div className="add">
          <Link className="linkeide" to={"/profile/addpatient"}>
            {lang === "en" ? " إضافة مريض" : "Add patient"}
          </Link>
        </div>
        <div className="row">
          {loading ? (
            <Loading />
          ) : (
            <>
              {datashow.length > 0
                ? show
                : lang === "ar"
                ? "There is no patient"
                : "لا يوجد مرض"}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile1;
