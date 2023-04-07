import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

export function GetAllNews(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
      setLoading(true);
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

export const UserRole = (url) => {
  const [userRole, setUserRole] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setUserRole(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);
  return { userRole, loading, error };
};

export const useFetchMajorsAndCities = () => {
  const [majors, setMajors] = useState();
  const [cities, setCities] = useState();

  useEffect(() => {
    (async () => {
      try {
        const [majors, cities] = await Promise.all([
          axios.get("https://www.ptway.net/api/getspec?type=sMajor"),
          axios.get("https://www.ptway.net/api/getcity?type=city"),
        ]);

        setMajors(JSON.parse(majors.data.Cs));
        setCities(JSON.parse(cities.data.cities));
      } catch (error) {
        console.log("Opps, we got an error", error);

        notification.error({
          message: "لقد حدث خطأ",
          description: "لقد حدث خطأ ما، الرجاء المحاولة مرة أخرى",
        });
      }
    })();
  }, []);

  return { majors, cities };
};

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}