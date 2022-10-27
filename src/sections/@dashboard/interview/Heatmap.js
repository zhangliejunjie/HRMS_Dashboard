import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import InterviewModal from './InterviewModal';

export default function Heatmap() {
  const [isOpen, setIsOpen] = useState(false);
  const [slot, setSlot] = useState({
    room: 'room1',
    time: 'Mon slot 1',
  });
  const labels = [
    'Mon slot 1',
    'Mon slot 2',
    'Mon slot 3',
    'Mon slot 4',
    'Tue slot 1',
    'Tue slot 2',
    'Tue slot 3',
    'Tue slot 4',
    'Wed slot 1',
    'Wed slot 2',
    'Wed slot 3',
    'Wed slot 4',
    'Thu slot 1',
    'Thu slot 2',
    'Thu slot 3',
    'Thu slot 4',
    'Fri slot 1',
    'Fri slot 2',
    'Fri slot 3',
    'Fri slot 4',
    'Sat slot 1',
    'Sat slot 2',
    'Sat slot 3',
    'Sat slot 4',
  ];
  const state = {
    series: [
      {
        name: 'room1',
        data: generateData(24, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'room2',
        data: generateData(24, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'room3',
        data: generateData(24, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'room4',
        data: generateData(24, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'room5',
        data: generateData(24, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'room6',
        data: generateData(24, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'room7',
        data: generateData(24, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'room8',
        data: generateData(24, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'room9',
        data: generateData(24, {
          min: 0,
          max: 90,
        }),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'heatmap',
        events: {
          click: (event, chartContext, config) => {
            console.log(config);
            setIsOpen(true);
            setSlot({
              room: 'room' + (config.seriesIndex + 1),
              time: labels[config.dataPointIndex],
            });
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#008FFB'],
      title: {
        text: 'HeatMap Chart (Single color)',
      },
      labels: labels,
    },
  };

  const hanldeClose = () => {
    setIsOpen(false);
  };

  return (
    <div id="chart">
      <ReactApexChart options={state.options} series={state.series} type="heatmap" height={350} />
      <InterviewModal
        open={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
        value={slot}
      />
    </div>
  );
}

const generateData = (len, rangeObj) => {
  return Array.from({ length: len }, () => Math.floor(Math.random() * rangeObj.max));
};
