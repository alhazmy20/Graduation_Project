import { Table } from "antd";
import "./AppTable.scss";

const AppTable = () => {
  const dataSource = [
    {
      key: "1",
      appstat: "نشط",
      instname: "xxxxx",
      appname: "تدريب تعاوني - تطوير تطبيقات الويب",
      appdate: "18/01/2023",
    },
    {
      key: "2",
      appstat: "مرفوض",
      instname: "تدريب تعاوني - تدريب صيفي",
      appname: "xxxx",
      appdate: "2023",
    },
    {
      key: "3",
      appstat: "تم القبول",
      instname: "xxxxx",
      appname: "xxxxxx",
      appdate: "2023",
    },
  ];
  const columns = [
    {
      title: "تاريخ الطلب",
      dataIndex: "appdate",
      align: "center",
    },
    {
      title: "اسم الطلب",
      dataIndex: "appname",
      align: "center",
    },
    {
      title: "اسم الشركة",
      dataIndex: "instname",
      align: "center",
    },
    {
      title: "حالة الطلب",
      dataIndex: "appstat",
      align: "center",
    },
  ];
  return (
    <div className="AppTable">
      <p className="tex">عرض 1 إلى 3 من أصل 6 سجل</p>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default AppTable;
