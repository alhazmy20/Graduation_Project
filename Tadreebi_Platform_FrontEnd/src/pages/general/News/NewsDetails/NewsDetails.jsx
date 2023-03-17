import React , {useEffect}from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { Card,Image } from 'antd';
import Title from 'antd/es/typography/Title';
import './NewsDetails.scss'
import { GetNewsId } from '../../../../data/API';

const { Meta } = Card;

const NewsDetails = ({match}) => {
  const {id} = useParams();
 const navigate = useNavigate();

 const {data,error ,loading} = GetNewsId(`http://localhost:8000/news/${id}`);

 useEffect(() => {
  if(error){
    navigate("/news");
  }
 })
 
  return (
    <Card
    className='newsDetailsCard'
    cover={ <Image className='newsDetailsImage' preview={false} src={data?.avatar}/>}
  >
    <Meta 
    title={
      <Title className='newsDetailsTitle'>{data?.title}</Title>
    } description={
      <Title className='newsDetailsDescription'>{data?.description}</Title>
    }></Meta>
  </Card>
  )
}

export default NewsDetails