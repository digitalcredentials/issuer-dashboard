import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { notifyAll } from '@/app/lib/email/notify';

import {
  CheckIcon,
  TagIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

export default function NotifySelectedModal({selectedRows, disabled}:{selectedRows:any, disabled: boolean}) {

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNotify = () => {
    const credentialIds = selectedRows.map((row:any)=>row.original.id)
    notifyAll(credentialIds)
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Button disabled={disabled} variant="outlined" onClick={handleClickOpen}>
        Notify Selected
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Notify Recipients of Selected Credentials</DialogTitle>
        <DialogContent>
          <DialogContentText>
            IMPORTANT: ALL of the recipients of the selected credentials will be sent an email
             telling them they have credentials available to collect, with a link to collect them.
          </DialogContentText>
          TODO: add text area to allow including a specific message.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleNotify}>
            Send the Emails!
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
