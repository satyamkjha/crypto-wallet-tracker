import React, { useEffect } from 'react'
import Header from '../components/Dashboard/Header'
import { useDispatch, useSelector } from 'react-redux';
import {  useSearchParams } from 'react-router-dom';
import { Typography, Container, Box, IconButton, Grid, Button, Fab, Stack } from '@mui/material';
// import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
// import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CreateNotification from '../components/Notifications/CreateNotification';
import EditNotification from '../components/Notifications/EditNotification';
import { getNotifications, getSlackIntegration, getTelegramIntegration, selectNotifications, sendSlackCode, updateOpenCreateNotificationDialog, updateOpenEditNotificationDialog, updateSelectedNotification } from '../redux/slices/notificationSlice';
import TelegramIntegrationDialog from '../components/Notifications/TelegramIntegrationDialog';
import { getPlanStats, selectPlanStats } from '../redux/slices/dashboardSlice';
import { assetsURL } from '../utils/assetsURL';


export default function Notifications() {
    const dispatch = useDispatch()
    const notifications = useSelector(selectNotifications)
    const [searchParams] = useSearchParams()
    const planStats = useSelector(selectPlanStats)

    useEffect(() => {
        dispatch(getNotifications())
        dispatch(getSlackIntegration())
        dispatch(getTelegramIntegration())
        dispatch(getPlanStats())
        if (searchParams.get('code')) {
            let code = searchParams.get('code')
            dispatch(sendSlackCode({ code: code }))
        }
    }, [])

    return (
        <>
            <Header selectedMenu={2} />

            <Container maxWidth='95vw' sx={{ marginTop: 5, maxWidth: '1800px', width: '95vw' }}>
                <Box pb={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='h5'>Enabled Notifications</Typography>

                    <Typography variant='subtitle1' color='text.secondary'>Notifications Remaining : <span style={{ color: 'black', fontWeight: 'bold' }}>{planStats.remaining_notifications}</span>
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {
                        notifications.map((notification, index) => {
                            return <Grid item sm={6} md={4} lg={3} xs={12}>
                                <Box
                                    p={3}
                                    pb={2}
                                    sx={{
                                        minHeight: '100%',
                                        border: 'solid',
                                        borderWidth: 1,
                                        borderRadius: 1,
                                        borderColor: '#d6d6d6',
                                        marginBottom: 2
                                    }}
                                >
                                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Address {index + 1}</Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center' }} mb={2}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '90%' }}>
                                            <Typography variant='body2' sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word', maxWidth: '100%' }}>{notification.address}</Typography>
                                        </Box>

                                        <IconButton onClick={() => { navigator.clipboard.writeText(notification.address) }}>
                                            <ContentCopyIcon sx={{ color: 'text.secondary', maxWidth: '1rem' }} />
                                        </IconButton>
                                    </Box>

                                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Channels</Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} mt={1}>
                                        <Stack spacing={1} direction='row'>
                                            {
                                                notification.email_for_notification && notification.email_for_notification != '' && <Box
                                                    component="img"
                                                    sx={{
                                                        marginRight: 1,
                                                        height: 32,
                                                        width: 32,
                                                        maxHeight: 32,
                                                        maxWidth: 32,
                                                    }}
                                                    alt="ethereum"
                                                    src={`${assetsURL}email.png`}
                                                />
                                            }

                                            {
                                                notification.slack_channel_for_notification && notification.slack_channel_for_notification != '' && <Box
                                                    component="img"
                                                    sx={{
                                                        marginRight: 1,
                                                        height: 30,
                                                        width: 30,
                                                        maxHeight: 30,
                                                        maxWidth: 30,
                                                    }}
                                                    alt="ethereum"
                                                    src={`${assetsURL}slack.png`}
                                                />
                                            }

                                            {
                                                notification.telegram_chat_id && notification.telegram_chat_id != '' && <Box
                                                    component="img"
                                                    sx={{
                                                        marginRight: 1,
                                                        height: 32,
                                                        width: 32,
                                                        maxHeight: 32,
                                                        maxWidth: 32,
                                                    }}
                                                    alt="ethereum"
                                                    src={`${assetsURL}Telegram.png`}
                                                />
                                            }
                                        </Stack>

                                        <Button variant='outlined' onClick={() => { dispatch(updateSelectedNotification(notification)); dispatch(updateOpenEditNotificationDialog(true)) }}>Edit</Button>
                                    </Box>

                                </Box>
                            </Grid>
                        })
                    }

                    {
                        planStats?.remaining_notifications > 0 && <Grid item sm={6} md={4} lg={3} xs={12}>
                            <Button
                                p={2}
                                onClick={() => { dispatch(updateOpenCreateNotificationDialog(true)) }}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    minHeight: '12rem',
                                    // maxHeight: '13.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 'solid',
                                    borderWidth: 1,
                                    borderRadius: 1,
                                    borderColor: '#d6d6d6',
                                    marginBottom: 2
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Fab
                                        pt={0.5}
                                        sx={{
                                            marginRight: 1,
                                            backgroundColor: '#f0f0f0',
                                            boxShadow: 'none',
                                            borderRadius: 0.5,
                                            maxHeight: '2rem',
                                            maxWidth: '2rem',
                                            minHeight: '2rem',
                                            minWidth: '2rem'
                                        }}
                                    >
                                        <AddIcon sx={{ fontSize: '1.5rem' }} />
                                     </Fab>
                                    <Typography sx={{ fontWeight: 'bold' }}>Add Address For Monitoring</Typography>
                                </Box> 

                            </Button>
                        </Grid>
                    }


                </Grid>
            </Container>

            <CreateNotification />
            <EditNotification />
            <TelegramIntegrationDialog />
        </>
    )
}
