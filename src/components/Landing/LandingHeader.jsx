import React from 'react'
import {
    Alert, Avatar, Box, Button, Checkbox, Container, Divider, Fab, FormControlLabel, Grid, IconButton, InputAdornment,
    Stack, TextField, Typography
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


export default function LandingHeader() {
    return (
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
 
                            <Button onClick={() => {
                                        window.open('mailto:info@credshields.com', '_blank');
                                    }} variant="contained" sx={{ backgroundColor: 'primary.light' }}>Contact us</Button>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Box>
    )
}
