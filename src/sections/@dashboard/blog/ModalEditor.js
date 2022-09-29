import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// Kiet import library of date time and form
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalEditor() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value1, setValue1] = React.useState(null);
    const [value2, setValue2] = React.useState(null);
    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                {/* <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="standard-basic" label="Title" variant="standard" />
                    <TextField id="standard-basic" label="Description" variant="standard" />
                </Box> */}

                
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" label="Title" variant="standard" />
          <TextField id="standard-basic" label="Description" variant="standard" />
        </Box>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Start date"
                        value={value1}
                        onChange={(newValue) => {
                            setValue1(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                     </LocalizationProvider>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="End date"
                        value={value2}
                        onChange={(newValue) => {
                            setValue2(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
