import { Button, Input } from "antd";
import React from "react";
import TableFilterSelect from "../TableFilterSelect";
import "./FilterSearch.scss";

const FilterSearch = ({
  setStatusFilter,
  setSearchName,
  handleFilterSearch,
  isSupervisor,
}) => {
  return (
    <div className='filter-container'>
      <span className="filter-text">تصفية على حسب: </span>

      <Input
        placeholder="إسم الطالب"
        onChange={(e) => setSearchName(e.target.value)}
        className="search-input"
      />
      <TableFilterSelect
        setStatusFilter={setStatusFilter}
        className="filter-select"
      />

      <Button onClick={handleFilterSearch} className="search-btn">
        بحث
      </Button>
    </div>
  );
};

export default FilterSearch;
