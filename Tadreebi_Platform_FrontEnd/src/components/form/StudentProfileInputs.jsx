import { Col, Row, Select, Space } from "antd";
import React from "react";
import FormInput from "./FormInput";
import { inputGpaRules, nationalIdRules } from "../../validation/rules";
import FormSelect from "./FormSelect";
import InputFile from "./InputFile";
import EmailInput from "./EmailInput";
import PhoneInput from "./PhoneInput";
import MajorsSelect from "./MajorsSelect";
import UniversitySelect from "./UniversitySelect";

const StudentProfileInputs = ({ isAdmin, loadedData }) => {
  return (
    <div>
      <h1 className="green-underline">البيانات الأساسية</h1>
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12}>
          <FormInput
            label="الإسم الرباعي"
            name="fullName"
            disabled={!isAdmin}
          />
        </Col>
        <Col xs={24} sm={12}>
          <EmailInput label="البريد الجامعي" disabled={!isAdmin} />
        </Col>
        <Col xs={24} sm={12}>
          <FormInput
            label="رقم الهوية"
            name="national_ID"
            inputType="number"
            disabled={!isAdmin}
            rules={nationalIdRules}
          />
        </Col>
        <Col xs={24} sm={12}>
          <PhoneInput label="رقم الجوال" />
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
          <UniversitySelect label="اسم الجامعة" disabled={!isAdmin} />
        </Col>
        <Col xs={24} sm={12}>
          <MajorsSelect label="التخصص" name="major" disabled={!isAdmin} />
        </Col>
        <Col xs={24} sm={12}>
          <Space>
            <FormInput
              label="المعدل التراكمي"
              name="GPA"
              inputType="number"
              rules={inputGpaRules(loadedData.GPA_Type)}
            />
            <FormInput label="من" name="GPA_Type" disabled={!isAdmin} />
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
