import React from 'react';
import moment from 'moment';
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
    plugins: {
        legend: {
            labels: {
                color: 'rgb(255, 255, 255)'
            }
        },
        scales: {
            xAxes: {
                ticks: {
                    color: 'green'
                },
            }
        }
    }
};

const exampleData = {
    datasets: [
        {
            label: 'Dataset 1',
            // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ],
};

const transformData = (chartData) => {
    //turns chartData into the format needed, following exampleData's format
    // 1. generate labels
    const labels = generateLabels(chartData.firstUsageInstant, 164);
    console.log(chartData)
    console.log(labels)
    return {
        labels: labels,
        datasets: [
            {
                label: "data",
                borderColor: 'rgb(255, 99, 132)',
                data: chartData["usageList"]
            }
        ]
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
