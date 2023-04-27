import { notification } from "antd";
import axios from "axios";
import api from "../data/axiosConfig";

export async function getPosts(region = "", city = "", major = "") {
  try {
    const res = await api().get(
      `api/posts?filter[region]=${region}&filter[city]=${city}&filter[major]=${major}`
    );
    // console.log(res.data.data.data);
    return res.data.data || {};
  } catch (error) {
    const message = error.response.data.message;
    notification.error({
      message: message,
      description: "",
    });
    throw error;
  }
}

export async function getPost(id) {
  try {
    const res = await api().get(`api/posts/${id}`);
    return res.data.data;
  } catch (err) {
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
}

export async function getAllNews() {
  const res = await api().get("api/news");
  if (!res) {
    throw { message: "Field to fetch posts.", status: 500 };
  }
  return res;
}

export async function getNews(id) {
  const res = await api().get(`api/news/${id}`);
  if (!res) {
    throw { message: "Field to fetch posts.", status: 500 };
  }
  return res;
}

export const getAllInstitutions = async () => {
  try {
    const res = await api().get(`api/institutions`);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getInstitution = async (id) => {
  try {
    const res = await api().get(`api/institutions/${id}`);
    // console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

export const getAdmin = async (id) => {
  console.log(id);
  try {
    const res = await api().get(`api/admins/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.log(err);
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

export const getAllStudents = async () => {
  try {
    const res = await api().get(`api/students`);
    return res.data.data;
  } catch (err) {
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

export const getStudent = async (id) => {
  try {
    const res = await api().get(`api/students/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

export const getAllAdmins = async () => {
  try {
    const res = await api().get(`api/admins`);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPostApplicants = async (postId) => {
  try {
    const [postRes, applicantsRes] = await Promise.all([
      // api().get('api/admins'),
      getPost(postId),
      api().get(`api/posts/${postId}/applicants`),
    ]);
    return { post: postRes, applicants: applicantsRes };
  } catch (error) {
    console.log(error);
    throw { message: "error.message", status: "400 " };
  }
};

export const getStudentApplications = async () => {
  try {
    const res = await api().get(`api/applications`);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

export const exportExcelFile = async (
  export_who,
  post_id = null,
  post_title = null
) => {
  let export_url = "";
  let fileName = "";

  switch (export_who) {
    case "Post Applicants":
      export_url = `api/posts/${post_id}/applicants/export`;
      fileName = post_title;
      break;
    case "All Institution":
      export_url = `api/institutions/export`;
      fileName = "بيانات المؤسسات";
      break;
    case "All Student":
      export_url = `api/students/export`;
      fileName = "بيانات الطلاب";
      break;
    default:
      throw new Error(`Invalid export option: ${export_who}`);
  }

  try {
    const res = await api().get(export_url, {
      responseType: "blob",
    });
    const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = downloadUrl;
    const today = new Date().toISOString().slice(0, 10);
    link.setAttribute("download", `${fileName} ${today}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.log(error);
  }
};
