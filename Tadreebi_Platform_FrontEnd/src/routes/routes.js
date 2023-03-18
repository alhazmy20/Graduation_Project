import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/general/Home/Home";
import Login from "../pages/general/Login/Login";
import NotFound from "../pages/general/NotFound/NotFound";
import InstSignup from "../pages/institution/InstSignup/InstSignup";
import News from "../pages/general/News/News";
import StudentSignup from "../pages/student/StudentSignup/StudentSignup";
import TrainingOpportunities from "../pages/general/TrainingOpportunities/TrainingOpportunities";
import Applications from "../pages/student/Applications/AppTable";
import NewsDetails from "../pages/general/News/NewsDetails/NewsDetails";
import TrainingOpportunity from "../pages/general/TrainingOpportunity/TrainingOpportunity";
import StudentProfile from "../pages/student/StudentProfile/StudentProfile";
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
        <Route path="applications" element={<Applications />} />
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
