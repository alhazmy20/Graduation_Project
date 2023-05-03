import { Col, Row, Select } from "antd";
import React, { useState } from "react";
import { SECTORS } from "../../data/TestData";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { useFetchMajorsAndCities } from "../../data/API";
import RegionSelect from "./RegionSelect";
import CitySelect from "./CitySelect";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import PasswordConfirInput from "./PasswordConfirInput";
import PhoneInput from "./PhoneInput";

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
      </Row>
    </>
  );
};

export default InstFormInputs;
