import RequireAuth from "../auth/RequireAuth";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import SupervisorLayout from "../layouts/SupervisorLayout";
import AdminLayout from '../layouts/AdminLayout';

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
  AdminHomePage,
  AdminProfile,
  StudentsTable,
  InstitutionsTable,
  NewsTable,
  PostsTable,
  Signup,
  TrainingOpportunities,
  SupervisorProfile,
  AdminsTable,
  AddAdmin,
  AddNews,
  SupervisorsTable,
  InstitutionInfo,
  Unauthorized,
} from "../pages/index";

import {
  singleAdminLoader,
  applicationsLoader,
  singleInstitutionLoader,
  singlePostLoader,
  allPostsLoader,
  singleStudentLoader,
  applicantsPostLoader,
  allNewsloader,
  singleNewsloader,
  allAdminsLoader,
  allInstitutionsLoader,
  singleSupervisorLoader,
  allSupervisorsLoader,
  allStudentsLoader,
} from "../util/loaders";
import SupervisorStudentsApplications from "../pages/supervisor/SupervisorStudents/SupervisorStudentsApplications";

//Institution Routes
const institutionRoutes = (
  <Route element={<RequireAuth allowedRoles={["Institution"]} />}>
    <Route path="/institution">
      <Route index element={<h1>Institution home page</h1>} />
      <Route path="posts" element={<InstPosts />} loader={allPostsLoader} />
      <Route
        path="posts/:id"
        element={<InstPostDetails />}
        loader={applicantsPostLoader}
      />
      <Route
        path="profile"
        element={<InstProfile />}
        loader={singleInstitutionLoader}
      />
      <Route path="newPost" element={<InstPostForm />} />
      <Route
        path="newPost/:id"
        element={<InstPostForm />}
        loader={singlePostLoader}
      />
    </Route>
  </Route>
);

//Student Routes
const studentRoutes = (
  <Route element={<RequireAuth allowedRoles={["Student"]} />}>
    <Route path="student">
      <Route
        path="profile"
        element={<StudentProfile />}
        loader={singleStudentLoader}
      />
      <Route
        path="applications"
        element={<Applications />}
        loader={applicationsLoader}
      />
      <Route
        path="applications/post/:id"
        element={<TrainingOpportunity/>} loader={singlePostLoader}
      />
    </Route>
  </Route>
);

//supervisor Routes
const supervisorRoutes = (
  <Route element={<RequireAuth allowedRoles={["Supervisor"]} />}>
    <Route path="supervisor" element={<SupervisorLayout />}>
      <Route index element={<p>supervisor homepage</p>} />
      <Route path="manage-applications" element={<SupervisorStudentsApplications/>} loader={applicationsLoader} />
      <Route path="manage-applications/post/:id" element={<TrainingOpportunity/>} loader={singlePostLoader} />
      <Route path="all-students" element={<p>all-students</p>} />
      <Route path="profile" element={<SupervisorProfile/>} />
    </Route>
  </Route>
);

//Admin Routes
const adminRoutes = (
  <Route element={<RequireAuth allowedRoles={["SuperAdmin", "Admin"]} />}>
    <Route path="admin" element={<AdminLayout />}>
      <Route index element={<AdminHomePage />} />

      <Route
        path="manage-institutions"
        element={<InstitutionsTable />}
        loader={allInstitutionsLoader}
      />
      <Route
        path="manage-institutions/:id"
        element={<InstProfile isAdmin={true} />}
        loader={singleInstitutionLoader}
      />
      <Route
        path="manage-students"
        element={<StudentsTable />}
        loader={allStudentsLoader}
      />
      <Route
        path="manage-students/:id"
        element={<StudentProfile isAdmin={true} />}
        loader={singleStudentLoader}
      />
      <Route
        path="manage-admins"
        element={<AdminsTable />}
        loader={allAdminsLoader}
      />
      <Route
        path="manage-admins/:id"
        element={<AdminProfile isAdmin={true} />}
        loader={singleAdminLoader}
      />
      <Route path="add-admin" element={<AddAdmin />} />

      <Route
        path="profile"
        element={<AdminProfile />}
        loader={singleAdminLoader}
      />
      <Route
        path="manage-posts"
        element={<PostsTable />}
        loader={allPostsLoader}
      />
      <Route
        path="manage-posts/:id"
        element={<TrainingOpportunity />}
        loader={singlePostLoader}
      />
      <Route
        path="manage-news"
        element={<NewsTable />}
        loader={allNewsloader}
      />
      <Route path="add-news" element={<AddNews />} />
      <Route
        path="manage-news/:id"
        element={<AddNews />}
        loader={singleNewsloader}
      />
      <Route
        path="manage-supervisors"
        element={<SupervisorsTable />}
        loader={allSupervisorsLoader}
      />
      <Route
        path="manage-supervisors/:id"
        element={<SupervisorProfile />}
        loader={singleSupervisorLoader}
      />
    </Route>
  </Route>
);

//This is an entire route for our app.
export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} loader={allPostsLoader} />
        <Route
          path="training-opportunities"
          element={<TrainingOpportunities />}
          loader={allPostsLoader}
        />
        <Route
          path="training-opportunities/:id"
          element={<TrainingOpportunity withApply={true} />}
          loader={singlePostLoader}
          errorElement={<NotFound />}
        />
        <Route path="news" element={<News />} loader={allNewsloader} />
        <Route
          path="news/:id"
          element={<NewsDetails />}
          loader={singleNewsloader}
        />
        <Route
          path="InstitutionInfo"
          element={<InstitutionInfo />}
          loader={allInstitutionsLoader}
        />
        {studentRoutes}

        {institutionRoutes}
        <Route path="*" element={<NotFound />} />
      </Route>

      {adminRoutes}
      {supervisorRoutes}

      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="signup" element={<Signup />} />
      <Route path="verify-account" element={<VerifyAccount />} />
      <Route path="login" element={<Login />} />
      <Route path="admin/login" element={<Login isAdmin={true} />} />
    </Route>
  )
);
