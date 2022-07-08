import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Button, CircularProgress, Fab, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteInvestigation } from '../../redux/slices/dashboardSlice';
import { chains } from '../../utils/supportedChains';


function InvestigationCard({ investigation }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [deleting, setdeleting] = useState(false)

    return (
        <Grid item md={3} xs={12}>
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
                <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant='h6'>Investigation {investigation.number}</Typography>
                        </Box>

                        <Box
                            component="img"
                            sx={{
                                marginRight: 1,
                                height: 24,
                                width: 24,
                                maxHeight: 24,
                                maxWidth: 24,
                            }}
                            alt="ethereum"
                            src={chains.filter(chain => chain.name == investigation.chain)[0].logo}
                        />
                    </Box>


                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '80%' }}>
                            <Typography variant='body2'>Add: <span style={{ fontWeight: 'bold', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{investigation.address}</span></Typography>
                        </Box>

                        <Box sx={{ flexGrow: 1, textAlign: 'right' }} pr={0.5}>
                            <IconButton onClick={() => { navigator.clipboard.writeText(investigation.address) }}>
                                <ContentCopyIcon sx={{ color: 'text.secondary', maxWidth: '1rem' }} />
                            </IconButton>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ flexGrow: 1, marginRight: 1 }}>
                            <Button variant='outlined' size='large' fullWidth onClick={() => { navigate(`/investigation/${investigation.id}/${investigation.number}/${investigation.address}/${investigation.chain}`) }}>View Investigation</Button>
                        </Box>

                        {
                            !deleting && <Fab
                                size='small'
                                sx={{ borderRadius: 0.7, backgroundColor: 'error.lighter', boxShadow: 'none' }}
                                onClick={async () => {
                                    setdeleting(true)
                                    await dispatch(deleteInvestigation({ id: investigation.id }))
                                    setdeleting(true)
                                }}
                            >
                                <DeleteForeverIcon sx={{ color: 'error.main', maxWidth: '1.3rem' }} />
                            </Fab>
                        }

                        {
                            deleting && <Fab
                                size='small'
                                sx={{ borderRadius: 0.7, backgroundColor: 'error.lighter', boxShadow: 'none' }}
                            >
                                <CircularProgress size={15} />
                            </Fab>
                        }
                    </Box>
                </Stack>
            </Box>
        </Grid>
    )
}

export default InvestigationCard