import AppleIcon from '@mui/icons-material/Apple';
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ShieldIcon from '@mui/icons-material/Shield';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import {
	Alert,
	Avatar,
	Box,
	Button,
	Checkbox,
	Container,
	Divider,
	Fab,
	FormControlLabel,
	Grid,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { backendServerBaseURL } from '../utils/backendServerBaseURL';
import { assetsURL } from '../utils/assetsURL';

export default function ForgotPassword() {
	const navigate = useNavigate();

	const ValidationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Email must be a valid email address')
			.required('Email is required'),
	});

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: ValidationSchema,
		onSubmit: async (values, { setErrors, setSubmitting }) => {
			setSubmitting(true);

			await axios
				.post(`${backendServerBaseURL}/api/auth/user/forgot-password/link`, {
					email: values['email'],
				})
				.then((response) => {
					setSubmitting(false);
					if (response.status === 200 && response.data.status === 'ok') {
						navigate(`/forgot-password-link-sent-successfully`);
					}

					if (response.status === 200 && response.data.status === 'error') {
						setErrors({ afterSubmit: response.data.errors[0] });
					}
				})
				.catch((error) => {
					setSubmitting(false);
					try {
						console.log(error);
						if (error.response.status === 400) {
							setErrors({ afterSubmit: error.response.data.message });
						}
					} catch (e) {
						console.log(e);
					}
				});
		},
	});

	const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

	return (
		<Grid container>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					height: '100vh',
				}}>
				<Box>
					<Grid item xs={12}>
						<Container maxWidth='lg'>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
								pt={2}>
								<Box
									fullWidth
									sx={{ display: 'flex', justifyContent: 'center' }}>
									<Box
										component='img'
										sx={{
											height: 42,
										}}
										src={`${assetsURL}logo.jpg`}
									/>
								</Box>

								<Box>
									{/* <Fab size='small' sx={{ marginRight: 1, borderRadius: 1, backgroundColor: 'secondary.main', color: 'white' }}>
                                        <PhotoCameraIcon />
                                    </Fab> */}

									<Button
										onClick={() => {
											window.open('mailto:info@credshields.com', '_blank');
										}}
										variant='contained'
										sx={{ backgroundColor: 'primary.light' }}>
										Contact us
									</Button>
								</Box>
							</Box>
						</Container>
					</Grid>
				</Box>

				<Box
					display='flex'
					justifyContent='center'
					alignItems='center'
					minWidth='100%'
					flexGrow='1'>
					<Grid item xs={11} sm={9} md={6} lg={5}>
						<FormikProvider value={formik}>
							<Box
								sx={{
									backgroundColor: 'background.neutral',
									paddingTop: 5,
									paddingBottom: 5,
									paddingRight: { md: 8, xs: 3 },
									paddingLeft: { md: 8, xs: 3 },
									borderRadius: 1,
								}}>
								<Typography variant='h2' textAlign='center' pb={1}>
									Welcome Back
									<br />
									to CredShields
								</Typography>

								<Typography textAlign='center' pb={3}>
									We will send a password reset link
									<br />
									to your registered email address
								</Typography>

								<Form autoComplete='off' noValidate onSubmit={handleSubmit}>
									<Stack spacing={2}>
										{errors.afterSubmit && (
											<Alert severity='error'>{errors.afterSubmit}</Alert>
										)}

										<TextField
											fullWidth
											type='email'
											placeholder='Enter your Email Address'
											{...getFieldProps('email')}
											error={Boolean(touched.email && errors.email)}
											helperText={touched.email && errors.email}
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<EmailIcon sx={{ opacity: 0.5 }} />
													</InputAdornment>
												),
											}}
										/>

										<LoadingButton
											fullWidth
											size='large'
											type='submit'
											variant='contained'
											loading={isSubmitting}
											sx={{ mt: 1 }}>
											Submit
										</LoadingButton>

										<Typography color='text.secondary' variant='subtitle2'>
											Facing any issue?{' '}
											<Link
												onClick={() => {
													window.open('mailto:info@credshields.com', '_blank');
												}}
												color='inherit'>
												Contact chat support
											</Link>
										</Typography>

										<Divider></Divider>

										<Typography
											color='text.secondary'
											variant='subtitle2'
											textAlign='center'>
											Don't have an account?{' '}
											<Link to='/forgotpassword' color='inherit'>
												Create an account
											</Link>
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
								<Typography textAlign='center' variant='body2'>
									Copyright @ 2022 CredShields. All Rights Reserved.
								</Typography>
							</Box>
						</Container>
					</Grid>
				</Box>
			</Box>
		</Grid>
	);
}
