import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeftLong,
  faSearch,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import Doctorservicemodel from "./Doctorservicemodel";

import "../homecar/homecar.css";
function Doctorservice(prpos) {
  let [selecTedDoctor, setselecTedDoctor] = useState(0);
  let [items, setItems] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [totalItems, setTotalItems] = useState(0);
  let [doctorid, setdoctorid] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://almutamayizun.videosep.com/api/doctors-services/${id}`
      );
      const data = await response.json();
      // console.log(data);
      if (data.data[`pagination links`] > 1) {
        // إذا كان هناك أكثر من خدمة
        const paginatedResponse = await fetch(
          `https://almutamayizun.videosep.com/api/doctors-services/${id}?page=${currentPage}`
        );
        const paginatedData = await paginatedResponse.json();
        setdoctorid(paginatedData.data.data.records);
        setTotalItems(paginatedData.data[`pagination links`].total); // تأكد من تحديث العدد بشكل صحيح
        // setdoctorid(paginatedData.data.records);
      } else {
        // إذا كانت خدمة واحدة
        setdoctorid(data.data);
        setTotalItems(1); // خدمة واحدة
      }
    };

    fetchData();
  }, [id, currentPage]);

  let [search, setsearch] = useState("");
  const filteredServices = search
    ? doctorid.filter(
        (servic) => servic.name.toLowerCase().includes(search.toLowerCase())
        ||
        servic.name_ar.includes(search) // البحث بالعربية
      )
    : doctorid; // عرض الكل إذا كانت قيمة البحث فارغة

  // console.log(doctorid);
  const handleNextPage = () => {
    if (currentPage < totalItems) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  let pages = [];
  for (let i = 1; i <= totalItems; i++) {
    pages.push(i);
  }

  let [show, setshow] = useState("");

  return (
    <div className="container">
      <div className={`homecar ${prpos.langs} `}>
        <Link to="/doctor">
          <FontAwesomeIcon
            icon={faLeftLong}
            className={`back ${prpos.langs} `}
          />
          {prpos.langs === "en" ? "رجوع" : "Back"}
        </Link>
        <h5>{prpos.langs === "en" ? "خدمات الدكتور" : "Doctor Services"}</h5>
        <div className="search-select">
          <div className="search">
            <FontAwesomeIcon icon={faSearch} className="icon1" />
            <input
              onChange={(e) => setsearch(e.target.value)}
              type="text"
              placeholder={
                prpos.langs === "ar"
                  ? "Search for Services"
                  : "البحث في الخدمات"
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
          {filteredServices.length > 0 ? (
            filteredServices.map((item) => (
              <div
                key={item.id}
                className="col-12 col-sm-6 col-lg-3 homecar-itmes"
                onClick={() => {
                  setshow("show");
                  setselecTedDoctor(item.id);
                }}
              >
                <div className="homecar-itme">
                  <div className="img">
                    <img width={"100%"} src={item.cover} alt="..." />
                  </div>
                  {prpos.langs === "en" ? (
                    <h5>{item.name_ar}</h5>
                  ) : (
                    <h5>{item.name}</h5>
                  )}
                  <h6>{item.price} SAR</h6>
                </div>
              </div>
            ))
          ) : (
            <>{prpos.langs === "en" ? "لا يوجد خدمات" : "No Services"}</>
          )}
          {totalItems > 1 && (
            <div className="pagination-buttons">
              <button
                className="btn1"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                {prpos.langs === "en" ? "Previous" : "السابق"}
              </button>
              <span>
                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "active" : ""}
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
               {prpos.langs === "en" ? "Next" : "التالي"}
              </button>
            </div>
          )}
        </div>
        <Doctorservicemodel 
        langs={prpos.langs} 
        id={selecTedDoctor} 
        show={show} 
        setShow={setshow} 
        id_doctor={id}
        />
      </div>
    </div>
  );
}

export default Doctorservice;
