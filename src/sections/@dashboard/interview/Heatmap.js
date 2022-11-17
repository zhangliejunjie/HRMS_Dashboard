import { Box, Button, ButtonGroup, Card, CardHeader, Stack, Typography } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import HeatmapModal from './HeatmapModal';

export default function Heatmap({ isLoad }) {
  // get current date of week
  let curr = moment(); // get current date
  // create week state, change when click next or previous
  const [firstDay, setFirstDay] = useState(moment(curr).startOf('week').format('DD-MM-YYYY'));
  const [week, setWeek] = useState(moment(curr).isoWeek());
  const [room, setRoom] = useState(0);
  const [slot, setSlot] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickHeatmap = (room, slot) => {
    setRoom(room);
    setSlot(slot);
    setIsOpen(true);
  };

  const handlePreviousWeek = () => {
    setFirstDay(moment(firstDay, 'DD-MM-YYYY').subtract(7, 'd').format('DD-MM-YYYY'));
    setWeek(week - 1);
  };

  const handleNextWeek = () => {
    setFirstDay(moment(firstDay, 'DD-MM-YYYY').add(7, 'd').format('DD-MM-YYYY'));
    setWeek(week + 1);
  };

  // get data for heatmap by room and week
  const [heatmapData, setHeatmapData] = useState([]);
  React.useEffect(() => {
    async function fetchNumCandidatesByRoomWeek() {
      const { data } = await axios.post('http://localhost:8000/api/interview/by-room-week', {
        week: week,
      });
      setHeatmapData(data);
    }

    fetchNumCandidatesByRoomWeek();
  }, [isLoad, week]);

  const dataSeries = [...Array(4)].map((_, week_num) => ({
    week_num: week_num + week,
    value: heatmapData,
  }));

  // find series base on week num
  const findSeries = () => {
    return dataSeries?.find((data) => data.week_num === week)?.value;
  };

  // state for opening modal when click to heatmap
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
    series: findSeries(),
    options: {
      chart: {
        height: 350,
        type: 'heatmap',
        events: {
          click: function (event, charContext, config) {
            handleClickHeatmap(config.seriesIndex + 1, config.dataPointIndex + 1);
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#008FFB'],
      labels: labels,
    },
  };

  return (
    <Card>
      <CardHeader subheader={'Click to see meeting details'} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <div id="chart">
          <ReactApexChart options={state.options} series={state.series} type="heatmap" height={350} />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography>{`Week: ${firstDay} - ${moment(firstDay, 'DD-MM-YYYY')
              .add(6, 'd')
              .format('DD-MM-YYYY')}`}</Typography>
            <ButtonGroup variant="outlined">
              <Button onClick={handlePreviousWeek}>Previous</Button>
              <Button onClick={handleNextWeek}>Next</Button>
            </ButtonGroup>
          </Stack>
          <HeatmapModal isOpen={isOpen} handleClose={() => handleClose()} week={week} room={room} slotPos={slot} />
        </div>
      </Box>
    </Card>
  );
}
