import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordLinkSentSuccessfully() {
    const navigate = useNavigate()

    return (
        <Grid container>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh' }}>
                <Box>
                    <Grid item xs={12}>
                        <Container maxWidth='lg'>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} pt={2}>

                                <Box
                                    fullWidth
                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                >
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 42
                                        }}
                                        src="/static/logo.jpg"
                                    />
                                </Box>

                                <Box>
                                    {/* <Fab size='small' sx={{ marginRight: 1, borderRadius: 1, backgroundColor: 'secondary.main', color: 'white' }}>
                                        <PhotoCameraIcon />
                                    </Fab> */}

                                    <Button variant="contained" sx={{ backgroundColor: 'primary.light' }}>Contact us</Button>
                                </Box>
                            </Box>
                        </Container>
                    </Grid>
                </Box>

                <Container
                    maxWidth='80vw'
                    sx={{
                        marginTop: 5,
                        maxWidth: '80vw',
                        minHeight: '50vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box
                            component="img"
                            sx={{
                                width: '4rem',
                                height: '4rem',
                                marginBottom: 2
                            }}
                            alt="ethereum"
                            src='/static/payment-success.png'
                        />

                        <Typography variant='h2' sx={{ marginBottom: 2 }} textAlign='center'>Password Reset Link <br />Sent Successfully</Typography>
                        <Typography variant='body2' sx={{ marginBottom: 2 }} textAlign='center'>Reset Password link is sent to your registered Email Address</Typography>

                        <Button variant='contained' sx={{ marginTop: 2 }} onClick={() => { window.open('/login', '_self') }}>Go To Login</Button>
                    </Box>
                </Container>
            </Box>
        </Grid >
    );
}
