import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SericesPage from "./pages/SericesPage";
import DoctorPage from "./pages/DoctorPage";
import HomeCarPage from "./components/specialtiesanddoctors/HomeCarPage";
import Model1About from "./components/homecar/ModelAbout";
import ModelForm from "./components/homecar/Model2";
import AboutPage from "./pages/AboutPage";
import Profile1 from "./components/profile/Profile1";
import BlogPaginationPage from "./pages/BlogPaginationPage";
import BlogonePage from "./pages/BlogonePage";
import Eideprofile from "./components/profile/Eideprofile";
import ProfilePage from "./pages/ProfilePage";
import DoctorsericePage from "./pages/DoctorsericePage";
import ProtectedRoute from "./components/loginandsignup/ProtectedRoute";
import Editprofileuser from "./components/profile/Editprofileuser";
import Servicesdoctorpage from "./pages/Servicesdoctorpage";
import AppointmentsPage from "./pages/AppointmentsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/services" element={<SericesPage />} />
        {/* <Route path="/doctor/:id" element={<DoctorsericePage />} /> */}
        <Route
          path="/Servicesdoctorpage/:slug"
          element={<Servicesdoctorpage />}
        />
        <Route element={<ProtectedRoute auth={localStorage.getItem("user")} />}>
          <Route path="/profile" element={<ProfilePage />}>
            <Route path="" element={<Profile1 />} />
            <Route path="patient" element={<Profile1 />} />
            <Route path="addpatient" element={<Eideprofile />} />
            <Route path="Editprofile" element={<Editprofileuser />} />
          </Route>
            <Route path="/appointments" element={<AppointmentsPage />} />
        </Route>
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/doctor/:id" element={<DoctorsericePage />} />
        <Route path="/homecar" element={<HomeCarPage />} />
        <Route path="/homecar/about" element={<Model1About />} />
        <Route path="/homecar/about/modelform" element={<ModelForm />} />
        <Route path="/blogpage" element={<BlogPaginationPage />} />
        <Route path="/blogpage/:bolgslug" element={<BlogonePage />} />
      </Routes>
    </div>
  );
}

export default App;
