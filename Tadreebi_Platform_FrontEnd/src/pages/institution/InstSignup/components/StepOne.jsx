import React, { useEffect, useState } from "react";
import { Form, Input, Select, notification, Row, Col } from "antd";
import axios from "axios";
import { SECTORS, REGIONS } from "../../../../data/InstitutionData.js";

const StepOne = (props) => {
  const [majors, setMajors] = useState();
  const [cities, setCities] = useState();

  useEffect(() => {
    (async () => {
      try {
        const [majors, cities] = await Promise.all([
          axios.get("https://www.ptway.net/api/getspec?type=sMajor"),
          axios.get("https://www.ptway.net/api/getcity?type=city"),
        ]);

        setMajors(JSON.parse(majors.data.Cs));
        setCities(JSON.parse(cities.data.cities));
      } catch (error) {
        console.log("Opps, we got an error", error);

        notification.error({
          message: "لقد حدث خطأ",
          description: "لقد حدث خطأ ما، الرجاء المحاولة مرة أخرى",
        });
      }
    })();
  }, []);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="إسم المنشأة"
            labelCol={{ span: 24 }}
            name="institutionName"
            rules={[
              {
                required: true,
                message: "الرجاء إدخال اسم المنشأة",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="institutionSector"
            label="القطاع"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "الرجاء اختيار القطاع" }]}
          >
            <Select allowClear showSearch>
              {SECTORS.map((sector) => (
                <Select.Option key={sector.id} value={sector.name}>
                  {sector.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="institutionField"
            label="مجال العمل"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "الرجاء اختيار مجال العمل" }]}
          >
            <Select allowClear showSearch>
              {majors?.map((elm) => (
                <Select.Option key={elm._id} value={elm.specialistName}>
                  {elm.specialistName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="region"
            label="المنطقة"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "الرجاء اختيار المنطقة" }]}
          >
            <Select allowClear showSearch>
              {REGIONS.map((sector) => (
                <Select.Option key={sector.id} value={sector.name}>
                  {sector.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="city"
            label="المدينة"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "الرجاء اختيار المدينة" }]}
          >
            <Select allowClear showSearch>
              {cities?.map((elm) => (
                <Select.Option key={elm._id} value={elm.cityName}>
                  {elm.cityName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="البريد الإلكتروني"
            labelCol={{ span: 24 }}
            name="email"
            rules={[
              { required: true, message: "الرجاء ادخال البريد الإلكتروني" },
              { message: "الرجاء إدخال بريد الكتروني صالح", type: "email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="كلمة السر"
            labelCol={{ span: 24 }}
            name="password"
            rules={[
              { required: true, message: "الرجاء ادخال كلمة المرور" },
              {
                message: "يجب أن لا يقل عن 8 أحرف، حرف كبير و حرف صغير و رقم",
                pattern: "^(?=.*[A-Z])(?=.*\\d).{8,}$",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="تأكيد كلمة السر"
            labelCol={{ span: 24 }}
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "الرجاء تأكيد كلمة السر",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("كلمة السر غير متطابقة"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default StepOne;
