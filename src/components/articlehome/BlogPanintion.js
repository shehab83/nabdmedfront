import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./blog.css";

function BlogPanintion(props) {
  let [items, setItems] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetch(
      `https://almutamayizun.videosep.com/api/blogger-pagination?page=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data.records);
        setTotalItems(data.data[`pagination links`].total);
        // console.log(data.data.length);
      });
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalItems) {
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

  // for (let i = 1; i <= totalItems; i++) {
    // pages.push(i);
  // }
  let i = 1;

  for(let i=Math.max(1,currentPage-1);i<=Math.min(totalItems,currentPage+1);i++){
    pages.push(i)
  }

  return (
    <div className="container">
      <div className={`panintion ${props.langs}`}>
        <Link to={"/"}>
          <FontAwesomeIcon icon={faLeftLong} className={`back ${props.langs}`} /> {props.langs === "en" ? "رجوع" : "Back"}
        </Link>
        {props.langs === "en" ? <h5>مقالات</h5> : <h5>Articles</h5>}
        <div className="row">
          {items.map((item) => {
            return (
              <div key={item.slug} className="col-12 col-md-6 col-lg-4">
                <div className="servicediv">
                  <div className="service">
                    <div className="ser-atim">
                      <img width={"100%"} src={item.cover} alt="..." />
                      <div className="pra">
                        <p className="p1">
                          {props.langs === "ar"
                            ? "Diet Tips"
                            : "نصائح النظام الغذائي"}
                        </p>
                        <p className="p2">{item.created_at2}</p>
                      </div>
                      {props.langs === "ar" ? (
                        <h4>{item.name}</h4>
                      ) : (
                        <h4>{item.name_ar}</h4>
                      )}
                      {props.langs === "ar" ? (
                        <p>{item.title.substring(0, 70)}...</p>
                      ) : (
                        <p>{item.title_ar.substring(0, 70)}...</p>
                      )}
                      <Link
                        to={`/blogpage/${item.slug}`}
                        className={props.langs}
                      >
                        {props.langs === "en" ? "عرض المزيد" : "Learn More"}{" "}
                        <FontAwesomeIcon icon={faRightLong} className="icon" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {totalItems > 1 && (
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
                      window.scrollTo(0, 0)
                    }}
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
    </div>
  );
}

export default BlogPanintion;
