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

export const handlePaginationChange = (
  page,
  pageSize,
  loadedData,
  setCurrentRange,
  setPageSize
) => {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(start + pageSize - 1, loadedData.length);
  setCurrentRange([start, end]);
  setPageSize(pageSize);
};

export const dataFiltering = (data, statusFilter) => {
  const filteredDataSource = statusFilter
    ? data.filter((data) => data.status === statusFilter)
    : data;

  return filteredDataSource;
};

export const paginationText = (_, type, originalElement) => {
  if (type === "prev") {
    return <span className='pagenationText'>السابق</span>;
  }
  if (type === "next") {
    return <span className='pagenationText'>التالي</span>;
  }
  return originalElement;
};
