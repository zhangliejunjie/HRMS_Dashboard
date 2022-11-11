import * as React from 'react';
import { useRef, useState } from 'react';
import { Menu, IconButton } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
// Kiet import Modal 
import CategoryDeleteAlertDialog from './CategoryDeleteAlertDialog';
import CategoryModalEditor from './CategoryModalEditor';

// ----------------------------------------------------------------------

export default function CategoryUserMoreMenu({ post }) {
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
        <CategoryDeleteAlertDialog news={post} />
        <CategoryModalEditor news={post} openMoreMenu={open} onClose={() => setIsOpen(false)} />

      </Menu>
    </>
  );
}
