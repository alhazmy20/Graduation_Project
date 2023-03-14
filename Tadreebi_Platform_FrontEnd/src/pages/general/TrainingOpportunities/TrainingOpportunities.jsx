import { Button, Form, notification, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../../../components/ui/PostCard/PostCard.jsx";
import { RegionData } from "../../../data/TestData.js";
import "./TrainingOpportunities.scss";

const TrainingOpportunities = () => {
  const [cities, setCities] = useState();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");

  const [form] = Form.useForm();

  const handleClearFilter = () => {
    console.log(selectedRegion, selectedCity, selectedMajor);
    form.resetFields();
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    form.setFieldsValue({ city: "كل المدن" }); // set the value of the city field to "كل المدن"
  };
  const handleCityChange = (value) => {
    setSelectedCity(value);
  };
  const handleMajorChange = (value) => {
    selectedMajor(value);
  };

  return (
    <div className="training-opportunities">
      <header className="filter-container">
        <h3>تصفية على حسب:</h3>
        <Form form={form}>
          <Form.Item name="region" className="form-item">
            <Select
              defaultValue="كل المناطق"
              showSearch
              onChange={handleRegionChange}
            >
              <Select.Option key="*" value="كل المناطق" />
              {RegionData.map((region) => (
                <Select.Option key={region.id} value={region.region}>
                  {region.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item className="form-item" name="city">
            <Select
              defaultValue="كل المدن"
              showSearch
              onChange={handleCityChange}
            >
              <Select.Option key="*" value="كل المدن" />
              {RegionData.filter((r) => r.region === selectedRegion).map(
                (region) =>
                  region.cities.map((city) => (
                    <Select.Option key={city.id} value={city.city}>
                      {city.city}
                    </Select.Option>
                  ))
              )}
            </Select>
          </Form.Item>

          <Form.Item className="form-item" name="major">
            {/*NOTE: Edit this*/}
            <Select
              defaultValue="كل التخصصات"
              showSearch
              onChange={handleMajorChange}
            >
              <Select.Option key="*" value="كل التخصصات" />
              {cities?.map((city) => (
                <Select.Option key={city._id} value={city.cityName}>
                  {city.cityName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
        <Button
          type="primary"
          className="search-button"
          onClick={handleClearFilter}
        >
          مسح عوامل التصفية
        </Button>
      </header>
      <main>
        <PostCard />
      </main>
    </div>
  );
};

export default TrainingOpportunities;
