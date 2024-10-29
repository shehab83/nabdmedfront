import React, { useEffect, useState } from "react";
import "./Appointments.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

function Appointments(props) {
  let [appointments, setappointments] = useState([]);
  let token = window.localStorage.getItem("token");

  async function dataUser() {
    if (!token) {
      return;
    }
    try {
      let res = await fetch(
        "https://almutamayizun.videosep.com/api/user-ger-order",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await res.json();
      // console.log(data);
      setappointments(data.data);
    } catch (err) {
      // console.log(err);
    }
  }

  useEffect(() => {
    dataUser();
  }, []);

  let [open, setOpen] = useState(null);
  let toggle = (id) => {
    if (open === id) {
      setOpen(null);
    } else {
      setOpen(id);
    }
  };

  return (
    <div className="container-lg">
      <div className={`appointments ${props.langs}`}>
        <Link to="/">
          <FontAwesomeIcon
            icon={faLeftLong}
            className={`back ${props.langs}`}
          />{" "}
          {props.langs === "en" ? "رجوع" : "Back"}
        </Link>
        {props.langs === "en" ? <h5>المواعيد</h5> : <h5>Appointments</h5>}
        {appointments.length > 0 ? (
          <>
            {appointments.map((item) => (
              <div key={item.ref_id} className="accordion">
                <div className="accordion-item">
                  <p
                    className="accordion-header"
                    id={`heading-${item.ref_id}`}
                  >
                    <button
                      className={`accordion-button ${
                        open === item.ref_id ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => toggle(item.ref_id)}
                      aria-expanded={open === item.ref_id}
                      aria-controls={`collapse-${item.ref_id}`}
                    >
                      <span className="span1">{props.langs === "ar" ? "Order" : "طلب"}</span> <span className="span2">{`( ${item.ref_id} ) `}</span>
                    </button>
                  </p>
                  <div
                    id={`collapse-${item.ref_id}`}
                    className={`accordion-collapse collapse ${
                      open === item.ref_id ? "show" : ""
                    }`}
                    aria-labelledby={`heading-${item.ref_id}`}
                  >
                    <div className="accordion-body">
                      <table>
                        <thead>
                          <tr>
                            <th>
                              {props.langs === "ar"
                                ? "order number"
                                : "رقم الطلب"}
                            </th>
                            <td>{item.ref_id}</td>
                            <th>{props.langs === "en" ? "اسم" : "Name"}</th>
                            <td>{item.Relatives}</td>
                          </tr>
                          <tr>
                            <th>
                              {props.langs === "ar"
                                ? "service name"
                                : "اسم الخدمة"}
                            </th>
                            <td>{item.name_en_service}</td>
                            <th>
                              {props.langs === "ar"
                                ? "doctor Name"
                                : "اسم الطبيب"}
                            </th>
                            <td>{item.doctor}</td>
                          </tr>
                          <tr>
                            <th>
                              {props.langs === "ar" ? " date" : " التاريخ"}
                            </th>
                            <td>{item.date}</td>
                            <th>{props.langs === "ar" ? "status" : "حالة"}</th>
                            <td>
                              <button
                                dangerouslySetInnerHTML={{
                                  __html: item.status_with_label,
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>{props.langs === "ar" ? "subtotal" : "المجموع الفرعي"}</th>
                            <td>{item.subtotal} SAR</td>
                            <th>{props.langs === "ar" ? "discount code" : "كود الخصم"}</th>
                            <td>{item.discount_code}</td>
                          </tr>
                          <tr>
                            <th>{props.langs === "ar" ? "discount" : "الخصم"}</th>
                            <td>{item.discount}</td>
                            <th>{props.langs === "ar" ? "total" : "المجموع"}</th>
                            <td>{item.total} SAR</td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h6>{props.langs === "en" ? "لا توجد مواعيد" : "No Appointments"}</h6>
        )}
      </div>
    </div>
  );
}

export default Appointments;
