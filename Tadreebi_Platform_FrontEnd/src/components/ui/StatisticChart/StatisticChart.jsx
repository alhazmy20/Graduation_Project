import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Select } from "antd";
import "./StatisticChart.scss";
import { useYearState } from "../../../util/helpers";

const StatisticChart = ({ years, currentYear, lable, setData, type }) => {
  const { handleYearChange } = useYearState();

  const pie = {
    title: {
      text: lable,
      subtext: "",
      left: "center",
      textStyle: {
        fontSize: 24, // Set the font size to 24
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      bottom: "bottom",
      textStyle: {
        fontSize: 16, // Set the font size to 16
      },
    },

    series: [
      {
        name: "Access From",
        type: type,
        radius: "50%",
        data: setData,
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
  const bar = {
    title: {
      text: lable,
      left: "center",
      textStyle: {
        fontSize: 24, // Set the font size to 24
      },
    },
    tooltip: {
      trigger: "item",
    },
    xAxis: {
      data: setData.map((item) => item.name),
      axisLabel: {
        fontSize: 17,
      },
    },
    yAxis: [
      {
        type: "value",
        interval: 10,
      },
    ],
    series: [
      {
        type: "bar",
        data: [
          {
            value: setData[0]?.value,
            itemStyle: { color: "#E06666" },
          },
          {
            value: setData[1]?.value,
            itemStyle: { color: "#93C47D" },
          },
          {
            value: setData[2]?.value,
            itemStyle: { color: "#F6B26B" },
          },
        ],
        showBackground: true,
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
  return (
    <div className="ChartConteinerfilter">
      <div>
        <Select
          style={{ flexGrow: "2" }}
          defaultValue={currentYear}
          onChange={handleYearChange}
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
        option={type === "pie" ? pie : bar}
        echarts={echarts}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: "210px", width: "100%" }}
      />
    </div>
  );
};

export default StatisticChart;
