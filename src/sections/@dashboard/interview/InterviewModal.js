import { Box, Card, CardActionArea, CardContent, List, ListItem, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

export default function InterviewModal({ open, handleClose, value }) {
  const [candidatesNotInterview, setCandidatesNotInterview] = useState([]);
  React.useEffect(() => {
    async function fetchCandidatesNotInterview() {
      const data = await axios.get('http://localhost:8000/api/interview/not-interview');
      setCandidatesNotInterview(data);
    }

    fetchCandidatesNotInterview();
  }, []);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {value.room}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {value.time}
              </Typography>
              <List>
                {candidatesNotInterview.map((candidate, index) => (
                  <ListItem>{candidate.id}</ListItem>
                ))}
              </List>
            </CardContent>
          </CardActionArea>
        </Card>
      </Modal>
    </div>
  );
}
