import { useState } from "react";
import { data } from "../../../data/SaudiClassification";
export const useFormPostData = () => {
  const [formPostData, setFormPostData] = useState({
    title: "",
    content: "",
    t_type: "",
    reward: "",
    gender: "",
    region: "",
    city: "",
    t_startDate: "",
    t_endDate: "",
    p_endDate: "",
    majors: [],
  });

  return [formPostData, setFormPostData];
};

export const formatDate = (dateValue) => {
  return new Date(dateValue).toISOString().slice(0, 10);
};
export const formatFormValues = (allValues, name) => {
  return Object.entries(allValues).reduce((acc, [key, value]) => {
    if (key.endsWith(name) && value) {
      acc[key] = formatDate(value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export const radioOptionsType = [
  { label: "حضوري", value: "حضوري" },
  { label: "عن بعد", value: "عن بعد" },
];

export const radioOptionsReward = [
  { label: "نعم", value: 1 },
  { label: "لا", value: 0 },
];

export const radioOptionsGender = [
  { label: "ذكر", value: 0 },
  { label: "انثى", value: 1 },
  { label: "الكل", value: 2 },
];

export const options = data
  .map((major) => {
    return major.majors.map((majorName) => ({
      label: majorName.title,
      value: majorName.id,
    }));
  })
  .flat();
