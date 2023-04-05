import React from 'react'
import {useParams } from 'react-router-dom'
import { Card,Image } from 'antd';
import Title from 'antd/es/typography/Title';
import './NewsDetails.scss'
import { GetNewsId } from '../../../../data/API';
import NotFound from '../../NotFound/NotFound';
import Spinner from '../../../../components/ui/Spinner/Spinner';

const { Meta } = Card;

const NewsDetails = () => {
  const {id} = useParams();

 const {data,error,loading} = GetNewsId(`http://localhost:8000/news/${id}`);

 
if(error){
  return <NotFound/>
} else if(!loading){
  return <Spinner/>
} else
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