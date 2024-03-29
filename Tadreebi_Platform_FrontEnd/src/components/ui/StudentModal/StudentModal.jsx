import { Avatar, Button, Col, Modal, Row, Space } from "antd";
import React from "react";
import "./StudentModal.scss";
import { UserOutlined } from "@ant-design/icons";

const StudentModal = ({ detailsOpen, setDetailsOpen, data, isSupervisor}) => {

  const { studentFiles: files } = data;

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
            className="avatar"
            src={files?.personalPicture_url || undefined}
            icon={<UserOutlined />}
          />
          <span className="avatar-name">{data?.fullName}</span>
        </div>

        <Row gutter={[16, 0]} className="first-row">
          <Col xs={24} sm={14} md={16} className="col-one">
            <Space size={5} className="space">
              <span className="label">رقم الهوية:</span>
              <span className="text">{data?.national_ID}</span>
            </Space>

            <Space size={5} className="space">
              <span className="label">رقم الجوال:</span>
              <span className="text">{data?.phone}</span>
            </Space>

            <Space size={5} className="space">
              <span className="label">البريد الإلكتروني:</span>
              <span className="text">{data?.email}</span>
            </Space>
          </Col>

          <Col xs={12} sm={10} md={8} className="col-two">
            <Space size={5} className="space">
              <span className="label">الجامعة:</span>
              <span className="text">{data?.university}</span>
            </Space>

            <Space size={5} className="space">
              <span className="label">التخصص:</span>
              <span className="text">{data?.major}</span>
            </Space>

            <Space size={5} className="space">
              <span className="label">المعدل:</span>
              <span className="text">{`${data?.GPA} من ${data?.GPA_Type}`}</span>
            </Space>
          </Col>
        </Row>

        {
          !isSupervisor ? 
          <Row gutter={[16, 0]} className="second-row">
          <Col xs={24} sm={14} md={16} className="col-one">
            <Space size={5} className="space">
              <span className="label">خطاب التدريب:</span>
              <Button
                type="primary"
                onClick={() =>
                  window.open(
                    `${files?.internshipLetter_url}`,
                    "_blank",
                    "noopener"
                  )
                }
              >
                عرض
              </Button>
            </Space>

            <Space size={5} className="space">
              <span className="label">السيرة الذاتية:</span>
              {files.CV_url ? (
                <Button
                  type="primary"
                  onClick={() =>
                    window.open(`${files?.CV_url}`, "_blank", "noopener")
                  }
                >
                  عرض
                </Button>
              ) : (
                <span className="nothing">لا يوجد</span>
              )}
            </Space>
          </Col>
          <Col xs={24} sm={10} md={8} className="col-two">
            <Space size={5} className="space">
              <span className="label">السجل الأكاديمي:</span>
              <Button
                type="primary"
                onClick={() =>
                  window.open(`${files?.transcript_url}`, "_blank", "noopener")
                }
              >
                عرض
              </Button>
            </Space>

            <Space size={5} className="space">
              <span className="label">الهوية الوطنية:</span>
              {files?.nationalID_url ? (
                <Button
                  type="primary"
                  onClick={() =>
                    window.open(`${files.nationalID_url}`, "_blank", "noopener")
                  }
                >
                  عرض
                </Button>
              ) : (
                <span className="nothing">لا يوجد</span>
              )}
            </Space>
          </Col>
        </Row> 
        :
        <></>
        }
      </div>
    </Modal>
  );
};

export default StudentModal;
