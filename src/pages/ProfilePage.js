import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Profile from "../components/profile/Profile";
import Footer from "../components/footer/Footer";
import Loading from "../components/loading/Loading";

function ProfilePage() {
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
          <Profile langs={lang} />
          <Footer langs={lang} />
        </>
      )}
    </>
  );
}

export default ProfilePage;
