import React , {useEffect}from 'react'
import {useLocation, useNavigate } from 'react-router-dom'
import { Card,Image } from 'antd';
import Title from 'antd/es/typography/Title';
import './NewsDetails.scss'

const { Meta } = Card;

const NewsDetails = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const locationState = location.state

useEffect(() => {
  if(locationState == null){
    navigate('/news');
  }
})
  return (
    <Card
    className='newsDetailsCard'
    cover={ <Image className='newsDetailsImage' preview={false} src={location.state?.avatar}/>}
  >
    <Meta 
    title={
      <Title className='newsDetailsTitle'>{location.state?.title}</Title>
    } description={
      <Title className='newsDetailsDescription'>{location.state?.description}</Title>
    }></Meta>
  </Card>
  )
}

export default NewsDetails