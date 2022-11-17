import { Box, List, ListItem, Modal, Stack, Card, Typography, Chip } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import Label from 'src/components/Label';
import { login } from 'src/store/slice/staffSlice';
import { getDateOfISOWeek } from 'src/utils/tool';

export default function HeatmapModal({ isOpen, handleClose, week, room, slotPos }) {
  const [candidateList, setCandidateList] = useState([]);

  const date = moment(getDateOfISOWeek(week, slotPos), 'MM/DD/YYYY');
  const slot = slotPos % 4 === 0 ? 4 : slotPos % 4;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // boxShadow: 24,
    p: 4,
  };

  React.useEffect(() => {
    async function fetchCandidateList() {
      const { data } = await axios.post('http://localhost:8000/api/interview/candidates-by-slot', {
        date: moment(date, 'MM/DD/YYYY').format('YYYY-MM-DD HH:mm:ss'),
        room: room,
        slot: slot,
      });
      setCandidateList(data);
    }
    fetchCandidateList();
  }, [isOpen]);
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Stack spacing={3}>
            <Typography variant="h3"> Interview Details </Typography>
            {candidateList?.map((candidate, index) => (
              <Stack spacing={1}>
                <Chip
                  sx={{
                    fontWeight: 'bold',
                  }}
                  color="primary"
                  variant="outlined"
                  label={candidate?.fullname}
                />
                <Chip
                  sx={{
                    fontWeight: 'bold',
                  }}
                  color="primary"
                  label={candidate?.name}
                  variant="outlined"
                />
                <Label
                  variant="filled"
                  color="info"
                  sx={{
                    zIndex: 9,
                    top: 16,
                    right: 16,
                    position: 'absolute',
                    textTransform: 'uppercase',
                  }}
                >
                  {'On going'}
                </Label>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2" noWrap>
                    Room: {room === 9 ? <a href={candidate?.start_url}>Online</a> : room}
                  </Typography>
                  <Typography variant="body1">Date: {moment(date).format('DD-MM-YYYY')}</Typography>
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{
                      color: 'text.disabled',
                    }}
                  >
                    Slot: {slot}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Card>
      </Modal>
    </div>
  );
}
