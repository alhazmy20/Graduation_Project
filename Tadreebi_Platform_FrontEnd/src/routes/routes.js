import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import InstitutionInfo, {
  institutionsLoader1,
} from "../pages/general/institutionInfo/InstitutionInfo";
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
import AdminsTable, {
  adminsLoader,
} from "../pages/Admin/AdminsTable/AdminsTable";
import { postsLoader } from "../pages/general/TrainingOpportunities/TrainingOpportunities";
import { opportunityLoader } from "../pages/general/TrainingOpportunity/TrainingOpportunity";
import { loader as allNewsLoader } from "../pages/general/News/News";
import { newsDetailsloader } from "../pages/general/News/NewsDetails/NewsDetails";
import { homeLoader } from "../pages/general/Home/Home";
import { institutionsLoader } from "../pages/Admin/InstitutionsTable/InstitutionsTable";
import {
  institutionLoader,
  institutionLoaderWithId,
} from "../pages/institution/InstProfile/InstProfile";
import {
  adminLoaderWithId,
  adminProfileLoader,
} from "../pages/Admin/AdminProfile/AdminProfile";
import { studentsLoader } from "../pages/Admin/StudentsTable/StudentsTable";
import {
  studentLoader,
  studentLoaderWithId,
} from "../pages/student/StudentProfile/StudentProfile";
import { instPostsLoader } from "../pages/institution/InstApplications/InstPosts";
import { applicantsPostLoader } from "../pages/institution/InstPostDetails/InstPostDetails";
import { opportunityDataLoader } from "../pages/institution/instPostForm/InstPostForm";

import { applicationsLoader } from "../pages/student/Applications/Application";
import AddAdmin from "../pages/Admin/AddAdmin/AddAdmin";
import { AdminPostsLoader } from "../pages/Admin/PostsTable/PostsTable";
import AddNews, { addNewsDataLoader } from "../pages/Admin/AddNews/AddNews";
import SupervisorsTable, { supervisorsLoader } from '../pages/Admin/SupervisorsTable/SupervisorsTable';
import SupervisorLayout from "../layouts/SupervisorLayout";
import RequireAuth from "../auth/RequireAuth";
import Unauthorized from "../pages/general/Unauthorized/Unauthorized";

//Institution Routes
const institutionRoutes = (
  <Route element={<RequireAuth allowedRoles={["Institution"]}/>}>
  <Route path="/institution">
    <Route index element={<h1>Institution home page</h1>} />
    <Route path="posts" element={<InstPosts />} loader={instPostsLoader} />
    <Route
      path="posts/:id"
      element={<InstPostDetails />}
      loader={applicantsPostLoader}
    />
    <Route
      path="profile"
      element={<InstProfile />}
      loader={institutionLoader}
    />
    <Route path="newPost" element={<InstPostForm />} />
    <Route
      path="newPost/:id"
      element={<InstPostForm />}
      loader={opportunityDataLoader}
    />
  </Route>
  </Route>
);

//Student Routes
const studentRoutes = (
  <Route element={<RequireAuth allowedRoles={["Student"]}/>}>
  <Route path="student">
    <Route path="profile" element={<StudentProfile />} loader={studentLoader} />
    <Route
      path="applications"
      element={<Applications />}
      loader={applicationsLoader}
    />
  </Route>
  </Route>
);

//supervisor Routes
const supervisorRoutes = (
  <Route element={<RequireAuth allowedRoles={["Supervisor"]}/>}>
<Route path="supervisor" element={<SupervisorLayout/>}>
    <Route path="all-students" element={<StudentProfile />} />
  </Route>
  </Route>

);

//Admin Routes
const adminRoutes = (
  <Route element={<RequireAuth allowedRoles={["SuperAdmin" , "Admin"]}/>}>
<Route path="admin" element={<AdminLayout />}>
    <Route index element={<AdminHomePage />} />

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
    <Route
      path="manage-admins"
      element={<AdminsTable />}
      loader={adminsLoader}
    />
    <Route
      path="manage-admins/:id"
      element={<AdminProfile isAdmin={true} />}
      loader={adminLoaderWithId}
    />
    <Route path="add-admin" element={<AddAdmin />} />

    <Route
      path="profile"
      element={<AdminProfile />}
      loader={adminProfileLoader}
    />
    <Route
      path="manage-posts"
      element={<PostsTable />}
      loader={AdminPostsLoader}
    />
    <Route
      path="manage-posts/:id"
      element={<TrainingOpportunity />}
      loader={opportunityLoader}
    />
    <Route path="manage-news" element={<NewsTable />} loader={allNewsLoader} />
    <Route path="add-news" element={<AddNews />} />
    <Route
      path="manage-news/:id"
      element={<AddNews />}
      loader={addNewsDataLoader}
    />
    <Route
      path="manage-supervisors"
      element={<SupervisorsTable/>}
      loader={supervisorsLoader}
    />
  </Route>
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
          element={<TrainingOpportunity withApply={true} />}
          loader={opportunityLoader}
          errorElement={<NotFound />}
        />
        <Route path="news" element={<News />} loader={allNewsLoader} />
        <Route
          path="news/:id"
          element={<NewsDetails />}
          loader={newsDetailsloader}
        />
        <Route
          path="InstitutionInfo"
          element={<InstitutionInfo />}
          loader={institutionsLoader1}
        />
        {studentRoutes}

        {institutionRoutes}
        <Route path="*" element={<NotFound />} />
      </Route>

      {adminRoutes}
      {supervisorRoutes}

      <Route path="unauthorized" element={<Unauthorized/>}/>
      <Route path="signup" element={<Signup />} />
      <Route path="verify-account" element={<VerifyAccount />} />
      <Route path="login" element={<Login />} />
      <Route path="admin/login" element={<Login isAdmin={true} />} />
    </Route>
  )
);
