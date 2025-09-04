import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import ContactUs from "./pages/Contact Us/ContactUs";
import Blog from "./pages/Blog/Blog";
import Footer from "./components/Footer/Footer";
import ButtonsForSigning from "./pages/Signing/ButtonsForSigning/ButtonsForSigning";
import SigninPage from "./pages/Signing/SignIn/SignInPage";
import SignUpPage from "./pages/Signing/SignUp/SignUpPage";
import PatientDashboard from "./dashboard/Patient/PatientDashboard";
import Dashboard from "./dashboard/Doctor/Dashboard";
import MedicineShop from "./pages/MedicineShop/MedicineShop";
import DashboardLayout from "./dashboard/Management/DashboardLayout";
import DoctorsTable from "./dashboard/Management/DoctorsTable";
import PatientsTable from "./dashboard/Management/PatientsTable";
import DailyAppointments from "./dashboard/Management/DailyAppointments";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import AllServices from "./pages/AllServices/AllServices";
import Urology from "./pages/services/Urology";
import Neurology from "./pages/services/Neurology";
import EyeCare from "./pages/services/EyeCare";
import Cardiology from "./pages/services/Cardiology";
import Dentistry from "./pages/services/Dentistry";
import Dermatology from "./pages/services/Dermatology";
import AllergyImmunology from "./pages/services/AllergyImmunology";
import GeneralMedicine from "./pages/services/GeneralMedicine";
import Oncology from "./pages/services/Oncology";
import Orthopedics from "./pages/services/Orthopedics";
import Pathology from "./pages/services/Pathology";
import Pediatrics from "./pages/services/Pediatrics";
import Pharmacy from "./pages/services/Pharmacy";
import Pulmonology from "./pages/services/Pulmonology";
import Blog1 from "./pages/Blog/Blog1";
import Blog2 from "./pages/Blog/blog2";
import Blog3 from "./pages/Blog/blog3";
import Blog4 from "./pages/Blog/blog4";
import Blog5 from "./pages/Blog/blog5";
import Blog6 from "./pages/Blog/blog6";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { CartProvider } from "./context/CartContext.jsx";
import BlogForm from "./components/BlogForm/BlogForm.jsx";
import ForgotPassword from "./pages/Signing/ForgotPassword/ForgotPassword.jsx";
import PatientInformationPage from "./dashboard/Patient/PatientInformationPage.jsx";

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/aboutUspage" element={<AboutUsPage />} />
          <Route path="/allServices" element={<AllServices />} />
          {/* <Route path="/book-appointment" element={<ButtonsForSigning />} /> */}
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<PatientDashboard />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/doctor-dashboard" element={<Dashboard />} />
          <Route path="/medicine-store" element={<MedicineShop />} />
          <Route path="/management-dashboard" element={<DashboardLayout />} />
          <Route path="/management/doctors" element={<DoctorsTable />} />
          <Route path="/management/patients" element={<PatientsTable />} />
           <Route path="/patient-info" element={<PatientInformationPage />} />
          <Route
            path="/daily-appointments/:date"
            element={<DailyAppointments />}
          />
          <Route path="/services/urology" element={<Urology />} />
          <Route path="/services/neurology" element={<Neurology />} />
          <Route path="/services/eye-care" element={<EyeCare />} />
          <Route path="/services/cardiology" element={<Cardiology />} />
          <Route path="/services/dentistry" element={<Dentistry />} />
          <Route path="/services/dermatology" element={<Dermatology />} />
          <Route
            path="/services/allergy-immunology"
            element={<AllergyImmunology />}
          />
          <Route
            path="/services/general-medicine"
            element={<GeneralMedicine />}
          />
          <Route path="/services/oncology" element={<Oncology />} />
          <Route path="/services/orthopedics" element={<Orthopedics />} />
          <Route path="/services/pathology" element={<Pathology />} />
          <Route path="/services/pediatrics" element={<Pediatrics />} />
          <Route path="/services/pharmacy" element={<Pharmacy />} />
          <Route path="/services/pulmonalogy" element={<Pulmonology />} />
          <Route path="/blog/blog1" element={<Blog1 />} />
          <Route path="/blog/blog2" element={<Blog2 />} />
          <Route path="/blog/blog3" element={<Blog3 />} />
          <Route path="/blog/blog4" element={<Blog4 />} />
          <Route path="/blog/blog5" element={<Blog5 />} />
          <Route path="/blog/blog6" element={<Blog6 />} />
          <Route path="/blog/new" element={<BlogForm />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
        </Routes>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;