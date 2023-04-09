// Imports from general folder
import Home from "./general/Home/Home";
import Login from "./general/Login/Login";
import News from "./general/News/News";
import NewsDetails from "../pages/general/News/NewsDetails/NewsDetails";
import NotFound from "./general/NotFound/NotFound";
import RegisterModal from "./general/RegisterModal/RegisterModal";
import TrainingOpportunities from "./general/TrainingOpportunities/TrainingOpportunities";
import TrainingOpportunity from "./general/TrainingOpportunity/TrainingOpportunity";
import VerifyAccount from "./general/VerifyAccount/VerifyAccount";

// Imports from institution folder
import InstSignup from "./institution/InstSignup/InstSignup";
import InstProfile from "./institution/InstProfile/InstProfile";
import InstPosts from "../pages/institution/InstApplications/InstPosts";
import InstPostDetails from "../pages/institution/InstPostDetails/InstPostDetails";
import InstPostForm from "./institution/instPostForm/InstPostForm";

// Imports from student folder
import Applications from "./student/Applications/Application";
import StudentProfile from "./student/StudentProfile/StudentProfile";
import StudentSignup from "./student/StudentSignup/StudentSignup";

//Imports from admin folder
import AdminLayout from "../layouts/AdminLayout";
import AdminHomePage from "../pages/Admin/HomePage/Home";
import AdminProfile from "./Admin/AdminProfile/AdminProfile";

//Export all pages
export {
  Home,
  Login,
  News,
  NewsDetails,
  NotFound,
  RegisterModal,
  TrainingOpportunities,
  TrainingOpportunity,
  InstSignup,
  Applications,
  StudentProfile,
  StudentSignup,
  VerifyAccount,
  InstProfile,
  InstPosts,
  InstPostDetails,
  InstPostForm,
  AdminLayout,
  AdminHomePage,
  AdminProfile,
};
