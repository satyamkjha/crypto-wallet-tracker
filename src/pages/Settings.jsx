import {
	Alert,
	Box,
	Button,
	Grid,
	InputAdornment,
	Stack,
	TextField,
	Typography,
	Container,
	IconButton,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Dashboard/Header';
import {
	getUserInfo,
	selectUserInfo,
	updateUserEmail,
	updateUserPassword,
} from '../redux/slices/settingSlice';
import EmailIcon from '@mui/icons-material/Email';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import KeyIcon from '@mui/icons-material/Key';
import { passwordStrength } from 'check-password-strength';
import { getPasswordStrengthMessage } from '../utils/helperFunctions';

export default function Settings() {
	const userInfo = useSelector(selectUserInfo);
	const dispatch = useDispatch();

	const [MetaMaskAddress, setMetaMaskAddress] = useState('');

	useEffect(() => {
		dispatch(getUserInfo());

		try {
			let metamask_account = JSON.parse(localStorage.getItem('user', ''))[
				'metamask_account'
			];

			if (
				metamask_account !== '' &&
				metamask_account !== null &&
				metamask_account !== undefined
			) {
				let len = metamask_account.length;
				setMetaMaskAddress(
					`${metamask_account.slice(0, 5)}...${metamask_account.slice(
						len - 5,
						len
					)}`
				);
			}
		} catch (e) {
			console.log(e);
		}
	}, []);

	const RegisterSchema = Yup.object().shape({
		consent: Yup.bool().required('Consent is required'),
		email: Yup.string().email('Email must be a valid email address'),
		newEmail: Yup.string()
			.email('Email must be a valid email address')
			.required('Email is required'),
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			newEmail: '',
			consent: true,
		},
		validationSchema: RegisterSchema,
		onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
			setSubmitting(true);
			await dispatch(
				updateUserEmail({
					email: values.email,
					newEmail: values.newEmail,
					reset: resetForm,
					setErrors,
				})
			);
			setSubmitting(false);
		},
	});

	const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

	const RegisterSchema2 = Yup.object().shape({
		password: Yup.string(),
		consent: Yup.bool().required('Consent is required'),
		newPassword: Yup.string().required('New Password is required'),
		confirmNewPassword: Yup.string().required(
			'Confirm New password is required'
		),
	});

	const formik2 = useFormik({
		initialValues: {
			password: '',
			consent: true,
			newPassword: '',
			confirmNewPassword: '',
		},
		validationSchema: RegisterSchema2,
		onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
			if (values.newPassword === values.confirmNewPassword) {
				setSubmitting(true);
				await dispatch(
					updateUserPassword({
						password: values.password,
						newPassword: values.newPassword,
						reset: resetForm,
						setErrors,
					})
				);
				setSubmitting(false);
			} else {
				setErrors({ afterSubmit: 'New Password Confirmation does not match' });
			}
		},
	});

	const [showPassword, setShowPassword] = useState(false);

	const { values } = formik2;

	const [passwordError, setPasswordError] = useState(passwordStrength(''));

	useEffect(() => {
		setPasswordError(passwordStrength(values.newPassword));
	}, [values.newPassword]);

	return (
		<>
			<Header selectedMenu={3} />

			<Container
				maxWidth='80vw'
				sx={{ marginTop: 5, maxWidth: '1800px', width: '95vw' }}>
				<Grid container spacing={3}>
					{/* Reset Email Address */}
					<Grid item md={6} xs={12}>
						{MetaMaskAddress === '' && (
							<Box
								p={5}
								sx={{
									border: 'solid',
									borderWidth: 1,
									borderRadius: 1,
									borderColor: '#d6d6d6',
								}}>
								<FormikProvider value={formik}>
									<Stack spacing={2}>
										<Typography variant='h4'>Reset Password</Typography>

										<Typography>
											To Reset your Password, enter your current password along
											with the new password.
										</Typography>

										<Form
											autoComplete='off'
											noValidate
											onSubmit={formik2.handleSubmit}>
											<Stack spacing={2}>
												{formik2.errors.afterSubmit && (
													<Alert severity='error'>
														{formik2.errors.afterSubmit}
													</Alert>
												)}

												<TextField
													sx={{
														display: userInfo?.password_status ? '' : 'none',
													}}
													fullWidth
													type={showPassword ? 'text' : 'password'}
													placeholder='Enter your Current Password'
													{...formik2.getFieldProps('password')}
													error={Boolean(
														formik2.touched.password && formik2.errors.password
													)}
													helperText={
														formik2.touched.password && formik2.errors.password
													}
													InputProps={{
														startAdornment: (
															<InputAdornment position='start'>
																<KeyIcon sx={{ opacity: 0.5 }} />
															</InputAdornment>
														),
														endAdornment: (
															<InputAdornment position='end'>
																<IconButton
																	edge='end'
																	onClick={() =>
																		setShowPassword((prev) => !prev)
																	}>
																	{showPassword ? (
																		<VisibilityIcon sx={{ opacity: 0.5 }} />
																	) : (
																		<VisibilityOffIcon sx={{ opacity: 0.5 }} />
																	)}
																</IconButton>
															</InputAdornment>
														),
													}}
												/>

												<TextField
													fullWidth
													type={showPassword ? 'text' : 'password'}
													placeholder='Enter your New Password'
													{...formik2.getFieldProps('newPassword')}
													error={Boolean(
														touched.newPassword &&
															passwordError &&
															(passwordError.length < 8 ||
																passwordError.contains.length < 4)
													)}
													helperText={getPasswordStrengthMessage(passwordError)}
													InputProps={{
														startAdornment: (
															<InputAdornment position='start'>
																<KeyIcon sx={{ opacity: 0.5 }} />
															</InputAdornment>
														),
														endAdornment: (
															<InputAdornment position='end'>
																<IconButton
																	edge='end'
																	onClick={() =>
																		setShowPassword((prev) => !prev)
																	}>
																	{showPassword ? (
																		<VisibilityIcon sx={{ opacity: 0.5 }} />
																	) : (
																		<VisibilityOffIcon sx={{ opacity: 0.5 }} />
																	)}
																</IconButton>
															</InputAdornment>
														),
													}}
												/>

												<TextField
													fullWidth
													placeholder='Confirm your New Password'
													{...formik2.getFieldProps('confirmNewPassword')}
													error={Boolean(
														formik2.touched.confirmNewPassword &&
															formik2.errors.confirmNewPassword
													)}
													type={showPassword ? 'text' : 'password'}
													helperText={
														formik2.touched.confirmNewPassword &&
														formik2.errors.confirmNewPassword
													}
													InputProps={{
														startAdornment: (
															<InputAdornment position='start'>
																<KeyIcon sx={{ opacity: 0.5 }} />
															</InputAdornment>
														),
														endAdornment: (
															<InputAdornment position='end'>
																<IconButton
																	edge='end'
																	onClick={() =>
																		setShowPassword((prev) => !prev)
																	}>
																	{showPassword ? (
																		<VisibilityIcon sx={{ opacity: 0.5 }} />
																	) : (
																		<VisibilityOffIcon sx={{ opacity: 0.5 }} />
																	)}
																</IconButton>
															</InputAdornment>
														),
													}}
												/>

												<Box>
													<Grid container>
														<Grid item xs={7}>
															<LoadingButton
																sx={{ minHeight: '4rem' }}
																fullWidth
																size='large'
																type='submit'
																variant='contained'
																loading={formik2.isSubmitting}>
																Reset Password
															</LoadingButton>
														</Grid>
													</Grid>
												</Box>
											</Stack>
										</Form>
										{/* <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
										<Stack spacing={2}>
											{errors.afterSubmit && (
												<Alert severity='error'>{errors.afterSubmit}</Alert>
											)}

											<TextField
												sx={{
													display: userInfo?.email.length == 0 ? 'none' : '',
												}}
												fullWidth
												type='email'
												placeholder='Enter your Current Email Address'
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
												type='email'
												placeholder='Enter your New Email Address'
												{...getFieldProps('newEmail')}
												error={Boolean(touched.newEmail && errors.newEmail)}
												helperText={touched.newEmail && errors.newEmail}
												InputProps={{
													startAdornment: (
														<InputAdornment position='start'>
															<EmailIcon sx={{ opacity: 0.5 }} />
														</InputAdornment>
													),
												}}
											/>

											<Box>
												<Grid container>
													<Grid item xs={7}>
														<LoadingButton
															sx={{ minHeight: '4rem' }}
															fullWidth
															size='large'
															type='submit'
															variant='contained'
															loading={isSubmitting}>
															Reset Email
														</LoadingButton>
													</Grid>
												</Grid>
											</Box>
										</Stack>
									</Form> */}
									</Stack>
								</FormikProvider>
							</Box>
						)}

						{/* Facing issue */}
						<Box
							sx={{
								backgroundColor: 'background.neutral',
								display: 'flex',
								alignItems: 'center',
								borderRadius: 1,
							}}
							p={3}
							mt={3}>
							<Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
								<ContactSupportIcon sx={{ fontSize: '3rem', marginRight: 1 }} />

								<Box>
									<Typography variant='h6'>Facing issue?</Typography>
									<Typography variant='body2'>
										Contact our Support team to get support.
									</Typography>
								</Box>
							</Box>

							<Box>
								<Button
									variant='outlined'
									size='large'
									sx={{
										backgroundColor: '#b3b3b3',
										color: '#121212',
										minWidth: '10rem',
										border: 'none',
									}}>
									Contact
								</Button>
							</Box>
						</Box>
					</Grid>

					{/* Reset password */}
					<Grid item md={6} xs={12}></Grid>
				</Grid>
			</Container>
		</>
	);
}
