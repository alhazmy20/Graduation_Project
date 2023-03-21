import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
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
} from "../pages/index";

//Institution Routes
const institutionRoutes = (
  <Route path="/institution">
    <Route index element={<h1>Institution home page</h1>} />
    <Route path="add-post" element={<h1>Add post</h1>} />
    <Route path="posts" element={<h1>Institution posts</h1>}>
      <Route
        path=":id"
        element={<h1>Specific post that was added by the institution.</h1>}
      />
    </Route>
    <Route path="profile" element={<h1>Institution profile</h1>} />
  </Route>
);

//Student Routes
const studentRoutes = (
  <Route path="student">
    <Route path="profile" element={<StudentProfile />} />
    <Route path="applications" element={<Applications />} />
  </Route>
);

//Admin Routes
const adminRoutes = <Route path="admin"></Route>;

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
          path="training-opportunities/1"
          element={<TrainingOpportunity />}
        />
        <Route path="news" element={<News />} />
        <Route path="news/:id" element={<NewsDetails />} />
        {studentRoutes}

        {institutionRoutes}
        <Route path="*" element={<NotFound />} />
      </Route>

      {adminRoutes}

      <Route path="institution/signup" element={<InstSignup />} />
      <Route path="student/signup" element={<StudentSignup />} />
      <Route path="login" element={<Login />} />
      <Route path="admin/login" element={<h1>Login for admin</h1>} />
    </Route>
  )
);
