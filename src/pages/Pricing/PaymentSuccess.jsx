import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Dashboard/Header';

export default function PaymentSuccess() {
    const navigate = useNavigate()

    return (
        <>
            <Header selectedMenu={0} />

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

                    <Typography variant='h2' sx={{ marginBottom: 2 }} color='success'>Payment Successful</Typography>
                    <Typography variant='body2' sx={{ marginBottom: 2 }} textAlign='center'>Your plan is updated successfully</Typography>

                    <Button variant='contained' sx={{ marginTop: 2 }} onClick={() => { navigate('/pricing') }}>Go To Pricing</Button>
                </Box>
            </Container>
        </>
    )
}
