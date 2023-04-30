import { Col, Row, Select, Space } from "antd";
import React from "react";
import FormInput from "./FormInput";
import {
  emailValidationRules,
  inputGpaRules,
  nationalIdRules,
  phoneRules,
} from "../../Validation/rules";
import FormSelect from "./FormSelect";
import InputFile from "./InputFile";

const StudentProfileInputs = ({ isAdmin, loadedData }) => {
  return (
    <div>
      <h1 className="green-underline">البيانات الأساسية</h1>
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12}>
          <FormInput
            label="الإسم الرباعي"
            labelCol={{ span: 24 }}
            name="fullName"
            disabled={!isAdmin}
          />
        </Col>
        <Col xs={24} sm={12}>
          <FormInput
            label="البريد الإلكتروني"
            labelCol={{ span: 24 }}
            name="email"
            disabled={!isAdmin}
            rules={emailValidationRules}
          />
        </Col>
        <Col xs={24} sm={12}>
          <FormInput
            label="رقم الهوية"
            labelCol={{ span: 24 }}
            name="national_ID"
            inputType="number"
            disabled={!isAdmin}
            rules={nationalIdRules}
          />
        </Col>
        <Col xs={24} sm={12}>
          <FormInput
            label="رقم الجوال"
            labelCol={{ span: 24 }}
            name="phone"
            inputType="number"
            rules={phoneRules}
          />
        </Col>

        <Col xs={24} sm={12}>
          <FormSelect label="الجنس" name="gender" disabled={!isAdmin}>
            <Select.Option value="0">ذكر</Select.Option>
            <Select.Option value="1">انثى</Select.Option>
          </FormSelect>
        </Col>

        <Col xs={24} sm={12}>
          <InputFile
            label="السيرة الذاتية"
            name="CV"
            fileName={loadedData.studentFiles.CV_filename}
            accept=".pdf"
          />
        </Col>
        <Col xs={24} sm={12}>
          <InputFile
            name="nationalID"
            label="الهوية الوطنية"
            fileName={loadedData.studentFiles.nationalID_filename}
            accept=".pdf"
          />
        </Col>
      </Row>
      <h1 className="green-underline">البيانات الأكاديمية</h1>
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12}>
          <FormInput
            label="اسم الجامعة"
            labelCol={{ span: 24 }}
            name="university"
            disabled={!isAdmin}
          />
        </Col>
        <Col xs={24} sm={12}>
          <FormInput
            label="التخصص"
            labelCol={{ span: 24 }}
            name="major"
            disabled={!isAdmin}
          />
        </Col>
        <Col xs={24} sm={12}>
          <Space>
            <FormInput
              label="المعدل التراكمي"
              labelCol={{ span: 24 }}
              name="GPA"
              inputType="number"
              rules={inputGpaRules(loadedData.GPA_Type)}
            />
            <FormInput
              label="من"
              labelCol={{ span: 24 }}
              name="GPA_Type"
              disabled={!isAdmin}
            />
          </Space>
        </Col>

        <Col xs={24} sm={12}>
          <InputFile
            name="internshipLetter"
            label="خطاب التدريب"
            fileName={loadedData.studentFiles.internshipLetter_filename}
            accept=".pdf"
          />
        </Col>
        <Col xs={24} sm={12}>
          <InputFile
            name="transcript"
            label="السجل الأكاديمي"
            fileName={loadedData.studentFiles.transcript_filename}
            accept=".pdf"
          />
        </Col>
      </Row>
    </div>
  );
};

export default StudentProfileInputs;
