import EmailIcon from '@mui/icons-material/Email';
import ShieldIcon from '@mui/icons-material/Shield';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import {
    Alert, Box, Checkbox, FormControlLabel, Grid, IconButton, InputAdornment,
    Stack, TextField, Typography
} from '@mui/material';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import LandingHeader from '../components/Landing/LandingHeader';
import { backendServerBaseURL } from '../utils/backendServerBaseURL';
import KeyIcon from '@mui/icons-material/Key';


export default function TwoStepVerification() {
    const params = useParams()
    const navigate = useNavigate()

    const RegisterSchema = Yup.object().shape({
        otp: Yup.number('Enter valid OTP').required('OTP is required').min(6, 'OTP must contain at least 6 digits'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validateOnBlur: true,
        validationSchema: RegisterSchema,
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            setSubmitting(false);

            await axios.post(
                `${backendServerBaseURL}/api/auth/login/2-step-verification`,
                {
                    type: 'normal',
                    email: params.email,
                    otp: values['otp']
                }
            ).then(
                (response) => {
                    if (response.status === 200 && response.data.status === 'ok') {
                        localStorage.setItem('accessToken', response.data.data.tokens.access)
                        localStorage.setItem('refreshToken', response.data.data.tokens.refresh)
                        localStorage.setItem('user', JSON.stringify(response.data.data.user_data))

                        navigate('/dashboard')
                    }

                    if (response.status === 200 && response.data.status === 'error') {
                        setErrors({ afterSubmit: response.data.errors[0] });
                    }
                }
            ).catch((error) => {
                try {
                    if (error.response.status === 400) {
                        setErrors({ afterSubmit: error.response.data.message });
                    }
                } catch (e) {
                    console.log(e)
                }
            });
        }
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <LandingHeader />

            <Box sx={{
                height: '90vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid
                        p={4}
                        item
                        xs={10}
                        sm={8}
                        md={6}
                        lg={4}
                        sx={{
                            border: 'solid',
                            borderWidth: 1,
                            borderRadius: 1,
                            borderColor: '#d6d6d6',
                        }}
                    >
                        <Box textAlign='center' p={1}>
                            <ShieldIcon sx={{ fontSize: '3rem' }} />
                        </Box>

                        <Typography variant="h3" pb={2} textAlign='center'>
                            Two-Factor Authentication
                        </Typography>

                        <Typography variant="body1" pb={2} textAlign='center'>
                            Your account is protected with two-factor authentication. We've sent you a OTP email. Please enter the code below.
                        </Typography>

                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Stack spacing={1}>
                                {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

                                <TextField
                                    fullWidth
                                    placeholder='OTP'
                                    {...getFieldProps('otp')}
                                    error={Boolean(touched.otp && errors.otp)}
                                    helperText={touched.otp && errors.otp}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><KeyIcon sx={{ opacity: 0.5 }} /></InputAdornment>,
                                    }}
                                />

                                <LoadingButton
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    loading={isSubmitting}>
                                    Continue
                                </LoadingButton>
                            </Stack>
                        </Form>
                    </Grid>
                </Grid>
            </Box>
        </FormikProvider>
    )
}
