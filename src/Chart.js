import React from 'react';
import "./Chart.css";
import dayjs from 'dayjs';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale
);

const lineColors = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
]

export const options = {
  plugins: {
    legend: {
      labels: {
        color: "white",
        boxHeight: 3,
      }
    }
  },
  scales: {
    xAxes: {
      title: {
        display: true,
        text: "DATE AND TIME",
        color: 'white',
        padding: 20,
      },
      ticks: {
        color: 'white',
      },
    },
    yAxes: {
      title: {
        display: true,
        text: "ENERGY USAGE (KW)",
        color: "white",
        padding: 20,
      },
      ticks: {
        color: 'white'
      },
      type: "logarithmic"
    }
  }
};

const transformData = (chartDatas, channelNames) => {
    console.log(chartDatas)
    var labels = []
    if(chartDatas.length !== 0)
    {
        labels = generateLabels(chartDatas[0].firstUsageInstant, chartDatas[0].usageList.length);
    }

    return {
        labels: labels,
        datasets:
            chartDatas.map((chartData, index) => {
                return {
                    label: channelNames[index],
                    borderColor: lineColors[index],
                    data: chartData["usageList"]
                }
            })
    }
}

const generateLabels = (start, numPoints) => {
    const s = dayjs(start)
    return [...Array(numPoints).keys()].map((v) => {
      return s.add(v, 'hours').format("YYYY-MM-DD HH:MM");
    })
}

export function Chart(props) {
    const data = transformData(props.chartData, props.channelNames);

    return <Line options={options} data={data}/>;
}
