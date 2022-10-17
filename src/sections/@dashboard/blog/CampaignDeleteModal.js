// import * as React from 'react';
// import { Card, Link, Container, Typography } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// // Mr.Ted import library of date time and form
// import TextField from '@mui/material/TextField';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { useState } from 'react';
// import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';
// import Iconify from '../../../components/Iconify';
// import NewCampaignForm from 'src/sections/@dashboard/blog/NewCampaignForm.js';
// import CampaignUpdateForm from './CampaignUpdateForm';
// import CampaignDeleteForm from './CampaignDeleteForm';
// // Kiet uses  forkmik

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     boxShadow: 24,
//     p: 4,
// };

// export default function CampaignDeleteModal({ news }) {
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     return (
//         <div>

//             <MenuItem onClick={() => {
//                 handleOpen()
//             }} sx={{ color: 'text.secondary' }}>
//                 <ListItemIcon>
//                     <Iconify icon="eva:trash-2-outline" width={24} height={24} />
//                 </ListItemIcon>
//                 <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
//             </MenuItem>

//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Card sx={style}>
//                     <CampaignDeleteForm news={news} />
//                 </Card>
//             </Modal>
//         </div>
//     );
// }

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CampaignDeleteAlertDialog({ news }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
