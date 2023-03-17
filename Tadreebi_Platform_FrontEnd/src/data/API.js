import React , {useEffect, useState} from "react";
import axios from "axios";

export function GetAllNews(url) {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    useEffect(() => {
        axios.get(url)
        .then((response) => {
          setData(response.data);
        })
        },[url]);
        return {data, loading, error};
    }