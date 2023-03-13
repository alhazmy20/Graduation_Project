import React, { useEffect, useState } from "react";
import { Select, notification, Row, Col } from "antd";
import axios from "axios";
import { SECTORS, REGIONS } from "../../../../data/InstitutionData.js";
import FormInput from "../../../../components/form/FormInput.jsx";
import FormSelect from "../../../../components/form/FormSelect.jsx";

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
          <FormInput
            label="إسم المنشأة"
            labelCol={{ span: 24 }}
            name="institutionName"
            rules={[
              {
                required: true,
                message: "الرجاء إدخال اسم المنشأة",
              },
            ]}
          />
          <FormSelect
            name="institutionSector"
            label="القطاع"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "الرجاء اختيار القطاع" }]}
          >
            {SECTORS.map((sector) => (
              <Select.Option key={sector.id} value={sector.name}>
                {sector.name}
              </Select.Option>
            ))}
          </FormSelect>

          <FormSelect
            name="institutionField"
            label="مجال العمل"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "الرجاء اختيار مجال العمل" }]}
          >
            {majors?.map((elm) => (
              <Select.Option key={elm._id} value={elm.specialistName}>
                {elm.specialistName}
              </Select.Option>
            ))}
          </FormSelect>

          <FormSelect
            name="region"
            label="المنطقة"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "الرجاء اختيار المنطقة" }]}
          >
            {REGIONS.map((region) => (
              <Select.Option key={region.id} value={region.name}>
                {region.name}
              </Select.Option>
            ))}
          </FormSelect>
        </Col>
        <Col xs={24} sm={12}>
          <FormSelect
            name="city"
            label="المدينة"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "الرجاء اختيار المدينة" }]}
          >
            {" "}
            {cities?.map((elm) => (
              <Select.Option key={elm._id} value={elm.cityName}>
                {elm.cityName}
              </Select.Option>
            ))}
          </FormSelect>

          <FormInput
            label="البريد الإلكتروني"
            labelCol={{ span: 24 }}
            name="email"
            rules={[
              { required: true, message: "الرجاء ادخال البريد الإلكتروني" },
              { message: "الرجاء إدخال بريد الكتروني صالح", type: "email" },
            ]}
          />

          <FormInput
            inputType="password"
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
          />
          <FormInput
            inputType="password"
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
          />
        </Col>
      </Row>
    </div>
  );
};

export default StepOne;
