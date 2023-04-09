import React from "react";
import { List } from "antd";
import { GetAllNews } from "../../../data/API";
import InfoCard from "./components/InfoCard";
import { itemRender } from "../../../components/ui/Pagination";
const InstitutionInfo = () => {
  const { data } = GetAllNews("http://localhost:8000/info");
  return (
   <div style={{padding:"2rem"}}>
   <List
   grid={{
     gutter: 16,
     xs: 1,
     sm: 1,
     md: 2,
     lg: 2,
     xl: 3,
     xxl: 4,
   }}
   pagination={{
     onChange: (page) => {
       console.log(page);
     },
     responsive: true,
     position: "bottom",
     itemRender: itemRender,
     align: "center",
     pageSize: 8,
   }}
   dataSource={data}
   renderItem={(item) => (
     <List.Item>
       <InfoCard item={item} />
     </List.Item>
   )}
 />
   </div>
  );
};

export default InstitutionInfo;
