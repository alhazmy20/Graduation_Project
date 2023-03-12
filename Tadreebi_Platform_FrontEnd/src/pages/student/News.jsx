import { Space } from 'antd'
import React from 'react'
import NewsCard from "./components/NewsCard"
const News = () => {
  return (
    <Space direction='vertical' size="middle" style={{display: 'flex',marginTop: "2rem", marginBottom: "1rem"}}>
        <NewsCard/>
    </Space>
  )
}

export default News