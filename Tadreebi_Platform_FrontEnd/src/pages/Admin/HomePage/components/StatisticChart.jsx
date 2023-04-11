import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Select, notification } from "antd";
import "./StatisticChart.scss";
import Spinner from "../../../../components/ui/Spinner/Spinner";
import { useFetch } from "../../../../data/API";
const StatisticChart = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8000/getAllStudentsData"
  );
  const currentYear = new Date().getFullYear();
  const [years, setYears] = useState(() => {
    const yearsArr = [];
    for (let year = currentYear; year >= 2023; year--) {
      yearsArr.push(year);
    }
    return yearsArr;
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return notification.error(error);
  }

  const chartData = data.map(({ university, totalApplicant }) => ({
    name: university,
    value: totalApplicant,
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
        style={{ height: "210px", width: "100%" }}
      />
    </div>
  );
};

export default StatisticChart;
