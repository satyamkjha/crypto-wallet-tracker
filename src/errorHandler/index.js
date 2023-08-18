import { useEffect } from 'react';
import axiosInstance from '../utils/axios';

export default function ErrorHandler({ children }) {
	useEffect(() => {
		axiosInstance.interceptors.response.use(
			(response) => {
				return response;
			},

			(error) => {
				console.log(error.response);

				if (error.toJSON().message === 'Network Error') {
					console.log('no internet connection');
				}

				if (error.toJSON().status === 500) {
					console.log('500 Error');
					// window.open('/500', '_self');
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
