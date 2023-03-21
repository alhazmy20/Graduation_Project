import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function GetAllNews(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }, [url]);
  return { data, loading, error };
}

export function GetNewsId(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);
  return { data, loading, error };
}

export const UserRole = (url , email) => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Fetch user role data from API using Axios
    axios
      .get(url+"/"+email)
      .then((response) => {
        setUserRole(response.data.role);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return userRole;
};
