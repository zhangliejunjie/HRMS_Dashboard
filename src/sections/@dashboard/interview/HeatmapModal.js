import { Box, List, ListItem, Modal } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

export default function HeatmapModal({ isOpen, handleClose, week, room, slot }) {
  const [candidateList, setCandidateList] = useState([]);
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
    <Box>
      <Modal open={isOpen} onClose={handleClose}>
        <List>
          {candidateList.map((candidate, index) => (
            <ListItem>{candidate.fullname}</ListItem>
          ))}
        </List>
      </Modal>
    </Box>
  );
}
