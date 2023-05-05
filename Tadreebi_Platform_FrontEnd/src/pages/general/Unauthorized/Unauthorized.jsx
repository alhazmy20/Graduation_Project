import React from 'react'
import { Button } from "antd";
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
 const goBack = useNavigate()


  return (
    <div style={{display: "flex" , height: "100vh", flexDirection: "column", justifyContent: "center" , alignItems: "center"}}>
        <span style={{fontSize: "4rem"}}>ليس لديك صلاحية وصول للصفحة</span>
        <div className='btnContainer'>
        <Button className='greenBtn' size='large'>رجوع للخلف</Button>
        </div>
    </div>
  )
}

export default Unauthorized