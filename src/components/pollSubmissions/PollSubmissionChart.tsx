import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

// export const data = [
//   ["Task", "Hours per Day"], 
//   ["Work", 11],
//   ["Eat", 2],
//   ["Commute", 2],
//   ["Watch TV", 2],
//   ["Sleep", 7], // CSS-style declaration
// ];

export const options = {
  title: "",
  pieHole: 0.4,
  is3D: false,
  minValue: 0,
  sliceVisibilityThreshold: 0
};

export function PollSubmissionChart(props: any) {
  const { graphData} = props
  const [finalData, setFinalData] = useState([])

  useEffect(() => {
    const data:any = [["Total", "Submissions"]]
    graphData.forEach((item: any) => {
       data.push([item.key, item.value === 0 ? 0 : item.value])
    })

    setFinalData(data)

  }, [graphData])

  return (
    <>
    {console.log("!! finalData:", finalData)}
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      // data={data}
      data={finalData}
      options={options}
    />
    </>
  );
}
