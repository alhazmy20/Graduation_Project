import { message } from "antd";
import { useState } from "react";

export const displayMessage = (type, content) => {
  message[type](content);
};

export const useYearState = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [years, setYears] = useState(() => {
    const yearsArr = [];
    for (let year = currentYear; year >= 2023; year--) {
      yearsArr.push(year);
    }
    return yearsArr;
  });

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  return { currentYear, selectedYear, years, handleYearChange };
};
