import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import playerData from './playerData.json';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const labels = ["Strike Rate", "Average", "Fours/10b", "Sixes/10b", "Dot Ball %", "Boundary %"];
const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#F67019', '#00A36C'];

const RadarChartComponent = ({ selectedPlayers }) => {
  const datasets = selectedPlayers.map((player, idx) => {
    const stats = playerData[player];

    return {
      label: player,
      data: labels.map(label => stats[label]),
      fill: true,
      backgroundColor: `${colors[idx % colors.length]}33`, // Transparent fill
      borderColor: colors[idx % colors.length],
      pointBackgroundColor: colors[idx % colors.length],
      tension: 0.2,
    };
  });

  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 160,
        ticks: {
          beginAtZero: true,
          backdropColor: 'transparent',
        },
        pointLabels: {
          font: { size: 14 }
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChartComponent;
