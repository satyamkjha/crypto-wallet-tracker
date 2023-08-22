import AppleIcon from '@mui/icons-material/Apple';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
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
	Container,
	Divider,
	Fab,
	Grid,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { backendServerBaseURL } from '../utils/backendServerBaseURL';
import { useMetaMask } from 'metamask-react';
import { googleClientId } from '../utils/constants';
import { assetsURL } from '../utils/assetsURL';

export default function Signup() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();
	const ref = useRef('');

	const RegisterSchema = Yup.object().shape({
		email: Yup.string()
			.email('Email must be a valid email address')
			.required('Email is required'),
		password: Yup.string()
			.required('Password is required')
			.min(8, 'Password must contain at least 8 letters'),
		passwordConfirmation: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Passwords must match')
			.min(8, 'Password must contain at least 8 letters'),
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			passwordConfirmation: '',
		},
		validationSchema: RegisterSchema,
		onSubmit: async (values, { setErrors, setSubmitting }) => {
			setSubmitting(false);

			await axios
				.post(`${backendServerBaseURL}/api/auth/signup`, {
					type: 'normal',
					username: values['email'],
					email: values['email'],
					password: values['password'],
				})
				.then((response) => {
					if (response.status === 200 && response.data.status === 'ok') {
						localStorage.setItem(
							'accessToken',
							response.data.data.tokens.access
						);
						localStorage.setItem(
							'refreshToken',
							response.data.data.tokens.refresh
						);
						localStorage.setItem(
							'user',
							JSON.stringify(response.data.data.user_data)
						);

						navigate('/dashboard');
					}

					if (response.status === 200 && response.data.status === 'error') {
						setErrors({ afterSubmit: response.data.errors[0] });
					}
				})
				.catch((error) => {
					try {
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

	const showGoogleSignupPrompt = () => {
		window.google.accounts.id.prompt();
	};

	const googleSignupSuccess = async (response) => {
		const base64EncodedData = response['credential'].split('.')[1];
		var decodedString = atob(base64EncodedData);
		const email = JSON.parse(decodedString)['email'];
		const credentialsJWT = response['credential'];

		await axios
			.post(`${backendServerBaseURL}/api/auth/signup`, {
				type: 'google',
				username: email,
				email: email,
				credentialsJWT: credentialsJWT,
			})
			.then((response) => {
				if (response.status === 200 && response.data.status === 'ok') {
					localStorage.setItem('accessToken', response.data.data.tokens.access);
					localStorage.setItem(
						'refreshToken',
						response.data.data.tokens.refresh
					);
					localStorage.setItem(
						'user',
						JSON.stringify(response.data.data.user_data)
					);

					navigate('/dashboard');
				}

				if (response.status === 200 && response.data.status === 'error') {
					// setErrors({ afterSubmit: response.data.errors[0] });
				}
			})
			.catch((error) => {
				try {
					if (error.response.status === 400) {
						// setErrors({ afterSubmit: error.response.data.message });
					}
				} catch (e) {
					console.log(e);
				}
			});
	};

	window.onload = function () {
		window.setTimeout(() => {
			window.google.accounts.id.initialize({
				client_id: googleClientId,
				callback: googleSignupSuccess,
			});
			window.google.accounts.id.renderButton(
				document.getElementById('buttonDiv'),
				{
					theme: 'outline',
					size: 'large',
					width: ref.current.offsetWidth,
					borderRadius: 4,
					height: '6rem',
				}
			);
		}, 400);
	};

	// Metamask signup
	const { status, connect, account, chainId, ethereum } = useMetaMask();
	const metaMaskeSignup = async (account, chainId) => {
		await axios
			.post(`${backendServerBaseURL}/api/auth/signup`, {
				type: 'metamask',
				account: account,
				chainId: chainId,
			})
			.then((response) => {
				if (response.status === 200 && response.data.status === 'ok') {
					localStorage.setItem('accessToken', response.data.data.tokens.access);
					localStorage.setItem(
						'refreshToken',
						response.data.data.tokens.refresh
					);
					localStorage.setItem(
						'user',
						JSON.stringify(response.data.data.user_data)
					);

					navigate('/dashboard');
				}

				if (response.status === 200 && response.data.status === 'error') {
					// setErrors({ afterSubmit: response.data.errors[0] });
				}
			})
			.catch((error) => {
				try {
					if (error.response.status === 400) {
						// setErrors({ afterSubmit: error.response.data.message });
					}
				} catch (e) {
					console.log(e);
				}
			});
	};
	useEffect(() => {
		if (status === 'initializing') {
			console.log('Synchronisation with MetaMask ongoing...');
		}

		if (status === 'unavailable') {
			console.log('MetaMask not available');
		}

		if (status === 'connecting') {
			console.log('connecting');
		}

		if (status === 'connected') {
			console.log(`Connected account ${account} on chain ID ${chainId}`);
			metaMaskeSignup(account, chainId);
		}
	}, [status]);

	return (
		<Grid container>
			<Grid
				item
				xs={6}
				sx={{ display: { xs: 'none', md: 'block' } }}
				backgroundColor='background.neutral'>
				<Box
					sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
					<Box>
						<Container maxWidth='sm'>
							<Box fullWidth pt={4}>
								<Box
									component='img'
									sx={{
										height: 42,
									}}
									src={`${assetsURL}logo.jpg`}
								/>
							</Box>
						</Container>
					</Box>

					<Container
						maxWidth='sm'
						sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
						<Stack spacing={3}>
							<Typography variant='h3'>What we offer</Typography>

							<Stack direction={'row'}>
								<Box pr={1} pt={0.3}>
									<CheckCircleIcon sx={{ fontSize: '1.4rem' }} />
								</Box>

								<Box>
									<Typography variant='h4'>What we offer</Typography>

									<Typography variant='body1'>
										Lorem Ipsum is simply dummy text of the printing and
										typesetting industry. Lorem Ipsum has been the industry's
										standard dummy text ever since the 1500s, when an unknown
										printer took a galley of type and scrambled it to make a
										type specimen book.
									</Typography>
								</Box>
							</Stack>

							<Stack direction={'row'}>
								<Box pr={1} pt={0.3}>
									<CheckCircleIcon sx={{ fontSize: '1.4rem' }} />
								</Box>

								<Box>
									<Typography variant='h5'>What we offer</Typography>

									<Typography variant='body1'>
										Lorem Ipsum is simply dummy text of the printing and
										typesetting industry. Lorem Ipsum has been the industry's
										standard dummy text ever since the 1500s, when an unknown
										printer took a galley of type and scrambled it to make a
										type specimen book.
									</Typography>
								</Box>
							</Stack>

							<Stack direction={'row'}>
								<Box pr={1} pt={0.3}>
									<CheckCircleIcon sx={{ fontSize: '1.4rem' }} />
								</Box>

								<Box>
									<Typography variant='h5'>What we offer</Typography>

									<Typography variant='body1'>
										Lorem Ipsum is simply dummy text of the printing and
										typesetting industry. Lorem Ipsum has been the industry's
										standard dummy text ever since the 1500s, when an unknown
										printer took a galley of type and scrambled it to make a
										type specimen book.
									</Typography>
								</Box>
							</Stack>

							<Typography variant='body2' color='text.secondary'>
								COMPANIES WE HAVE HELPED TO SECURE
							</Typography>
						</Stack>
					</Container>

					<Box pb={2} pt={2}>
						<Container maxWidth='sm'>
							<Typography variant='body2'>
								Copyright @ 2022 CredShields. All Rights Reserved.
							</Typography>
						</Container>
					</Box>
				</Box>
			</Grid>

			<Grid item xs={12} md={6}>
				<Box
					sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
					<Container maxWidth='lg'>
						<Box
							fullWidth
							sx={{
								display: 'flex',
								paddingRight: { xs: 2, md: 8 },
								paddingLeft: { xs: 2, md: 8 },
								justifyContent: { xs: 'space-between', md: 'right' },
							}}
							pt={4}>
							<Box
								component='img'
								sx={{
									display: { xs: 'block', md: 'none' },
									height: 42,
								}}
								src={`${assetsURL}logo.jpg`}
							/>

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

					<Container
						maxWidth='lg'
						sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
						<FormikProvider value={formik}>
							<Box
								sx={{
									paddingTop: 3,
									paddingBottom: 3,
									paddingRight: { xs: 2, md: 4, xl: 8, },
									paddingLeft: { xs: 2, md: 4, xl: 8 },
									borderRadius: 1,
									width: { lg: '80%', md: '100%', sm: '80%', xs: '90%' },
								}}>
								<Typography variant='h3' pb={2}>
									Join CredShields
								</Typography>

								<Form autoComplete='off' noValidate onSubmit={handleSubmit}>
									<Stack spacing={1}>
										{errors.afterSubmit && (
											<Alert severity='error'>{errors.afterSubmit}</Alert>
										)}

										<TextField
											fullWidth
											type='email'
											placeholder='Email'
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

										<TextField
											fullWidth
											placeholder='Password'
											type={showPassword ? 'text' : 'password'}
											{...getFieldProps('password')}
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<ShieldIcon sx={{ opacity: 0.5 }} />
													</InputAdornment>
												),
												endAdornment: (
													<InputAdornment position='end'>
														<IconButton
															edge='end'
															onClick={() => setShowPassword((prev) => !prev)}>
															{showPassword ? (
																<VisibilityIcon sx={{ opacity: 0.5 }} />
															) : (
																<VisibilityOffIcon sx={{ opacity: 0.5 }} />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
											error={Boolean(touched.password && errors.password)}
											helperText={touched.password && errors.password}
										/>

										<TextField
											fullWidth
											placeholder='Confirm Password'
											type={showConfirmPassword ? 'text' : 'password'}
											{...getFieldProps('passwordConfirmation')}
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<ShieldIcon sx={{ opacity: 0.5 }} />
													</InputAdornment>
												),
												endAdornment: (
													<InputAdornment position='end'>
														<IconButton
															edge='end'
															onClick={() =>
																setShowConfirmPassword((prev) => !prev)
															}>
															{showConfirmPassword ? (
																<VisibilityIcon sx={{ opacity: 0.5 }} />
															) : (
																<VisibilityOffIcon sx={{ opacity: 0.5 }} />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
											error={Boolean(
												touched.passwordConfirmation &&
													errors.passwordConfirmation
											)}
											helperText={
												touched.passwordConfirmation &&
												errors.passwordConfirmation
											}
										/>

										<LoadingButton
											fullWidth
											size='large'
											type='submit'
											variant='contained'
											loading={isSubmitting}>
											Login
										</LoadingButton>

										<Box pt={1} pb={1}>
											<Divider
												sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
												OR
											</Divider>
										</Box>

										<Box pr={2} pl={2}>
											{/* <Button
                                            variant="contained"
                                            size='large'
                                            sx={{
                                                backgroundColor: '#ea4335',
                                                ':hover': {
                                                    bgcolor: '#ba0000',
                                                    color: 'white',
                                                },
                                            }}
                                            startIcon={<GoogleIcon />}
                                            onClick={showGoogleSignupPrompt}
                                        >Continue with Google</Button> */}

											<div
												id='buttonDiv'
												style={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
												}}></div>

											<Box pr={1} pl={1} pt={1}>
												<Button
													fullWidth
													ref={ref}
													variant='contained'
													// size='large'
													sx={{
														backgroundColor: '#ff7b00',
														':hover': {
															bgcolor: 'orange',
															color: 'white',
														},
													}}
													startIcon={
														<Avatar
															sx={{ width: 24, height: 24 }}
															size='sm'
															src={
																'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg'
															}
														/>
													}
													onClick={connect}>
													Continue with Metamask
												</Button>
											</Box>
										</Box>

										<Box pt={2}>
											<Typography color='text.secondary' variant='subtitle2'>
												By continuing you agree to our
												<br />
												<Link to='/forgotpassword' color='inherit'>
													Terms of service
												</Link>{' '}
												and{' '}
												<Link to='/forgotpassword' color='inherit'>
													Privacy policy
												</Link>
											</Typography>
										</Box>

										<Box pt={1} pb={1}>
											<Divider
												sx={{
													color: 'text.secondary',
													fontSize: '0.8rem',
												}}></Divider>
										</Box>

										<Typography color='text.secondary' variant='subtitle2'>
											Already have an account?{' '}
											<span
												onClick={() => {
													window.open('/login', '_self');
												}}
												color='inherit'
												style={{
													cursor: 'pointer',
													textDecoration: 'underline',
												}}>
												Log In
											</span>
										</Typography>
									</Stack>
								</Form>
							</Box>
						</FormikProvider>
					</Container>
				</Box>
			</Grid>
		</Grid>
	);
}
