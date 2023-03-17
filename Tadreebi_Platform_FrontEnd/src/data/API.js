import React , {useEffect, useState} from "react";
import axios from "axios";

function GetAllNews(url) {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(url)
        .then((response) => {
          setData(response.data);
        })
        },[url]);
        return {data, loading, error};
    }


export default GetAllNews;