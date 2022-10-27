import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function InterviewModal({ open, handleClose }) {
  const [value, setValue] = useState(moment());
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const slotArr = [...Array(4).keys()];
  const [slot, setSlot] = useState('');
  const handleChangeSlot = (event) => {
    setSlot(event.target.value);
  };

  const roomArr = [...Array(9).keys()];
  const [room, setRoom] = useState('');
  const handleChangeRoom = (event) => {
    setRoom(event.target.value);
  };

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
                {/* {value.room} */}
                aaaa
              </Typography>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/DD/YYYY"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Slot</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={slot}
                  onChange={handleChangeSlot}
                  autoWidth
                  label="Slot"
                >
                  {slotArr.map((value) => (
                    <MenuItem value={value + 1}>{value + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Room</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={room}
                  onChange={handleChangeRoom}
                  autoWidth
                  label="Age"
                >
                  {roomArr.map((value) => (
                    <MenuItem value={value + 1}>{value + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit">Submit</Button>
            </CardContent>
          </CardActionArea>
        </Card>
      </Modal>
    </div>
  );
}