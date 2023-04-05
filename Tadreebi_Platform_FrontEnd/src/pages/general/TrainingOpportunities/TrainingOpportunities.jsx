import { Button, Form, Select } from "antd";
import React, { useState, useMemo } from "react";
import { RegionData } from "../../../data/TestData.js";
import "./TrainingOpportunities.scss";
import { GetAllNews } from "../../../data/API";
import PostList from "./components/PostList.jsx";
import Spinner from "../../../components/ui/Spinner/Spinner.jsx";
import { data as saudiClassificationData } from "../../../data/SaudiClassification";

const TrainingOpportunities = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const { data, loading } = GetAllNews("http://localhost:8000/posts");

  // const filteredData = useMemo(() => {
  //   if (selectedRegion === "كل المناطق") {
  //     return data;
  //   } else {
  //     const newData = data.filter((post) => {
  //       return (
  //         (!selectedRegion || post.region === selectedRegion) &&
  //         (!selectedCity || post.city === selectedCity)
  //       );
  //     });
  //     return newData;
  //   }
  // }, [selectedRegion, selectedCity, data]);

  const [form] = Form.useForm();

  const majorOptions = saudiClassificationData.flatMap(({ majors }) =>
    majors.map(({ id, title: label }) => ({ label, value: label }))
  );

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    form.setFieldsValue({ city: "كل المدن" }); // set the value of the city field to "كل المدن"
  };
  const handleCityChange = (value) => {
    setSelectedCity(value);
  };
  const handleMajorChange = (value) => {
    setSelectedMajor(value);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="training-opportunities">
      <header className="filter-container">
        <h4>تصفية على حسب:</h4>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            region: "كل المناطق",
            city: "كل المدن",
            major: "كل التخصصات",
          }}
        >
          <Form.Item name="region" className="form-item">
            <Select showSearch onChange={handleRegionChange}>
              <Select.Option key="*" value="كل المناطق" />
              {RegionData.map((region) => (
                <Select.Option key={region.id} value={region.region}>
                  {region.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item className="form-item" name="city">
            <Select showSearch onChange={handleCityChange}>
              <Select.Option key="*" value="كل المدن" />
              {RegionData.find((r) => r.region === selectedRegion)?.cities.map(
                (city) => (
                  <Select.Option key={city.id} value={city.city}>
                    {city.city}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>

          <Form.Item className="form-item" name="major">
            <Select
              showSearch
              onChange={handleMajorChange}
              options={majorOptions}
            />
          </Form.Item>

          <Button type="primary" className="search-button" htmlType="submit">
            بـحـث
          </Button>
        </Form>
      </header>
      <main>
        <PostList data={data} loading={loading} />
      </main>
    </div>
  );
};

export default TrainingOpportunities;
