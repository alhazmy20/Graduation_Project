import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import InstitutionInfo, { institutionsLoader1 } from "../pages/general/institutionInfo/InstitutionInfo";
import {
  Home,
  Applications,
  Login,
  News,
  NotFound,
  StudentProfile,
  TrainingOpportunity,
  NewsDetails,
  VerifyAccount,
  InstPostDetails,
  InstPosts,
  InstProfile,
  InstPostForm,
  AdminLayout,
  AdminHomePage,
  AdminProfile,
  StudentsTable,
  InstitutionsTable,
  NewsTable,
  PostsTable,
  Signup,
  TrainingOpportunities,
} from "../pages/index";
import AdminsTable, { adminsLoader } from "../pages/Admin/AdminsTable/AdminsTable";
import { postsLoader } from "../pages/general/TrainingOpportunities/TrainingOpportunities";
import { opportunityLoader } from "../pages/general/TrainingOpportunity/TrainingOpportunity";
import { loader as allNewsLoader, loader } from "../pages/general/News/News";
import { newsDetailsloader } from "../pages/general/News/NewsDetails/NewsDetails";
import { homeLoader } from "../pages/general/Home/Home";
import { institutionsLoader } from "../pages/Admin/InstitutionsTable/InstitutionsTable";
import {
  institutionLoader,
  institutionLoaderWithId,
} from "../pages/institution/InstProfile/InstProfile";
import { adminProfileLoader } from "../pages/Admin/AdminProfile/AdminProfile";
import { studentsLoader } from "../pages/Admin/StudentsTable/StudentsTable";
import {
  studentLoader,
  studentLoaderWithId,
} from "../pages/student/StudentProfile/StudentProfile";
import { instPostsLoader } from '../pages/institution/InstApplications/InstPosts';

//Institution Routes
const institutionRoutes = (
  <Route path="/institution">
    <Route index element={<h1>Institution home page</h1>} />
    <Route path="posts" element={<InstPosts />} loader={instPostsLoader}/>
    <Route path="posts/:id" element={<InstPostDetails />} />
    <Route
      path="profile"
      element={<InstProfile />}
      loader={institutionLoader}
    />
    <Route path="newPost" element={<InstPostForm />} />
    <Route path="newPost/:id" element={<InstPostForm />} />
  </Route>
);

//Student Routes
const studentRoutes = (
  <Route path="student">
    <Route path="profile" element={<StudentProfile />} loader={studentLoader} />
    <Route path="applications" element={<Applications />} />
  </Route>
);

//Admin Routes
const adminRoutes = (
  <Route path="admin" element={<AdminLayout />}>
    <Route index element={<AdminHomePage />} />
    <Route index element={<h1>الصفحة الرئيسية</h1>} />

    <Route
      path="manage-institutions"
      element={<InstitutionsTable />}
      loader={institutionsLoader}
    />
    <Route
      path="manage-institutions/:id"
      element={<InstProfile isAdmin={true} />}
      loader={institutionLoaderWithId}
    />
    <Route
      path="manage-students"
      element={<StudentsTable />}
      loader={studentsLoader}
    />
    <Route
      path="manage-students/:id"
      element={<StudentProfile isAdmin={true} />}
      loader={studentLoaderWithId}
    />
    <Route path="manage-admins" element={<AdminsTable />} loader={adminsLoader}/>
    <Route path="manage-admins/:id" element={<AdminProfile isAdmin={true} />} />
    <Route
      path="profile"
      element={<AdminProfile />}
      loader={adminProfileLoader}
    />
    <Route path="manage-posts" element={<PostsTable />} />
    <Route path="manage-news" element={<NewsTable />} />
  </Route>
);

//This is an entire route for our app.
export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} loader={homeLoader} />
        <Route
          path="training-opportunities"
          element={<TrainingOpportunities />}
          loader={postsLoader}
        />
        <Route
          path="training-opportunities/:id"
          element={<TrainingOpportunity />}
          loader={opportunityLoader}
          errorElement={<NotFound />}
        />
        <Route path="news" element={<News />} loader={allNewsLoader} />
        <Route
          path="news/:id"
          element={<NewsDetails />}
          loader={newsDetailsloader}
        />
        <Route path="InstitutionInfo" element={<InstitutionInfo />} loader={institutionsLoader1}/>
        {studentRoutes}

        {institutionRoutes}
        <Route path="*" element={<NotFound />} />
      </Route>

      {adminRoutes}

      <Route path="signup" element={<Signup />} />
      <Route path="verify-account" element={<VerifyAccount />} />
      <Route path="login" element={<Login />} />
      <Route path="admin/login" element={<Login isAdmin={true} />} />
    </Route>
  )
);
