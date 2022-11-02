import { Box, List, ListItem, Modal, Stack } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import Card from 'src/theme/overrides/Card';

export default function HeatmapModal({ isOpen, handleClose, week, room, slot }) {

  const [candidateList, setCandidateList] = useState([]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
  };

  React.useEffect(() => {
    async function fetchCandidateList() {
      const { data } = await axios.post('http://localhost:8000/api/interview/candidates-by-slot', {
        week: week,
        room: room,
        slot: slot,
      });
      setCandidateList(data);
    }
    fetchCandidateList();
  }, [week, room, slot]);
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <List>
          {candidateList?.map((candidate, index) => (
            <ListItem>{candidate?.fullname}</ListItem>
          ))}
        </List>
{/* 
        <Card sx={style}>
          Tim tai te
        </Card> */}

      </Modal>
    </div>
  );
}
