import * as React from 'react';
import { Card, Link, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
// Mr.Ted import library of date time and form
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../../../components/Iconify';
import NewCampaignForm from 'src/sections/@dashboard/blog/NewCampaignForm.js';
import Label from 'src/components/Label';
import KietNewInterviewForm from './KietNewInterviewForm';
// Kiet uses  forkmik

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
};

export default function KietInterviewModal({id}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button onClick={handleOpen}>
                <Label variant="ghost" color='error' onClick={handleOpen}>
                    No
                </Label>
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style}>
                    <KietNewInterviewForm id={id} open={open} onClose={() => setOpen(false)} />
                </Card>
            </Modal>
        </div>
    );
}
