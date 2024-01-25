import { useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { useSnackbar } from '@mui/base';
import { css, styled } from '@mui/system';
import React from 'react';

export default function ErrorHandler({ children }) {
	const [open, setOpen] = React.useState(false);
	const [message, setMessage] = React.useState('');

	const logout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('user');
		window.open('/login', '_self');
	};

	const handleClose = () => {
		setOpen(false);
	};

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
					// window.open('/500', '_self');
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
						// window.open(
						// 	'/pricing?open_subscription_expired_dialog=True',
						// 	'_self'
						// );
					}
				}

				Promise.reject(error.response && error.response.data);
				throw error;
			}
		);
	}, []);

	return <>{children}</>;
}
