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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const labels = [];

const exampleData = {
  labels,
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
  const labels = generateLabels(chartData.firstUsageInstant, numPoints = 164);
}

const generateLabels = (start, numPoints) => {
  const day = moment("2022-09-08T20:00:00Z", "DD-MM-YYYY");;
  // CONT HERE const hour = startDate.hour();
}

export function Chart(props) {
  const data = transformData(props.chartData);

  return <Line options={options} data={data} />;
}
