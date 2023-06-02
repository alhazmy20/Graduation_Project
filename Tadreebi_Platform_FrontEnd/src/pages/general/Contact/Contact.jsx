import {  Card, Image, List } from 'antd'
import React from 'react'
import LnkdInPic from '../../../assets/images/lnkdin.png'


const data = [
    {
      title: 'Abdulmohsen Alhazmi',
    },
    {
      title: 'Abdulmohsen Alnasser',
    },
    {
      title: 'Abdulrahman Alharbi',
    },
    {
      title: 'Ibrahim Abdullah',
    },
    {
      title: 'Yazeed Alalawi',
    },
  ];

const Contact = () => {
  return (
    <div className='newsContainer'>
    <List
    className='listContainer'
    itemLayout='horizontal'
    dataSource={data}
    size="middle"
    renderItem={(item,index) => (
        <List.Item
        className='listItemContainer'
        >
            <Card size='small' className='newsCard'>
              <div className='titleContainer' style={{display: "flex",flexDirection:"row",justifyContent:"space-between"}}>
                  <h2>
                    {item.title}
                    </h2>
                    <a href={item.link} target='_blank'><Image preview={false} src={LnkdInPic} width={40}/></a>
              </div>
            </Card>
        </List.Item>
    )}
    />
    </div>
  )
}

export default Contact