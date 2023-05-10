import { notification } from "antd";
import { useState, useEffect } from "react";
import axiosConfig from "./axiosConfig";

//---------------------------------------------------------------------------
export const getAllPosts = async (region = "", city = "", major = "") => {
  try {
    const res = await axiosConfig().get(
      `api/posts?filter[region]=${region}&filter[city]=${city}&filter[major]=${major}`
    );
    return res.data.data || {};
  } catch (error) {
    const message = error.response.data.message;
    notification.error({
      message: message,
      description: "",
    });
    throw error;
  }
};

export const getSinglePost = async (id) => {
  try {
    const res = await axiosConfig().get(`api/posts/${id}`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

//---------------------------------------------------------------------------

export const getPostApplicants = async (postId) => {
  try {
    const [postRes, applicantsRes] = await Promise.all([
      // axiosConfig().get('api/admins'),
      getSinglePost(postId),
      axiosConfig().get(`api/posts/${postId}/applicants`),
    ]);
    return { post: postRes, applicants: applicantsRes };
  } catch (error) {
    console.log(error);
    throw { message: "error.message", status: "400 " };
  }
};

//---------------------------------------------------------------------------

export const getAllNews = async () => {
  try {
    const res = await axiosConfig().get("api/news");
    return res.data.data;
  } catch (err) {
    console.log(err);
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

export const getSingleNews = async (id) => {
  try {
    const res = await axiosConfig().get(`api/news/${id}`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

//---------------------------------------------------------------------------

export const getAllInstitutions = async () => {
  try {
    const res = await axiosConfig().get(`api/institutions`);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleInstitution = async (id) => {
  try {
    const res = await axiosConfig().get(`api/institutions/${id}`);
    // console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

//---------------------------------------------------------------------------

export const getAllAdmins = async () => {
  try {
    const res = await axiosConfig().get(`api/admins`);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleAdmin = async (id) => {
  try {
    const res = await axiosConfig().get(`api/admins/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.log(err);
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

//---------------------------------------------------------------------------

export const getAllStudents = async () => {
  try {
    const res = await axiosConfig().get(`api/students`);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

export const getSingleStudent = async (id) => {
  try {
    const res = await axiosConfig().get(`api/students/${id}`);
    return res.data.data;
  } catch (err) {
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

//---------------------------------------------------------------------------

export const getStudentApplications = async () => {
  try {
    const res = await axiosConfig().get(`api/applications`);
    return res.data.data;
  } catch (err) {
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

//---------------------------------------------------------------------------

export const exportExcelFile = async (
  export_who,
  post_id = null,
  post_title = null
) => {
  let export_url = "";
  let fileName = "";

  switch (export_who) {
    case "post_applicants":
      export_url = `api/posts/${post_id}/applicants/export`;
      fileName = post_title;
      break;
    case "all_institutions":
      export_url = `api/institutions/export`;
      fileName = "بيانات المؤسسات";
      break;
    case "institution_students":
      export_url = `api/students/export`;
      fileName = "بيانات الطلاب";
      break;
    case "supervisor_students":
      export_url = `api/supervisors/students/export`;
      fileName = "بيانات الطلاب";
      break;
    default:
      throw new Error(`Invalid export option: ${export_who}`);
  }

  try {
    const res = await axiosConfig().get(export_url, {
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

//---------------------------------------------------------------------------

export const getAdminDashboardCards = async () => {
  try {
    const res = await axiosConfig().get(`api/dashboard/cards`);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

export const getAdminDashboardChart = async (year) => {
  try {
    const res = await axiosConfig().get(`api/dashboard/chart?year=${year}`);
    return res.data.data;
  } catch (err) {
    const error = err.response.data;
    throw { message: error.message, status: error.status };
  }
};

const getSupervisorCards = async () => {
  try {
    const res = await axiosConfig().get(`api/supervisors/cards`);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

export const getSupervisorChart = async (year) => {
  try {
    const res = await axiosConfig().get(`api/supervisors/chart?year=${year}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    const error = err.response.data;
    throw { message: error.message, status: error.status };
  }
};

export const useDashboard = (endpoint, role, year) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (endpoint === "cards") {
          if (role === "SuperAdmin") {
            data = await getAdminDashboardCards();
          } else if (role === "Supervisor") {
            data = await getSupervisorCards();
          }
        } else if (endpoint === "chart") {
          if (role === "SuperAdmin") {
            data = await getAdminDashboardChart(year);
          } else if (role === "Supervisor") {
            data = await getSupervisorChart(year);
          }
        }
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, year]);

  return { data, loading, error };
};

//---------------------------------------------------------------------------

export const getAllSupervisors = async () => {
  try {
    const res = await axiosConfig().get(`api/supervisors`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleSupervisor = async (id) => {
  try {
    const res = await axiosConfig().get(`api/supervisors/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.log(err);
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

//---------------------------------------------------------------------------
