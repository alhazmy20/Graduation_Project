import { Col, Row, Select } from "antd";
import React from "react";
import { REGIONS, SECTORS } from "../../data/InstitutionData";
import { confirmPasswordRules, passwordRules } from "../../Validation/rules";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import {useFetchMajorsAndCities} from '../../data/API'

const InstitutionData = ({ withPassword }) => {
    const {cities, majors} = useFetchMajorsAndCities()
  return (
    <>
      <Row gutter={[16, 16]}>
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
          <FormSelect name="region" label="المنطقة" labelCol={{ span: 24 }}>
            {REGIONS.map((region) => (
              <Select.Option key={region.id} value={region.name}>
                {region.name}
              </Select.Option>
            ))}
          </FormSelect>
        </Col>
        <Col xs={24} sm={12}>
          <FormSelect name="city" label="المدينة" labelCol={{ span: 24 }}>
            {cities?.map((elm) => (
              <Select.Option key={elm._id} value={elm.cityName}>
                {elm.cityName}
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
            name="email"
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
      </Row>
    </>
  );
};

export default InstitutionData;
