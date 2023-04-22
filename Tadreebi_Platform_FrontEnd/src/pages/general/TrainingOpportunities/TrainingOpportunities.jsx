import { Button, Form, Select } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { RegionData } from "../../../data/TestData.js";
import "./TrainingOpportunities.scss";
import PostList from "./components/PostList.jsx";
import { data as saudiClassificationData } from "../../../data/SaudiClassification";
import { getPosts } from "../../../util/api.js";
import Spinner from "../../../components/ui/Spinner/Spinner.jsx";
import { defer, useLoaderData, Await } from "react-router-dom";
import axios from "axios";

const TrainingOpportunities = () => {
  const [postsData, setPostsData] = useState(useLoaderData());
  const [filtered, setFiltered] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [form] = Form.useForm();

  const majorOptions = [
    { label: "كل التخصصات", value: "" },
    ...saudiClassificationData.flatMap(({ majors }) =>
      majors.map(({ id, title: label }) => ({ label, value: label }))
    ),
  ];

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    form.setFieldsValue({ city: "كل المدن" });
  };

  const onFinish = async (values) => {
    const { region, city, major } = values;

    values.region = region === "كل المناطق" ? "" : region;
    values.city = city === "كل المدن" ? "" : city;
    values.major = major === "كل التخصصات" ? "" : major;

    setLoading(true); //NOTE set loading to true before making the API call

    try {
      const posts = await getPosts(values.region, values.city, values.major);
      setPostsData(posts);
      setFiltered(true);
    } catch (err) {
      console.log(err);
    }

    setLoading(false); // set loading back to false after the API call is completed
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
            <Select showSearch>
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
            <Select showSearch options={majorOptions} />
          </Form.Item>

          <Button
            type="primary"
            className="form-btn search-btn"
            htmlType="submit"
          >
            بـحـث
          </Button>
        </Form>
      </header>
      <main>
        {!filtered ? (
          <Suspense fallback={<Spinner />}>
            <Await
              resolve={postsData?.posts}
              errorElement={<p>Error loading blog posts.</p>}
            >
              {(loadedPosts) => <PostList posts={loadedPosts} />}
            </Await>
          </Suspense>
        ) : (
          <PostList posts={postsData} />
        )}
      </main>
    </div>
  );
};

export default TrainingOpportunities;

export function postsLoader() {
  return defer({ posts: getPosts() });
}
