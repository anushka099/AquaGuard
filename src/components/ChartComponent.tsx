import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  title: string;
  labels: string[];
  data: number[];
  type: 'line' | 'bar';
  color: string;
}

const ChartComponent: React.FC<ChartProps> = ({ title, labels, data, type, color }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: color,
        backgroundColor: `${color}33`, // Add transparency to color
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: title },
    },
  };

  return type === 'line' ? (
    <Line data={chartData} options={options} />
  ) : (
    <Bar data={chartData} options={options} />
  );
};

export default ChartComponent;

