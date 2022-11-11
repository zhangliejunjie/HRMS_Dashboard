import * as React from 'react';
import { useRef, useState } from 'react';

// material
import { Menu, IconButton } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
// Kiet import Modal 
import CampaignModalEditor from './CampaignModalEditor';
import CampaignDeleteAlertDialog from './CampaignDeleteModal';

// ----------------------------------------------------------------------

export default function CampaignMoreMenu({ post }) {
    const ref = useRef(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
            </IconButton>

            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    sx: { width: 200, maxWidth: '100%' },
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <CampaignDeleteAlertDialog news={post} onClose={() => setIsOpen(false)} />

                <CampaignModalEditor news={post} onClose={() => setIsOpen(false)} />

            </Menu>
        </>
    );
}
