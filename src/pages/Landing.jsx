import React from 'react';
import { Button, Stack } from '@mui/material'

export default function Landing() {


    return (
        <>
            landing page
            <Stack spacing={3} sx={{ maxWidth: '10rem' }}>
                <Button href='/login' variant='contained'>Login</Button>
                <Button href='/signup' variant='contained'>signup</Button>
                <Button href='/forgot-password' variant='contained'>forgot-password</Button>
                <Button href='/change-password' variant='contained'>change-password</Button>
                <Button href='/404' variant='contained'>404</Button>
                <Button href='/500' variant='contained'>500</Button>
            </Stack>

        </>
    )
}
