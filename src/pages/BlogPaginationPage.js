import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import BlogPanintion from "../components/articlehome/BlogPanintion";
import Loading from "../components/loading/Loading";

function BlogPaginationPage() {
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
          <BlogPanintion langs={lang} />
          <Footer langs={lang} />
        </>
      )}
    </>
  );
}

export default BlogPaginationPage;
