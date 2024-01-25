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
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { backendServerBaseURL } from '../utils/backendServerBaseURL';
import { useMetaMask } from 'metamask-react';
import { useEffect } from 'react';
import LandingHeader from '../components/Landing/LandingHeader';
import { googleClientId } from '../utils/constants';

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const ref = useRef('');

	const RegisterSchema = Yup.object().shape({
		email: Yup.string()
			.email('Email must be a valid email address')
			.required('Email is required'),
		password: Yup.string()
			.required('Password is required')
			.min(8, 'Password must contain at least 8 letters'),
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: RegisterSchema,
		onSubmit: async (values, { setErrors, setSubmitting }) => {
			setSubmitting(false);

			await axios
				.post(`${backendServerBaseURL}/api/auth/login`, {
					type: 'normal',
					username: values['email'],
					password: values['password'],
				})
				.then((response) => {
					if (
						response.status === 200 &&
						response.data.status === 'ok' &&
						response.data.message === 'redirect to 2 step verification'
					) {
						navigate(`/2-step-verification/${values['email']}`);
					}

					if (response.status === 200 && response.data.status === 'error') {
						setErrors({ afterSubmit: response.data.errors[0] });
					}
				})
				.catch((error) => {
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

	const showGoogleSignupPrompt = () => {
		window.google.accounts.id.prompt();
	};

	const googleSignupSuccess = async (response) => {
		const base64EncodedData = response['credential'].split('.')[1];
		var decodedString = atob(base64EncodedData);
		const email = JSON.parse(decodedString)['email'];
		const credentialsJWT = response['credential'];

		await axios
			.post(`${backendServerBaseURL}/api/auth/login`, {
				type: 'google',
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
					console.log(error);
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

	// Metamask login
	const { status, connect, ethereum } = useMetaMask();
	const [metamaskConnecting, setmetamaskConnecting] = useState(false);

	const connectToMetamask = async () => {
		if (window.ethereum.selectedAddress) {
			getNonce(window.ethereum.selectedAddress);
		}
	};

	const getNonce = async (account) => {
		await axios
			.get(
				`${backendServerBaseURL}/api/auth/login?account=${account}&type=metamask`
			)
			.then((response) => {
				metaMaskeSignup(account, response.data.nonce);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const metaMaskeSignup = async (account, nonce) => {
		var from = window.ethereum.selectedAddress;
		var params = [from, nonce];
		var method = 'personal_sign';
		const signature = await ethereum.request({ method, params });

		await axios
			.post(`${backendServerBaseURL}/api/auth/login`, {
				type: 'metamask',
				signature: signature,
				account: account,
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
					console.log(error);
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
			setmetamaskConnecting(true);
			console.log('connecting');
		}

		if (status === 'connected') {
			if (metamaskConnecting) {
				connectToMetamask();
			}
		}
	}, [status]);

	useEffect(() => {
		if (
			localStorage.getItem('accessToken') &&
			localStorage.getItem('refreshToken') &&
			localStorage.getItem('user')
		) {
			navigate('/dashboard');
		}
	}, []);

	return (
		<Grid container>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					height: '100vh',
				}}>
				<LandingHeader />

				<Box
					display='flex'
					justifyContent='center'
					alignItems='center'
					flexGrow='1'>
					<Grid
						item
						xs={11}
						md={8}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<FormikProvider value={formik}>
							<Box
								sx={{
									backgroundColor: 'background.neutral',
									paddingTop: 4,
									paddingBottom: 4,
									paddingRight: { lg: 10, xs: 3 },
									paddingLeft: { lg: 10, xs: 3 },
									borderRadius: 1,
									maxWidth: '1200px',
								}}>
								<Typography variant='h3' textAlign='center' pb={2}>
									Welcome back to CredShields
								</Typography>

								<Form autoComplete='off' noValidate onSubmit={handleSubmit}>
									<Stack spacing={1}>
										{errors.afterSubmit && (
											<Alert severity='error'>{errors.afterSubmit}</Alert>
										)}

										<TextField
											fullWidth
											autoComplete='username'
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
											autoComplete='current-password'
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

										<Box pl={1} sx={{ display: 'flex', alignItems: 'center' }}>
											<Grid container>
												<Grid item xs={5}>
													<FormControlLabel
														control={<Checkbox defaultChecked />}
														label={
															<Typography
																variant='body2'
																color='text.secondary'>
																Remember Me
															</Typography>
														}
													/>
												</Grid>
												<Grid item xs={7}>
													<LoadingButton
														fullWidth
														size='large'
														type='submit'
														variant='contained'
														loading={isSubmitting}>
														Login
													</LoadingButton>
												</Grid>
											</Grid>
										</Box>

										<Box sx={{ flexGrow: 1 }}>
											<Typography color='text.secondary' variant='subtitle2'>
												Having problem Logging in?{' '}
												<span
													onClick={() => {
														window.open('/forgot-password', '_self');
													}}
													color='inherit'
													style={{
														cursor: 'pointer',
														textDecoration: 'underline',
													}}>
													Forgot Password?
												</span>
											</Typography>
										</Box>

										<Box>
											<Divider
												sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
												OR
											</Divider>
										</Box>

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

										<Box
											pr={1}
											pl={1}
											style={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
											}}>
											<Button
												variant='contained'
												// size='large'
												ref={ref}
												sx={{
													backgroundColor: '#ff7b00',
													width: { md: '70%', xs: '100%' },
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

										<Box pt={2}>
											<Typography
												color='text.secondary'
												variant='subtitle2'
												textAlign='center'>
												Don't have an account?{' '}
												<span
													onClick={() => {
														window.open('/signup', '_self');
													}}
													color='inherit'
													style={{
														cursor: 'pointer',
														textDecoration: 'underline',
													}}>
													Create An Account
												</span>
											</Typography>
										</Box>
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
