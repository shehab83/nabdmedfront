import {
  faLeftLong,
  faSearch,
  faSliders,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modeldoc from "../doctor/Modeldoc";

function Servicesdoctor(props) {
  
  let [show, setshow] = useState("");
  function notshow() {
    if (show) {
      setshow("");
    } else {
    }
  }
  let [selecTedDoctor, setselecTedDoctor] = useState(0);
  let [address, setAddress] = useState(" ");
  let [name,setname] =useState("");
  let [img , setimg] = useState("");
  let [rating,setrating] =useState(0);
  let [ratingcount,setratingcount] =useState(0);
  let { slug } = useParams();
  // console.log(slug);
  let [currentPage, setCurrentPage] = useState(1);
  let [doctors, setdoctors] = useState([]);
  let [totalItems, setTotalItems] = useState(0);
  let [search, setsearch] = useState("");

  useEffect(() => {
    fetch(
      `https://almutamayizun.videosep.com/api/doctors-servicse-pagination/${slug}?page=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setdoctors(data.data.records);
        setTotalItems(data.data[`pagination links`] || 0);
      });
  }, [currentPage]);

  // console.log(doctors);

  const handleNextPage = () => {
    if (currentPage < totalItems.total) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  let pages = [];

  for(let i=Math.max(1,currentPage-1);i<=Math.min(currentPage + 1,totalItems.total);i++){
    pages.push(i)
  }
  let i = 1;

  const filteredDoctors = search
    ? doctors.filter(
        (doctor) => doctor.name.toLowerCase().includes(search.toLowerCase())
        //  ||
        // doctor.name_ar.includes(search) // البحث بالعربية
      )
    : doctors; // عرض الكل إذا كانت قيمة البحث فارغة

  return (
    <div className="container">
      <div className={`doctor ${props.langs}`}>
        <Link to={"/services"}>
          <FontAwesomeIcon
            icon={faLeftLong}
            className={`back ${props.langs}`}
          />
          {props.langs === "ar" ? "Back" : "رجوع"}
        </Link>
        {props.langs === "en" ? <h5>الأطباء</h5> : <h5>Doctors</h5>}
        <div className="search-select">
          <div className="search">
            <FontAwesomeIcon icon={faSearch} className="icon1" />
            <input
              type="text"
              onChange={(e) => setsearch(e.target.value)}
              value={search}
              placeholder={
                props.langs === "ar"
                  ? "Search for Doctors"
                  : " البحث عن الأطباء"
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
          {doctors === undefined ? (
            <h6>{props.langs === "en" ? "لا يوجد اطباء" : "No doctors"}</h6>
          ) : (
            doctors.map((doctor) =>
              filteredDoctors.length > 0 ? (
                <div
                  key={doctor.id}
                  className="col-12 col-md-6 col-lg-4 doctor-itme "
                >
                  <div className="itme">
                    <div>
                      <img src={doctor.cover} alt="..." />
                    </div>
                    <div>
                      <h5>{doctor.name}</h5>
                      <p className="exp">{doctor.address}</p>
                      <span className="span"></span>
                      <div className="review">
                        <Link
                          onClick={() => {
                            setselecTedDoctor(doctor.id);
                            setshow("show");
                            setimg(doctor.cover);
                            setname(doctor.name);
                            setrating(doctor.average_rating);
                            setratingcount(doctor.ratings_count);
                            setAddress(doctor.address);
                          }}
                        >
                          <p className="review1">
                            <FontAwesomeIcon icon={faStar} className="icon" />{" "}
                            {doctor.average_rating}
                          </p>
                          <p className="review2">
                            ({doctor.ratings_count} {props.langs === "ar" ? "Ratings" : "التقييمات"})
                          </p>
                        </Link>
                      </div>
                      <Link to={`/doctor/${doctor.id}`} className="servicse">
                        {props.langs === "ar" ? "Servicse" : "خدمات"}
                      </Link>
                    </div>
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
                    onClick={() => setCurrentPage(page)}
                    className={page === currentPage ? "active" : ""}
                  >
                   {page}
                  </button>
                ))}
              </span>
              <button
                className="btn2"
                onClick={handleNextPage}
                disabled={currentPage === totalItems}
              >
                {props.langs === "ar" ? "Next" : "التالي"}
              </button>
            </div>
          )}
        </div>
        <Modeldoc
          id={selecTedDoctor}
          show={show}
          setShow={setshow}
          langs={props.langs}
          address={address}
          img={img}
          name={name}
          rating={rating}
          ratingcount={ratingcount}
        />
      </div>
    </div>
  );
}

export default Servicesdoctor;
