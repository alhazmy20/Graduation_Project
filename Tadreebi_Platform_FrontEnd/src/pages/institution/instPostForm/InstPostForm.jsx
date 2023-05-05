import React, { Suspense, useState } from "react";
import { Button, Col, Row, Form, notification } from "antd";
import ReactTextArea from "./components/ReactTextArea";
import "../instPostForm/InstPostForm.scss";
import ReactRadio from "./components/ReactRadio.jsx";
import MultiSelect from "./components/MultiSelect .jsx";
import CustomDatePicker from "./components/CustomDatePicker.jsx";
import axiosConfig from "../../../util/axiosConfig.js";
import { Await, useLoaderData, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner/Spinner.jsx";
import {
  useFormPostData,
  formatFormValues,
  radioOptionsType,
  radioOptionsReward,
  radioOptionsGender,
  options,
} from "./FormPostAttachment.js";
import ReactInput from "./components/ReactInput.jsx";
import RegionSelect from "../../../components/form/RegionSelect.jsx";
import CitySelect from "../../../components/form/CitySelect.jsx";

const InstPostForm = () => {
  const { id } = useParams();
  const opportunityData = useLoaderData();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [formPostData, setFormPostData] = useFormPostData();
  const handleRegionChange = (value) => {
    setSelectedRegion(value);
  };
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleFormChange = (changedValues, allValues) => {
    const formattedValues = formatFormValues(allValues);
    setFormPostData((prevState) => ({
      ...prevState,
      ...formattedValues,
    }));
    setIsFormChanged(
      Object?.keys(changedValues).some(
        (key) => allValues[key] !== (opportunityData?.[key] || "")
      )
    );
  };

  const onFinish = async (value) => {
    //api code

    try {
      if (id) {
        // if ID exists, update the post
        await axiosConfig().put(`api/posts/${id}`, formPostData);
        notification.success({ message: "تم تحديث الفرصة بنجاح" });
        setIsFormChanged(false);
      } else {
        await axiosConfig().post(`api/posts`, formPostData);
        notification.success({ message: "تمت إضافة الفرصة  بنجاح" });
        setIsFormChanged(false);
      }
      setLoading(false);
      navigate("/institution/posts");
    } catch (error) {
      console.log(error);
      notification.error({ message: "فشل تحديث البيانات" });
    }
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={opportunityData?.post}
        errorElement={<p>Error loading blog posts.</p>}
      >
        {(loadedPost) => (
          <div className="institution-NewPostCont">
            <div className="pagePostTitle">
              <span className="TitleName"> إضافة فرصة تدريبية</span>
            </div>
            <div className="postfromConteiner">
              <Form
                onValuesChange={handleFormChange}
                onFinish={onFinish}
                className="form"
                form={form}
              >
                <Col>
                  <ReactInput name="title" initialValue={loadedPost?.title} />
                </Col>
                <Col style={{ textAlign: "left" }}>
                  <ReactTextArea
                    name="content"
                    initialValue={loadedPost?.content}
                  />
                </Col>
                <Row className="formInputContainer">
                  <Col className="InputsContainer">
                    <Row className="RowDivElment">
                      <label className="label">نوع البرنامج التدريبي: </label>
                      <ReactRadio
                        name="t_type"
                        options={radioOptionsType}
                        initValue={loadedPost?.t_type}
                      />
                    </Row>

                    <Row className="RowDivElment">
                      <label className="label">المنطقة: </label>
                      {/*<SelectRegion
                        name="region"
                        options={RegionData}
                        initValue={loadedPost?.region}
                        valueChnage={handleRegionChange}
        />*/}
                      <RegionSelect
                        onChange={handleRegionChange}
                        className="formItemStyle"
                        placeholder="اختر المنطقة"
                        initialValue={loadedPost?.region}
                      />
                    </Row>
                    <Row className="RowDivElment">
                      <label className="label">تاريخ البدء: </label>
                      <CustomDatePicker
                        name="t_startDate"
                        label="تاريخ بدء التدريب"
                        required={true}
                        initValue={loadedPost?.t_startDate}
                      />
                    </Row>
                    <Row className="RowDivElment">
                      <label className="label">تاريخ انتهاء الإعلان: </label>
                      <CustomDatePicker
                        name="p_endDate"
                        label="تاريخ انتهاء الإعلان"
                        required={true}
                        initValue={loadedPost?.p_endDate}
                      />
                    </Row>
                  </Col>

                  <Col className="InputsContainer">
                    <Row className="RowDivElment">
                      <label className="label">مكافأة: </label>
                      <ReactRadio
                        name="reward"
                        options={radioOptionsReward}
                        initValue={
                          loadedPost?.reward === "يوجد"
                            ? 1
                            : loadedPost?.reward === "لا يوجد"
                            ? 0
                            : undefined
                        }
                      />
                    </Row>

                    <Row className="RowDivElment">
                      <label className="label">المدينة: </label>
                      {/*<SelectCity
                        data={RegionData}
                        formDate={selectedRegion}
                        initValue={loadedPost?.city}
                      />*/}
                      <CitySelect
                        selectedRegion={selectedRegion}
                        className="formItemStyle"
                        placeholder="اختر المدينة"
                        initialValue={loadedPost?.city}
                        region={loadedPost?.region}
                      />
                    </Row>

                    <Row className="RowDivElment">
                      <label className="label">تاريخ الإنتهاء: </label>
                      <CustomDatePicker
                        name="t_endDate"
                        label="تاريخ إنتهاء التدريب"
                        required={true}
                        initValue={loadedPost?.t_endDate}
                      />
                    </Row>

                    <Row className="RowDivElment">
                      <label className="label">الجنس: </label>
                      <ReactRadio
                        name="gender"
                        options={radioOptionsGender}
                        initValue={
                          loadedPost?.gender === "ذكر"
                            ? 0
                            : loadedPost?.gender === "انثى"
                            ? 1
                            : loadedPost?.gender === "الكل"
                            ? 2
                            : undefined
                        }
                      />
                    </Row>
                  </Col>

                  <Row className="RowDivElment">
                    <label className="label">التخصص: </label>
                    <MultiSelect
                      name="majors"
                      label="التخصصات"
                      options={options}
                      initValue={options.filter((option) =>
                        loadedPost?.post_majors.some(
                          (postMajor) => postMajor.major === option.major
                        )
                      )}
                    />
                  </Row>
                </Row>
                <div className="addbuttonContainer">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="add-button"
                    disabled={!isFormChanged}
                    loading={loading}
                  >
                    {loading ? "جاري الإضافة..." : "اضافة"}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default InstPostForm;
