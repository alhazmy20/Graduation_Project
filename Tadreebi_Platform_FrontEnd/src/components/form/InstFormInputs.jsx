import { Col, Row, Select } from "antd";
import React, { useState } from "react";
import { RegionData, SECTORS } from "../../data/TestData";
import {
  confirmPasswordRules,
  emailValidationRules,
  passwordRules,
  phoneRules,
} from "../../Validation/rules";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { useFetchMajorsAndCities } from "../../data/API";

const InstFormInputs = ({ withPassword, region }) => {
  const { majors } = useFetchMajorsAndCities();
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
  };
  return (
    <>
      <Row gutter={[16, 2]}>
        <Col xs={24} sm={12}>
          <FormInput
            label="إسم المنشأة"
            labelCol={{ span: 24 }}
            name="institutionName"
          />
        </Col>
        <Col xs={24} sm={12}>
          <FormSelect
            name="institutionSector"
            label="القطاع"
            labelCol={{ span: 24 }}
          >
            {SECTORS.map((sector) => (
              <Select.Option key={sector.id} value={sector.name}>
                {sector.name}
              </Select.Option>
            ))}
          </FormSelect>
        </Col>
        <Col xs={24} sm={12}>
          <FormSelect
            name="region"
            label="المنطقة"
            labelCol={{ span: 24 }}
            onChange={handleRegionChange}
          >
            {RegionData.map((region) => (
              <Select.Option key={region.id} value={region.region}>
                {region.name}
              </Select.Option>
            ))}
          </FormSelect>
        </Col>
        <Col xs={24} sm={12}>
          <FormSelect name="city" label="المدينة" labelCol={{ span: 24 }}>
            {RegionData.find(
              (r) => r.region === (selectedRegion || region)
            )?.cities.map((city) => (
              <Select.Option key={city.id} value={city.city}>
                {city.city}
              </Select.Option>
            ))}
          </FormSelect>
        </Col>

        <Col xs={24} sm={12}>
          <FormSelect
            name="institutionField"
            label="مجال العمل"
            labelCol={{ span: 24 }}
          >
            {majors?.map((elm) => (
              <Select.Option key={elm._id} value={elm.specialistName}>
                {elm.specialistName}
              </Select.Option>
            ))}
          </FormSelect>
        </Col>
        <Col xs={24} sm={12}>
          <FormInput
            label="البريد الإلكتروني"
            labelCol={{ span: 24 }}
            name="institutionEmail"
            rules={emailValidationRules}
          />
        </Col>
        {withPassword && (
          <>
            <Col xs={24} sm={12}>
              <FormInput
                inputType="password"
                label="كلمة السر"
                labelCol={{ span: 24 }}
                name="password"
                rules={passwordRules}
              />
            </Col>

            <Col xs={24} sm={12}>
              <FormInput
                inputType="password"
                label="تأكيد كلمة السر"
                labelCol={{ span: 24 }}
                name="confirmPassword"
                rules={confirmPasswordRules}
              />
            </Col>
          </>
        )}
        <Col xs={24} sm={12}>
          <FormInput
            label="رقم الهاتف"
            labelCol={{ span: 24 }}
            name="institutionPhone"
            inputType="number"
          />
        </Col>
      </Row>
    </>
  );
};

export default InstFormInputs;
