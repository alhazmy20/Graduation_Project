import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Select, notification } from "antd";
import "./StatisticChart.scss";
import Spinner from "../Spinner/Spinner";
import { useDashboard } from "../../../util/api";
import { useYearState } from "../../../util/helpers";
import { useAuth } from "../../../auth/useContext";
const StatisticChart = ({ years, currentYear, lable }) => {
  const auth = useAuth();
  const isAdmin = auth?.user?.role;
  const { data, loading, error } = useDashboard("chart", isAdmin, years);
  const { handleYearChange } = useYearState();
  console.log(data);
  const chartData =
    isAdmin === "SuperAdmin"
      ? data?.map(({ university, totalApplications }) => ({
        name: university,
        value: totalApplications,
      }))
      : [
        { value: data?.applicationsApproved, name: "تم المواففة عليهم" },
        { value: data?.applicationsRejected, name: "تم الرفض" },
        {
          value: data?.applicationsWaitingToBeApproved,
          name: " بإنتظار الموافقة ",
        },
      ];

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  const option = {
    title: {
      text: lable,
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
