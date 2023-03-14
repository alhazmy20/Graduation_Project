import { Button, Form, notification, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../../../components/ui/PostCard/PostCard.jsx";
import { REGIONS } from "../../../data/InstitutionData.js";
import "./TrainingOpportunities.scss";

const TrainingOpportunities = () => {
  const [cities, setCities] = useState();

  const [form] = Form.useForm();

  const handleClearFilter = () => {
    form.resetFields();
  };

  useEffect(() => {
    (async () => {
      try {
        const [cities] = await Promise.all([
          axios.get("https://www.ptway.net/api/getcity?type=city"),
        ]);

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
    <div className="training-opportunities">
      <header className="filter-container">
        <h3>تصفية على حسب:</h3>
        <Form form={form}>
          <Form.Item name="region" className="form-item">
            <Select defaultValue="كل المناطق" showSearch>
              <Select.Option key="*" value="كل المناطق" />
              {REGIONS.map((region) => (
                <Select.Option key={region.id} value={region.name}>
                  {region.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item className="form-item" name="city">
            <Select defaultValue="كل المدن" showSearch>
              <Select.Option key="*" value="كل المدن" />
              {cities?.map((city) => (
                <Select.Option key={city._id} value={city.cityName}>
                  {city.cityName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item className="form-item" name="major">
            {/*NOTE: Edit this*/}
            <Select defaultValue="كل التخصصات" showSearch>
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
