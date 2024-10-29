import React, { useEffect, useState } from "react";
import "./homecar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeftLong,
  faSearch,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ModelForm from "./Model2";
function HomeCar(props) {
  let [show, setshow] = useState("");
  function notshow() {
    if (show) {
      setshow("");
    } else {
    }
  }
  let [average_rating, setaverage_rating] = useState(0);
  let [ratings_count, setratings_count] = useState(0);
  let [selecTedService, setselecTedService] = useState(0);
  let [currentPage, setCurrentPage] = useState(1);
  let [services, setservices] = useState([]);
  let [totalItems, setTotalItems] = useState(0);
  let [search, setsearch] = useState("");

  useEffect(() => {
    fetch(
      `https://almutamayizun.videosep.com/api/services-without-doctor?page=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setservices(data.data.records || data.data);
        setTotalItems(data.data[`pagination links`] || 0);
      });
  }, [currentPage]);

  // console.log(services);

  const handleNextPage = () => {
    if (currentPage < totalItems.total) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  let pages = [];

  for(let i=Math.max(1,currentPage-1);i<=Math.min( currentPage + 1,totalItems.total);i++){
    pages.push(i)
  }
  let i = 1;

  const filteredDoctors = search
    ? services.filter(
        (service) => service.name.toLowerCase().includes(search.toLowerCase())
        //  ||
        // doctor.name_ar.includes(search) // البحث بالعربية
      )
    : services; // عرض الكل إذا كانت قيمة البحث فارغة

  return (
    // onClick={notshow}
    <div className="container">
      <div className={`homecar ${props.langs}`}>
        <Link to={"/"}>
          <FontAwesomeIcon
            icon={faLeftLong}
            className={`back ${props.langs}`}
          />{" "}
          {props.langs === "en" ? "رجوع" : "Back"}
        </Link>

        {props.langs === "en" ? <h5>الرعاية المنزلية</h5> : <h5>Home Care</h5>}
        <div className="search-select">
          <div className="search">
            <FontAwesomeIcon icon={faSearch} className="icon1" />
            <input
              onChange={(e) => setsearch(e.target.value)}
              type="text"
              placeholder={
                props.langs === "ar"
                  ? "Search for Specialties"
                  : "البحث في التخصصات"
              }
            />
            <FontAwesomeIcon icon={faSliders} className="icon2" />
          </div>
          {/* <div className="selets">
            <select className="selec1">
              <option value={"Rating"}>Rating</option>
            </select>
            <select className="selec1">
              <option value={"Gender"}>Gender</option>
            </select>
          </div> */}
        </div>
        <div className="row">
          {services === undefined ? (
            <h6>{props.langs === "en" ? "لا يوجد اطباء" : " doctors"}</h6>
          ) : (
            services.map((service) =>
              filteredDoctors.length > 0 ? (
                <div
                  key={service.id}
                  className="col-12 col-sm-6 col-lg-3 homecar-itmes"
                  onClick={() => {
                    setshow("show");
                    setselecTedService(service.id);
                    setaverage_rating(service.average_rating);
                    setratings_count(service.ratings_count);
                  }}
                >
                  <div className="homecar-itme">
                    <div className="img">
                      <img width={"100%"} src={service.cover} alt="..." />
                    </div>
                    <h5>{service.name}</h5>
                    <h6>{service.price} SAR</h6>
                  </div>
                </div>
              ) : (
                <h6>{props.langs === "en" ? "لا يوجد اطباء" : "No doctors"}</h6>
              )
            )
          )}
          {totalItems.total > 1 && (
            <div className="pagination-buttons">
              <button
                className="btn1"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                {props.langs === "ar" ? "Previous" : "السابق"}
              </button>
              <span>
                {/* page {currentPage} of {totalItems} */}
                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() =>{ setCurrentPage(page)
                      window.scrollTo(0, 0);
                    }}
                    className={currentPage === page ? "active" : ""}
                  >
                    {page}
                  </button>
                ))}
              </span>
              <button
                className="btn2"
                onClick={handleNextPage}
                // disabled={currentPage === totalItems.total}
              >
                {props.langs === "ar" ? "Next" : "التالي"}
              </button>
            </div>
          )}
        </div>
        <ModelForm
          langs={props.langs}
          show={show}
          setShow={setshow}
          id={selecTedService}
          average_rating ={average_rating}
          ratings_count={ratings_count}
          // service_id
        />
      </div>
    </div>
  );
}

export default HomeCar;
