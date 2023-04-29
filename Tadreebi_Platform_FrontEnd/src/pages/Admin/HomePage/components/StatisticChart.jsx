import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Select, notification } from "antd";
import "./StatisticChart.scss";
import Spinner from "../../../../components/ui/Spinner/Spinner";
import { useAdminDashboard } from "../../../../util/api";
import { useYearState } from "../../../../util/helpers";

const StatisticChart = ({ years, currentYear }) => {
  const { data, loading, error } = useAdminDashboard("chart", years);
  const { handleYearChange } = useYearState();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  const chartData = data.map(({ university, total_applications }) => ({
    name: university,
    value: total_applications,
  }));

  const option = {
    title: {
      text: "احصائيات بناء على الجامعات",
      subtext: "",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      bottom: "bottom",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: chartData,
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
        option={option}
        echarts={echarts}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: "210px", width: "100%" }}
      />
    </div>
  );
};

export default StatisticChart;
