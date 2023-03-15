import React from 'react'
import { useLocation } from 'react-router-dom'
import { Card,Image } from 'antd';
import Title from 'antd/es/typography/Title';

const { Meta } = Card;

const NewsDetails = () => {
 const location = useLocation();
  return (
    <Card
    bodyStyle={{width: '100%',textAlign: 'center'}}
    style={{width: '100%',height:'100%',justifyContent: "center",display: "flex",flexDirection: "column", flexGrow: '1', alignItems:"center", marginTop: '1rem'}}
    cover={ <Image preview={false} style={{marginTop: '1rem'}} src={location.state.avatar} width="auto" />}
  >
    <Meta 
    title={
      <Title style={{whiteSpace: 'normal'}}level={2}>{location.state.title}</Title>
    } description={
      <Title level={5}>{location.state.date}</Title>
    } />
  </Card>
  )
}

export default NewsDetails