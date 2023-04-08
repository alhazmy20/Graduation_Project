import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import InstitutionInfo from "../pages/general/institutionInfo/InstitutionInfo";
import {
  Home,
  Applications,
  InstSignup,
  Login,
  News,
  NotFound,
  StudentProfile,
  StudentSignup,
  TrainingOpportunities,
  TrainingOpportunity,
  NewsDetails,
  VerifyAccount,
  InstPostDetails,
  InstPosts,
  InstProfile,
  InstPostForm,
  AdminLayout,
  AdminHomePage,
} from "../pages/index";
import StudentsTable from "../pages/Admin/StudentsTable/StudentsTable";

//Institution Routes
const institutionRoutes = (
  <Route path="/institution">
    <Route index element={<h1>Institution home page</h1>} />
    <Route path="posts" element={<InstPosts />} />
    <Route path="posts/:id" element={<InstPostDetails />} />
    <Route path="profile" element={<InstProfile />} />
    <Route path="newPost" element={<InstPostForm />} />
    <Route path="newPost/:id" element={<InstPostForm />} />
  </Route>
);

//Student Routes
const studentRoutes = (
  <Route path="student">
    <Route path="profile" element={<StudentProfile />} />
    <Route path="profile/:id" element={<StudentProfile />} />
    <Route path="applications" element={<Applications />} />
  </Route>
);

//Admin Routes
const adminRoutes = (
  <Route path="admin" element={<AdminLayout />}>
    <Route index element={<AdminHomePage />} />

    <Route index element={<h1>الصفحة الرئيسية</h1>} />
    <Route path="studentstable" element={<StudentsTable />} />
    <Route path="manage-stuedents/:id" element={<StudentProfile isAdmin={true}/>} />
  </Route>
);

//This is an entire route for our app.
export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home></Home>} />
        <Route
          path="training-opportunities"
          element={<TrainingOpportunities />}
        />
        <Route
          path="training-opportunities/:id"
          element={<TrainingOpportunity />}
        />
        <Route path="news" element={<News />} />
        <Route path="news/:id" element={<NewsDetails />} />
        <Route path="InstitutionInfo" element={<InstitutionInfo />} />
        {studentRoutes}

        {institutionRoutes}
        <Route path="*" element={<NotFound />} />
      </Route>

      {adminRoutes}

      <Route path="institution/signup" element={<InstSignup />} />
      <Route path="student/signup" element={<StudentSignup />} />
      <Route path="verify-account" element={<VerifyAccount />} />
      <Route path="login" element={<Login />} />
      <Route path="admin/login" element={<h1>Login for admin</h1>} />
    </Route>
  )
);
