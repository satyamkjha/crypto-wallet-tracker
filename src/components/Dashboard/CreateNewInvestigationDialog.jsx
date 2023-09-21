import { Alert, Box, InputAdornment, Stack, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
	createInvestigation,
	selectOpenCreateInvestigationDialog,
	selectPlanStats,
	updateOpenCreateInvestigationDialog,
} from '../../redux/slices/dashboardSlice';
import { Form, FormikProvider, useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { chains } from '../../utils/supportedChains';
import MemoryIcon from '@mui/icons-material/Memory';
import { assetsURL } from '../../utils/assetsURL';

export default function CreateNewInvestigationDialog() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const openCreateInvestigationDialog = useSelector(
		selectOpenCreateInvestigationDialog
	);
	const planStats = useSelector(selectPlanStats);

	const Schema = Yup.object().shape({
		address: Yup.string('Enter valid address')
			.required('Address is required')
			.matches(
				'/^xdc[a-fA-F0-9]{40}$|^0x[a-fA-F0-9]{40}$/',
				'Contract Address is not valid'
			),
		chain: Yup.string('Select valid chain').required('Chain is required'),
	});

	const formik = useFormik({
		initialValues: {
			address: '',
			chain: 'ethereum-mainnet',
		},
		validationSchema: Schema,
		onSubmit: async (values, { setErrors, setSubmitting, isSubmitting }) => {
			setSubmitting(true);

			await dispatch(
				createInvestigation({
					setSubmitting,
					address: values.address,
					chain: values.chain,
					navigate,
				})
			);
		},
	});

	const {
		errors,
		touched,
		handleSubmit,
		isSubmitting,
		getFieldProps,
		setFieldValue,
	} = formik;

	return (
		<Dialog
			fullWidth
			maxWidth='sm'
			open={openCreateInvestigationDialog}
			onClose={() => {
				dispatch(updateOpenCreateInvestigationDialog(false));
			}}>
			<FormikProvider value={formik}>
				<Form autoComplete='off' noValidate onSubmit={handleSubmit}>
					<DialogTitle>{'Add Investigation'}</DialogTitle>

					<DialogContent>
						<DialogContentText>
							Enter address below to start investigation
						</DialogContentText>

						<Stack spacing={1} marginTop={2}>
							{errors.afterSubmit && (
								<Alert severity='error'>{errors.afterSubmit}</Alert>
							)}

							<Box
								width={'100%'}
								sx={{
									display: 'flex',
									flexDirection: { xs: 'column', md: 'row' },
									alignItems: 'center',
								}}>
								<TextField
									sx={{
										width: { xs: '100%', md: '60%' },
										marginRight: { xs: 0, md: 1 },
										marginBottom: { xs: 1, md: 0 },
									}}
									placeholder='Address'
									{...getFieldProps('address')}
									error={Boolean(touched.address && errors.address)}
									helperText={touched.address && errors.address}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<MemoryIcon sx={{ opacity: 0.5 }} />
											</InputAdornment>
										),
									}}
								/>

								<Select
									value={formik.values.chain}
									sx={{ width: { xs: '100%', md: '40%' }, minWidth: '14rem' }}
									onChange={(e) => {
										setFieldValue('chain', e.target.value);
									}}>
									{chains.map((chainData) => {
										return (
											<MenuItem value={chainData.name}>
												<Box sx={{ display: 'flex', alignItems: 'center' }}>
													<Box
														component='img'
														sx={{
															marginRight: 1,
															height: 24,
															width: 24,
															maxHeight: 24,
															maxWidth: 24,
														}}
														alt='ethereum'
														src={`${assetsURL}${chainData.logo}`}
													/>
													{chainData.name}
												</Box>
											</MenuItem>
										);
									})}
								</Select>
							</Box>
						</Stack>
					</DialogContent>

					<Box
						p={3}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						<Box>
							Investigation remaining {planStats?.remaining_investigations}
						</Box>

						<LoadingButton
							type='submit'
							variant='contained'
							loading={isSubmitting}>
							Investigate
						</LoadingButton>
					</Box>
				</Form>
			</FormikProvider>
		</Dialog>
	);
}
