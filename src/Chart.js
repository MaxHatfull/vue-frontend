import React from 'react';
import moment from 'moment';
import "./Chart.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const lineColors = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
]

export const options = {
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
    }
  }
};

const transformData = (chartDatas, channelNames) => {
    console.log(chartDatas)
    var labels = []
    if(chartDatas.length !== 0)
    {
        labels = generateLabels(chartDatas[0].firstUsageInstant, 164);
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
    const s = moment(start)
    return [...Array(numPoints).keys()].map((v) => {
        const newTime = s;
        newTime.add(1, 'hours');
        return newTime.toISOString();
    })
}

export function Chart(props) {
    const data = transformData(props.chartData, props.channelNames);

    return <Line options={options} data={data}/>;
}
