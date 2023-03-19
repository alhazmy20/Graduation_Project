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

    
export function GetNewsId(url) {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(url)
        .then((response) => {
          setData(response.data);
        }).catch((err) => {
            setError(err);
        }).finally(()=>{
            setLoading(false);
        })
        },[url]);
        return {data, loading, error};
    }