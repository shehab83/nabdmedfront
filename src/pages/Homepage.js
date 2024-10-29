import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Hederhome from "../components/hederhome/Hederhome";
import Serviceshome from "../components/serviceshome/Serviceshome";
import About from "../components/abouthome/About";
import Articlehome from "../components/articlehome/Articlehome";
import Sectionhome from "../components/section/Sectionhome";
import Footer from "../components/footer/Footer";
import Loading from "../components/loading/Loading";

function Homepage() {
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
        <Loading />
      ) : (
        <>
          <Navbar lang={langs} langs={lang} />
          <Hederhome langs={lang} />
          <Serviceshome langs={lang} />
          <About langs={lang} />
          <Articlehome langs={lang} />
          <Sectionhome langs={lang} />
          <Footer langs={lang} />
        </>
      )}
    </>
  );
}

export default Homepage;
