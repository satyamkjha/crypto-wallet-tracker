import { useEffect } from 'react';
import axiosInstance from '../utils/axios';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ErrorHandler({ children }) {
	const logout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('user');
		window.open('/login', '_self');
	};

	const [open, setOpen] = React.useState(false);
	const [message, setMessage] = React.useState('');

	const handleClick = () => {
		setOpen(true);
	};

	useEffect(() => {
		if (message !== '') {
			setOpen(true);
			setTimeout(() => {
				setMessage('');
			}, 3000);
		}
	}, [message]);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const action = (
		<React.Fragment>
			<IconButton
				size='small'
				aria-label='close'
				color='inherit'
				onClick={handleClose}>
				<CloseIcon fontSize='small' />
			</IconButton>
		</React.Fragment>
	);

	useEffect(() => {
		axiosInstance.interceptors.response.use(
			(response) => {
				return response;
			},

			(error) => {
				if (error.toJSON().message === 'Network Error') {
					console.log('no internet connection');
				}

				if (error.toJSON().status === 500) {
					console.log('500 Error');
					setMessage('Internal Server error');
				}

				if (error.response.status === 403 || error.response.status === 401) {
					console.log(error);
					logout();
				}

				if (Object.keys(error.response.data).includes('detail') == true) {
					if (
						error.response.status == 403 &&
						error.response.data.detail == 'Your subscription is expired'
					) {
						console.log('Subscription Expired');
						setMessage(error.response.data.detail);
					}
				}

				Promise.reject(error.response && error.response.data);
				throw error;
			}
		);
	}, []);

	return (
		<>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				action={action}>
				<Alert
					onClose={handleClose}
					severity='error'
					variant='filled'
					sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
			{children}
		</>
	);
}
