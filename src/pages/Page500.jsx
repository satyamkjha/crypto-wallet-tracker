import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';



export default function Page404() {
  return (

    <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <Box sx={{ textAlign: 'center' }}>
        <Box textAlign='center'>
          <Box
            m={3}
            component="img"
            sx={{
              height: 50
            }}
            src="/static/logo.jpg"
          />
        </Box>

        <Typography variant="h3" paragraph>
          500 Internal Server Error
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          There was an error, please try again later.
        </Typography>

        <Button to="/" size="large" variant="contained" component={RouterLink} sx={{ marginTop: 3 }}>
          Go to Home
        </Button>
      </Box>

    </Container>

  );
}
