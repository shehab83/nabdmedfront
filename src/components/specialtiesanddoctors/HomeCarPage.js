import React, { useEffect, useState } from "react";
import HomeCar from "../homecar/HomeCar";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Loading from "../loading/Loading";

function HomeCarPage() {
  let [lang, setlang] = useState("en");
  let [loading, setloading] = useState(true);

  function langs() {
    if (lang === "en") {
      setlang("ar");
      localStorage.setItem("lang", "ar");
    } else {
      setlang("en");
      localStorage.setItem("lang", "en");
    }
  }
  useEffect(() => {
    setlang(localStorage.getItem("lang"));
    window.scroll(0, 0);
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Navbar lang={langs} langs={lang} />
          <HomeCar langs={lang} />
          <Footer langs={lang} />
        </>
      )}
    </>
  );
}

export default HomeCarPage;
