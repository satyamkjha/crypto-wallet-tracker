import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { assetsURL } from '../utils/assetsURL';



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
            src={`${assetsURL}logo.jpg`}
          />
        </Box>

        <Typography variant="h3" paragraph>
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, we couldn’t find the page you’re looking for. <br />Perhaps you’ve mistyped the URL? Be sure to check
          your spelling.
        </Typography>

        <Button to="/" size="large" variant="contained" component={RouterLink} sx={{ marginTop: 3 }}>
          Go to Home
        </Button>
      </Box>

    </Container>

  );
}
