import { Button, Form, notification, Select } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import { RegionData } from "../../../data/TestData.js";
import "./TrainingOpportunities.scss";
import { GetAllNews } from "../../../data/API";
import PostList from "./components/PostList.jsx";
import Spinner from '../../../components/ui/Spinner/Spinner.jsx';

const TrainingOpportunities = () => {
  const [cities, setCities] = useState();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const { data, loading } = GetAllNews("http://localhost:8000/posts");
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/posts")
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       notification.error({
  //         message: "لقد حدث خطأ",
  //         description: "لقد حدث خطأ ما، الرجاء المحاولة مرة أخرى",
  //       });
  //     });
  //   }, []);
    

  const filteredData = useMemo(() => {
    if (selectedRegion === "كل المناطق") {
      return data;
    } else {
      const newData = data.filter((post) => {
        if (selectedRegion && post.region !== selectedRegion) {
          return false;
        }
        if (selectedCity && post.city !== selectedCity) {
          return false;
        }
        if (selectedMajor && post.major !== selectedMajor) {
          return false;
        }
        return true;
      });
      return newData;
    }
  }, [selectedRegion, selectedCity, selectedMajor, data]);

  // console.log("render");

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
        <h5>تصفية على حسب:</h5>
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
       {!loading ? <Spinner/> : <PostList data={filteredData} /> }
      </main>
    </div>
  );
};

export default TrainingOpportunities;
