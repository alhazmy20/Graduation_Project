import { defer } from "react-router-dom";
import {
  getSingleAdmin,
  getAllAdmins,
  getAllInstitutions,
  getAllNews,
  getAllStudents,
  getAllSupervisors,
  getSingleInstitution,
  getSingleNews,
  getPostApplicants,
  getAllPosts,
  getSinglePost,
  getStudentApplications,
  getSingleSupervisor,
  getSingleStudent,
} from "./api";
//   ===========================================================

export const allStudentsLoader = () => {
  return defer({ students: getAllStudents() });
};

export const singleStudentLoader = ({ params }) => {
  const studentId = params?.id || JSON.parse(localStorage.getItem("user")).id;
  return defer({ student: getSingleStudent(studentId) });
};

//   -----------------------------------------------------------

export const allAdminsLoader = () => {
  return defer({ admins: getAllAdmins() });
};

export const singleAdminLoader = ({ params }) => {
  const adminId = params?.id || JSON.parse(localStorage.getItem("user")).id;
  return defer({ admin: getSingleAdmin(adminId) });
};

//   -----------------------------------------------------------

export const allInstitutionsLoader = () => {
  return defer({ institutions: getAllInstitutions() });
};

export const singleInstitutionLoader = ({ params }) => {
  const instId = params?.id || JSON.parse(localStorage.getItem("user")).id;
  return defer({ institution: getSingleInstitution(instId) });
};

//   -----------------------------------------------------------

export const allSupervisorsLoader = () => {
  return defer({ supervisors: getAllSupervisors() });
};

export const singleSupervisorLoader = ({ params }) => {
  const supervisorId =
    params?.id || JSON.parse(localStorage.getItem("user")).id;
  return defer({ supervisor: getSingleSupervisor(supervisorId) });
};

//   -----------------------------------------------------------

export function allPostsLoader() {
  return defer({ posts: getAllPosts() });
}

export const singlePostLoader = ({ params }) => {
  const postId = params.id;
  return defer({ post: getSinglePost(postId) });
};

//   -----------------------------------------------------------
export const applicationsLoader = () => {
  return defer({ applications: getStudentApplications() });
};

//   -----------------------------------------------------------

export const applicantsPostLoader = ({ params }) => {
  const instId = params.id;
  return defer({ applicantsPost: getPostApplicants(instId) });
};

//   -----------------------------------------------------------

export const allNewsloader = () => {
  return defer({ news: getAllNews() });
};

export const singleNewsloader = ({ params }) => {
  const postId = params.id;
  return getSingleNews(postId);
};
