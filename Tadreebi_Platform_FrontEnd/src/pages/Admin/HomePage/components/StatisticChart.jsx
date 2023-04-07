import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Select } from "antd";
import "./StatisticChart.scss";
const StatisticChart = () => {
  const option = {
    title: {
      text: "احصائيات بناء على الجامعات",
      subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const currentYear = new Date().getFullYear();
  const [years, setYears] = useState(() => {
    const yearsArr = [];
    for (let year = currentYear; year >= 2010; year--) {
      yearsArr.push(year);
    }
    return yearsArr;
  });

  return (
    <div className="ChartConteinerfilter">
      <div>
        <Select
          style={{ flexGrow: "2" }}
          defaultValue="اختر السنة"
          className="filter"
        >
          {years.map((year, index) => (
            <Select.Option key={index} value={year}>
              {year}
            </Select.Option>
          ))}
        </Select>
      </div>

      <ReactECharts
        option={option}
        echarts={echarts}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: "400px" }}
      />
    </div>
  );
};

export default StatisticChart;
