import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import Iconify from 'src/components/Iconify';
import axios from 'axios';
import { identity } from 'lodash';

export default function CampaignDeleteAlertDialog({ news }) {

    const [open, setOpen] = React.useState(false);
    const [openDialog, setDialogOpen] = React.useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (id) => {
        const deleteCampaign = async () => {
            await axios.patch(`http://localhost:8000/api/campaign-update`,
                {
                    id: id,
                    status: "Finished",
                })
        }
        deleteCampaign();
        console.log('Meowwwwwwwwww');
    };


    return (
        <div>

            <MenuItem onClick={() => {
                handleOpen()
            }} sx={{ color: 'text.secondary' }}>
                <ListItemIcon>
                    <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>

            <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure to delete " + news.title + "?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This campaign will be unable to see.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleDelete(news.id)} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
