import { Col, Form, Row, Select } from "antd";
import React, { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import RegionSelect from "./RegionSelect";
import CitySelect from "./CitySelect";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import PasswordConfirInput from "./PasswordConfirInput";
import PhoneInput from "./PhoneInput";
import TextArea from "antd/es/input/TextArea";
import SECTORS from "../../data/sectors.json";
import { useFetchMajorsAndCities } from "../../util/api";

const InstFormInputs = ({ withPassword, region, isProfile }) => {
  const { majors } = useFetchMajorsAndCities();
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
  };
  return (
    <>
      <Row gutter={[16, 2]}>
        <Col xs={24} sm={12}>
          <FormInput label="إسم المنشأة" name="institutionName" />
        </Col>
        <Col xs={24} sm={12}>
          <FormSelect name="institutionSector" label="القطاع">
            {SECTORS.map((sector) => (
              <Select.Option key={sector.id} value={sector.name}>
                {sector.name}
              </Select.Option>
            ))}
          </FormSelect>
        </Col>
        <Col xs={24} sm={12}>
          <RegionSelect label="المنطقة" onChange={handleRegionChange} />
        </Col>
        <Col xs={24} sm={12}>
          <CitySelect
            selectedRegion={selectedRegion}
            region={region}
            label="المدينة"
          />
        </Col>

        <Col xs={24} sm={12}>
          <FormSelect name="institutionField" label="مجال العمل">
            {majors?.map((elm) => (
              <Select.Option key={elm._id} value={elm.specialistName}>
                {elm.specialistName}
              </Select.Option>
            ))}
          </FormSelect>
        </Col>
        <Col xs={24} sm={12}>
          <EmailInput label={"البريد الإلكتروني"} />
        </Col>
        {withPassword && (
          <>
            <Col xs={24} sm={12}>
              <PasswordInput label="كلمة السر" />
            </Col>

            <Col xs={24} sm={12}>
              <PasswordConfirInput label="تأكيد كلمة السر" />
            </Col>
          </>
        )}
        <Col xs={24} sm={12}>
          <PhoneInput label="رقم الهاتف" name="institutionPhone" />
        </Col>
        {isProfile && (
          <Col xs={24} sm={24}>
            <label className="formLabel">نبذة عن المنشأة</label>
            <Form.Item name="institutionSummary">
              <TextArea
                rows={3}
                placeholder="اكتب نبذة عن المنشأة..."
                maxLength={1000}
                showCount
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </>
  );
};

export default InstFormInputs;
