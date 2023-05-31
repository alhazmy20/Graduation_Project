import { Form } from "antd";
import React, { Suspense, useState } from "react";
import "./TrainingOpportunities.scss";
import PostList from "./components/PostList.jsx";
import { getAllPosts } from "../../../util/api.js";
import Spinner from "../../../components/ui/Spinner/Spinner.jsx";
import { useLoaderData, Await } from "react-router-dom";
import MajorsSelect from "../../../components/form/MajorsSelect.jsx";
import RegionSelect from "../../../components/form/RegionSelect.jsx";
import CitySelect from "../../../components/form/CitySelect.jsx";
import SubmitButton from "../../../components/form/SubmitButton.jsx";

const TrainingOpportunities = () => {
  const [postsData, setPostsData] = useState(useLoaderData());
  const [filtered, setFiltered] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [form] = Form.useForm();

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    form.setFieldsValue({ city: "كل المدن" });
  };

  const onFinish = async (values) => {
    const { region, city, major } = values;

    values.region = region === "كل المناطق" ? "" : region;
    values.city = city === "كل المدن" ? "" : city;
    values.major = major === "كل التخصصات" ? "" : major;

    try {
      setLoading(true); //NOTE set loading to true before making the API call
      const posts = await getAllPosts(values.region, values.city, values.major);
      setLoading(false);
      setPostsData(posts);
      setFiltered(true);
    } catch (err) {
      setLoading(false); // set loading back to false after the API call is completed
      console.log(err);
    }
  };

  return (
    <div className="trainingOpportunities">
      <header className="filterContainer">
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            region: "كل المناطق",
            city: "كل المدن",
            major: "كل التخصصات",
          }}
        >
          <h4>تصفية على حسب:</h4>
          <RegionSelect onChange={handleRegionChange} className="form-item" />
          <CitySelect selectedRegion={selectedRegion} className="form-item" />
          <MajorsSelect className="form-item" name="major" />
          <SubmitButton
            className="search-btn"
            loading={loading}
            disable={loading}
          >
            بحث
          </SubmitButton>
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
