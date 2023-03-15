import React from 'react'
import { useLocation } from 'react-router-dom'
import { Card,Image } from 'antd';

const { Meta } = Card;

const NewsDetails = () => {
 const location = useLocation();
  return (
    <Card
    style={{width: '100%',height:'100%',justifyContent: "center",display: "flex",flexDirection: "column", alignItems:"center", marginTop: '1rem'}}
    cover={ <Image preview={false} style={{marginTop: '1rem'}} src={location.state.avatar} width="auto" />}
  >
    <Meta title={location.state.title} description={location.state.date} />
  </Card>
  )
}

export default NewsDetails