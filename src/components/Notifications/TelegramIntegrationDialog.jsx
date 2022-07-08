import { Fab, IconButton, Stack, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectopenTelegramNotificationsDialog, selectTelegramNotificationId, updateopenTelegramNotificationsDialog } from '../../redux/slices/notificationSlice';


export default function TelegramIntegrationDialog() {
    const openTelegramNotificationsDialog = useSelector(selectopenTelegramNotificationsDialog)
    const telegramNotificationId = useSelector(selectTelegramNotificationId)

    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(updateopenTelegramNotificationsDialog(false));
    };

    return (
        <Dialog
            open={openTelegramNotificationsDialog}
            onClose={handleClose}
        >
            <Box pt={5} textAlign='center'>
                <Fab sx={{ backgroundColor: '#2AABEE', marginBottom: 1 }} size="small">
                    <TelegramIcon sx={{ color: 'white' }} />
                </Fab>

                <Typography sx={{ fontSize: '1.5rem' }}>Enable Telegram<br />notifications</Typography>
            </Box>

            <DialogContent>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant='h6' color='text.secondary'>Step 1</Typography>
                        <Typography variant='body2'>Open our telegram bot by clicking on following link</Typography>
                        <a href="https://t.me/credshield_testbot" target="_blank">t.me/credshield_testbot</a>
                    </Box>

                    <Box>
                        <Typography variant='h6' color='text.secondary'>Step 2</Typography>
                        <Typography variant='body2'>Use following notification token to enable notifications</Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center' }} mt={1}>
                            <Box sx={{ width: '90%', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                                <Typography variant='caption'>{telegramNotificationId}</Typography>
                            </Box>

                            <Box ml={1}>
                                <IconButton onClick={() => { navigator.clipboard.writeText(telegramNotificationId) }}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
