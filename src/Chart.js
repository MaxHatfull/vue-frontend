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

const transformData = (chartDatas) => {
    console.log(chartDatas)
    var labels = []
    if(chartDatas.length !== 0)
    {
        labels = generateLabels(chartDatas[0].firstUsageInstant, 164);
    }

    return {
        labels: labels,
        datasets:
            chartDatas.map(chartData => {
                return {
                    label: "data",
                    borderColor: 'rgb(255, 99, 132)',
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
    const data = transformData(props.chartData);

    return <Line options={options} data={data}/>;
}
