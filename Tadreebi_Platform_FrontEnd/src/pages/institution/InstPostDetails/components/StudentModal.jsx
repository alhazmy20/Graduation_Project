import { Avatar, Button, Col, Modal, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import "./StudentModal.scss";

const StudentModal = ({ detailsOpen, setDetailsOpen }) => {
  return (
    <Modal
      open={detailsOpen}
      onOk={() => setDetailsOpen(false)}
      onCancel={() => setDetailsOpen(false)}
      footer={[]}
      width={650}
    >
      <div className="StudentModalContainer">
        <div className="avatar-container">
          <Avatar
            size={100}
            //REPLACE this src when you fetch the data
            src="http://s3.eu-central-1.amazonaws.com/graduation-project-test1/students/personal_pictures/0cPAv3DmiR6OJoWWBWod0ef3V5PssfWVAness7k6.png"
            className="avatar"
          />
          <span className="avatar-name">يزيد سعد نفاع العلوي</span>
        </div>

        <Row gutter={[16, 0]} className="row">
          <Col xs={24} md={16} className="col-one">
            <Space size={5} className="space">
              <span className="label">رقم الهوية:</span>
              <span className="text">1101234567</span>
            </Space>

            <Space size={5} className="space">
              <span className="label">الجوال:</span>
              <span className="text">0505874712</span>
            </Space>

            <Space size={5} className="space">
              <span className="label">البريد الإلكتروني:</span>
              <span className="text">TU4002681@TAIBAHU.EDU.SA</span>
            </Space>
          </Col>

          <Col xs={24} md={8} className="col-two">
            <Space size={5} className="space">
              <span className="label">الجامعة:</span>
              <span className="text">جامعة طيبة</span>
            </Space>

            <Space size={5} className="space">
              <span className="label">التخصص:</span>
              <span className="text">نظم المعلومات</span>
            </Space>

            <Space size={5} className="space">
              <span className="label">المعدل:</span>
              {/*ADD GPA_Type*/}
              <span className="text">4.9</span>
            </Space>
          </Col>
        </Row>

        <div className="fiels-container">
          <Space size={5} className="space">
            <span className="label">السيرة الذاتية:</span>
            <Button type="primary">عرض</Button>
          </Space>

          <Space size={5} className="space">
            <span className="label">خطاب التدريب:</span>
            <Button type="primary">عرض</Button>
          </Space>

          <Space size={5} className="space">
            <span className="label">السجل الأكاديمي:</span>
            <Button type="primary">عرض</Button>
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default StudentModal;
