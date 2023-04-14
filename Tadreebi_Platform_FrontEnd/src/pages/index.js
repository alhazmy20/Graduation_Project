// Imports from general folder
import Home from "./general/Home/Home";
import Login from "./general/Login/Login";
import News from "./general/News/News";
import NewsDetails from "../pages/general/News/NewsDetails/NewsDetails";
import NotFound from "./general/NotFound/NotFound";
import TrainingOpportunities from "./general/TrainingOpportunities/TrainingOpportunities";
import TrainingOpportunity from "./general/TrainingOpportunity/TrainingOpportunity";
import VerifyAccount from "./general/VerifyAccount/VerifyAccount";
import Signup from './general/Signup/Signup';

// Imports from institution folder
import InstProfile from "./institution/InstProfile/InstProfile";
import InstPosts from "../pages/institution/InstApplications/InstPosts";
import InstPostDetails from "../pages/institution/InstPostDetails/InstPostDetails";
import InstPostForm from "./institution/instPostForm/InstPostForm";

// Imports from student folder
import Applications from "./student/Applications/Application";
import StudentProfile from "./student/StudentProfile/StudentProfile";

//Imports from admin folder
import AdminLayout from "../layouts/AdminLayout";
import AdminHomePage from "../pages/Admin/HomePage/Home";
import AdminProfile from "./Admin/AdminProfile/AdminProfile";
import StudentsTable from "../pages/Admin/StudentsTable/StudentsTable";
import InstitutionsTable from "../pages/Admin/InstitutionsTable/InstitutionsTable";
import NewsTable from "../pages/Admin/NewsTable/NewsTable";
import PostsTable from "../pages/Admin/PostsTable/PostsTable";
//Export all pages
export {
  Home,
  Login,
  News,
  NewsDetails,
  NotFound,
  TrainingOpportunities,
  TrainingOpportunity,
  Applications,
  StudentProfile,
  VerifyAccount,
  InstProfile,
  InstPosts,
  InstPostDetails,
  InstPostForm,
  AdminLayout,
  AdminHomePage,
  AdminProfile,
  StudentsTable,
  InstitutionsTable,
  NewsTable,
  PostsTable,
  Signup
};
