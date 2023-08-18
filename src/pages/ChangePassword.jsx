import AppleIcon from '@mui/icons-material/Apple';
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ShieldIcon from '@mui/icons-material/Shield';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import {
    Alert, Avatar, Box, Button, Checkbox, Container, Divider, Fab, FormControlLabel, Grid, IconButton, InputAdornment,
    Stack, TextField, Typography
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import KeyIcon from '@mui/icons-material/Key';
import { useState } from 'react';
import axios from 'axios'
import { backendServerBaseURL } from '../utils/backendServerBaseURL';

export default function ChangePassword() {
    const params = useParams()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const ValidationSchema = Yup.object().shape({
        consent: Yup.bool().required('Consent is required'),
        confirmNewPassword: Yup.string().required('Confirm Password is required').min(8, 'Password must contain at least 8 letters'),
        newPassword: Yup.string().required('New Password is required').min(8, 'Password must contain at least 8 letters'),
    });

    const formik = useFormik({
        initialValues: {
            consent: true,
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: ValidationSchema,
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            if (values.newPassword === values.confirmNewPassword) {
                setSubmitting(true);

                await axios.post(
                    `${backendServerBaseURL}/api/auth/user/change-password`,
                    {
                        newPassword: values['newPassword'],
                        resetPasswordToken: params.resetPasswordToken
                    }
                ).then(
                    (response) => {
                        setSubmitting(false);
                        if (response.status === 200 && response.data.status === 'ok') {
                            navigate(`/password-changed-successfully`)
                        }

                        if (response.status === 200 && response.data.status === 'error') {
                            setErrors({ afterSubmit: response.data.errors[0] });
                        }
                    }
                ).catch((error) => {
                    setSubmitting(false);
                    try {
                        console.log(error)
                        if (error.response.status === 400) {
                            setErrors({ afterSubmit: error.response.data.message });
                        }
                    } catch (e) {
                        console.log(e)
                    }
                });
            } else {
                setErrors({ afterSubmit: 'Confirm password does not match' })
            }

        }
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

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

                                    <Button onClick={() => {
                                        window.open('mailto:info@credshields.com', '_blank');
                                    }} variant="contained" sx={{ backgroundColor: 'primary.light' }}>Contact us</Button>
                                </Box>
                            </Box>
                        </Container>
                    </Grid>
                </Box>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems='center'
                    minWidth='100%'
                    flexGrow='1'
                >
                    <Grid item xs={11} md={4}>
                        <FormikProvider value={formik}>
                            <Box sx={{ backgroundColor: 'background.neutral', paddingTop: 3, paddingBottom: 3, paddingRight: { md: 8, xs: 3 }, paddingLeft: { md: 8, xs: 3 }, borderRadius: 1 }}>
                                <Typography variant="h3" textAlign='center' pb={2}>
                                    Reset Password
                                </Typography>

                                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                    <Stack spacing={2}>
                                        {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

                                        <TextField
                                            fullWidth
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='Create New password'
                                            {...getFieldProps('newPassword')}
                                            error={Boolean(touched.newPassword && errors.newPassword)}
                                            helperText={touched.newPassword && errors.newPassword}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><KeyIcon sx={{ opacity: 0.5 }} /></InputAdornment>,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder='Confirm New password'
                                            {...getFieldProps('confirmNewPassword')}
                                            error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
                                            helperText={touched.confirmNewPassword && errors.confirmNewPassword}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><KeyIcon sx={{ opacity: 0.5 }} /></InputAdornment>,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                                            {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />

                                        <Box>
                                            <FormControlLabel
                                                control={<Checkbox checked={formik.values.consent} />}
                                                label={<Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>Yes I Agree to Reset My Password</Typography>}
                                            />
                                        </Box>

                                        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 1 }}>
                                            Reset Password
                                        </LoadingButton>

                                        <Typography color='text.secondary' variant="subtitle2">
                                            Facing any issue? <Link to="/forgotpassword" color="inherit">Contact chat support</Link>
                                        </Typography>

                                        <Divider></Divider>

                                        <Typography color='text.secondary' variant="subtitle2" textAlign='center'>
                                            Don't have an account? <Link to="/forgotpassword" color="inherit">Create an account</Link>
                                        </Typography>
                                    </Stack>
                                </Form>
                            </Box>
                        </FormikProvider>
                    </Grid>
                </Box>

                <Box>
                    <Grid item xs={12}>
                        <Container maxWidth='md'>
                            <Box pb={2} pt={1}>
                                <Typography textAlign='center' variant='body2'>Copyright @ 2022 CredShields. All Rights Reserved.</Typography>
                            </Box>
                        </Container>
                    </Grid>
                </Box>
            </Box>
        </Grid >
    );
}
