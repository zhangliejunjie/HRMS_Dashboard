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
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../../../components/Iconify';
// Kiet imported 
import { RegisterForm } from 'src/sections/auth/register';

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

export default function JobModalEditor({open, onClose}) {
    
    const [value1, setValue1] = React.useState(null);
    const [value2, setValue2] = React.useState(null);
    return (
        <div>
            {/* <MenuItem onClick={handleOpen} sx={{ color: 'text.secondary' }}>
                <ListItemIcon>
                    <Iconify icon="eva:edit-fill" width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />

            </MenuItem> */}

            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            {/* onClick={handleOpen} */}
            
            <Modal
                open={open}
                onClose={onClose}
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
                        Job Editor
                    </Typography>
                    <RegisterForm />
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}
                </Box>
            </Modal>
        </div>
    );
}
