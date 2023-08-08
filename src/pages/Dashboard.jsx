import { Typography, Container, Box, IconButton, Grid, Button, Fab, Stack, LinearProgress, Card } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateNewInvestigationDialog from '../components/Dashboard/CreateNewInvestigationDialog';
import Header from '../components/Dashboard/Header';
import { deleteInvestigation, getAllInvestigations, getPlanStats, selectInvestigations, selectPlanStats, selectPlanStatsLoading, updateOpenCreateInvestigationDialog } from '../redux/slices/dashboardSlice';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { chains } from '../utils/supportedChains';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import StyleIcon from '@mui/icons-material/Style';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CampaignIcon from '@mui/icons-material/Campaign';
import InvestigationCard from '../components/Dashboard/InvestigationCard';

export default function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const investigations = useSelector(selectInvestigations)
    const planStats = useSelector(selectPlanStats)
    const planStatsLoading = useSelector(selectPlanStatsLoading)

    useEffect(() => {
        dispatch(getAllInvestigations())
        dispatch(getPlanStats())
    }, [])

    return (
        <>
            <Header selectedMenu={0} />

            <Container maxWidth='80vw' sx={{ marginTop: 5, maxWidth: '80vw' }}>
                <Typography variant='h6' sx={{ marginBottom: 2 }}>Your Ongoing Investigations</Typography>

                <Grid container spacing={2}>
                    {
                        investigations.map(investigation => {
                            return <InvestigationCard investigation={investigation} />
                        })
                    }
                    

                    {
                        planStats?.remaining_investigations > 0 && <Grid item md={3} xs={12}>
                            <Button
                                p={2}
                                onClick={() => { dispatch(updateOpenCreateInvestigationDialog(true)) }}
                                sx={{
                                    width: '100%',
                                    height: '100%',
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
                                    <Typography sx={{ fontWeight: 'bold' }}>Add New Investigation</Typography>
                                </Box>

                            </Button>
                        </Grid>
                    }
                </Grid>

                <Typography variant='h6' sx={{ marginBottom: 2, marginTop: 5 }}>Your Configurations</Typography>

                <Grid container spacing={2}>
                    {/*  Ongoing investigations */}
                    <Grid item md={3} xs={12}>
                        <Box
                            p={3}
                            pb={0}
                            sx={{
                                minHeight: '100%',
                                border: 'solid',
                                borderWidth: 1,
                                borderRadius: 1,
                                borderColor: '#d6d6d6'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Fab sx={{ borderRadius: 1, boxShadow: 'none', marginRight: 2, backgroundColor: '#f5e6fe' }} size="medium">
                                    <FindInPageIcon sx={{ fontSize: '1.4rem', color: '#be63f9' }} />
                                </Fab>

                                <Typography variant='subtitle1' color='text.secondary'>Ongoing <br />Investigations</Typography>
                            </Box>

                            <Box p={1} pt={2}>
                                {
                                    planStatsLoading && <LinearProgress sx={{ maxWidth: '2rem' }} />
                                }

                                {
                                    !planStatsLoading && <Typography variant='h6' sx={{ marginBottom: 2 }}>{planStats?.ongoing_investigations}</Typography>
                                }
                            </Box>
                        </Box>
                    </Grid>

                    {/*  Active plans */}
                    <Grid item md={3} xs={12}>
                        <Box
                            p={3}
                            pb={0}
                            sx={{
                                minHeight: '100%',
                                border: 'solid',
                                borderWidth: 1,
                                borderRadius: 1,
                                borderColor: '#d6d6d6'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Fab sx={{ borderRadius: 1, boxShadow: 'none', marginRight: 2, backgroundColor: '#ffe6e2' }} size="medium">
                                    <StyleIcon sx={{ fontSize: '1.4rem', color: '#fc5b40' }} />
                                </Fab>

                                <Typography variant='subtitle1' color='text.secondary'>Active <br />Plans</Typography>
                            </Box>

                            <Box p={1} pt={2}>
                                {
                                    planStatsLoading && <LinearProgress sx={{ maxWidth: '2rem' }} />
                                }

                                {
                                    !planStatsLoading && <Typography variant='h4' sx={{ marginBottom: 2 }}>
                                        {planStats?.active_plans == 0 && 'Free'}
                                        {planStats?.active_plans == 1 && 'Beginner'}
                                        {planStats?.active_plans == 2 && 'Enterprise'}
                                    </Typography>
                                }
                            </Box>
                        </Box>
                    </Grid>

                    {/* Notifications enabled */}
                    <Grid item md={3} xs={12}>
                        <Box
                            p={3}
                            pb={0}
                            sx={{
                                minHeight: '100%',
                                border: 'solid',
                                borderWidth: 1,
                                borderRadius: 1,
                                borderColor: '#d6d6d6'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Fab sx={{ borderRadius: 1, boxShadow: 'none', marginRight: 2, backgroundColor: '#fff9dd' }} size="medium">
                                    <NotificationsIcon sx={{ fontSize: '1.4rem', color: '#ffd200' }} />
                                </Fab>

                                <Typography variant='subtitle1' color='text.secondary'>Notifications <br />Enabled</Typography>
                            </Box>

                            <Box p={1} pt={2}>
                                {
                                    planStatsLoading && <LinearProgress sx={{ maxWidth: '2rem' }} />
                                }

                                {
                                    !planStatsLoading && <Typography variant='h6' sx={{ marginBottom: 2 }}>{planStats?.notifications_enabled}</Typography>
                                }
                            </Box>
                        </Box>
                    </Grid>

                    {/* Channels added */}
                    <Grid item md={3} xs={12}>
                        <Box
                            p={3}
                            pb={0}
                            sx={{
                                minHeight: '100%',
                                border: 'solid',
                                borderWidth: 1,
                                borderRadius: 1,
                                borderColor: '#d6d6d6'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Fab sx={{ borderRadius: 1, boxShadow: 'none', marginRight: 2, backgroundColor: '#e3f8fa' }} size="medium">
                                    <CampaignIcon sx={{ fontSize: '1.4rem', color: '#26c6da' }} />
                                </Fab>

                                <Typography variant='subtitle1' color='text.secondary'>Channels <br />Added</Typography>
                            </Box>

                            <Box p={1} pt={2}>
                                {
                                    planStatsLoading && <LinearProgress sx={{ maxWidth: '2rem' }} />
                                }

                                {
                                    !planStatsLoading && <Typography variant='h6' sx={{ marginBottom: 2 }}>{planStats?.channels_added}</Typography>
                                }
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <CreateNewInvestigationDialog />
        </>
    )
}
