import { notification } from "antd";
import axios from "axios";
import api from "../data/axiosConfig";

export async function getPosts(region = "", city = "", major = "") {
  try {
    const res = await api().get(
      `api/posts?filter[region]=${region}&filter[city]=${city}&filter[major]=${major}`
    );
    console.log(res.data.data.data);
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
    return res.data.data;
  } catch (err) {
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

export const getAdmin = async (id) => {
  try {
    const res = await api().get(`api/admins/${id}`);
    return res.data.data;
  } catch (err) {
    const error = err.response.data;

    throw { message: error.message, status: error.status };
  }
};

export const getAllStudents = async () => {
  try {
    const res = await api().get(`api/students`);
    console.log(res.data.data);
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
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};