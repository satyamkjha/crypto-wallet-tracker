import React from 'react';
import {
	Button,
	Container,
	Stack,
	Box,
	Divider,
	Typography,
	Drawer,
} from '@mui/material';
import { assetsURL } from '../../utils/assetsURL';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function PublicHeader() {
	const navigate = useNavigate();

	const isLoggedIn =
		localStorage.getItem('accessToken') &&
		localStorage.getItem('refreshToken') &&
		localStorage.getItem('user');

	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (state) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return false;
		}

		setOpen(state);
	};

	return (
		<Stack
			direction={'row'}
			justifyContent={'space-between'}
			alignItems={'center'}
			height={'100px'}
			width={'90%'}
			sx={{
				paddingY: '20px',
			}}>
			<Stack
				width={{
					xs: 'calc(100% - 60px)',
					sm: 'calc(100% - 60px)',
					md: '300px',
				}}
				direction={'row'}
				justifyContent={'center'}
				alignItems={'center'}
				height={'100%'}
				spacing={2}>
				<Box
					component='img'
					sx={{
						height: 42,
					}}
					src={`/static/logo.jpg`}
				/>
				<Divider
					style={{
						height: '50px',
					}}
					orientation='vertical'
					flexItem
					color='black'
				/>
				<Typography variant='h4'>Wallet Tracker</Typography>
			</Stack>
			<Box
				display={{
					xs: 'block',
					sm: 'block',
					md: 'block',
					lg: 'none',
				}}>
				<MenuIcon onClick={toggleDrawer(true)} />
			</Box>
			<Drawer
				sx={{
					height: '100vh',
					width: '100vw',
					overflow: 'hidden',
				}}
				anchor={'right'}
				open={open}
				onClose={toggleDrawer(false)}>
				<Box
					sx={{
						width: 250,
						padding: 5,
						height: '100vh',
					}}
					role='presentation'
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}>
					<Stack
						direction={'column'}
						justifyContent={'flex-start'}
						alignItems={'flex-start'}
						height={'fit-content'}
						spacing={5}
						display={'flex'}
						width={'fit-content'}>
						<Stack
							direction={'column'}
							justifyContent={'flex-start'}
							alignItems={'flex-start'}
							spacing={2}
							mb='50px'
							width={'fit-content'}>
							<Box
								component='img'
								sx={{
									height: 42,
								}}
								src={`/static/logo.jpg`}
							/>
							<Divider
								style={{
									width: '100%',
									height: '2px',
								}}
								orientation='vertical'
								flexItem
								color='black'
							/>
							<Typography variant='h4'>Wallet Tracker</Typography>
						</Stack>
						<Typography
							sx={{ cursor: 'pointer' }}
							onClick={() => navigate('/pricing')}
							variant='h6'>
							Pricing
						</Typography>

						<Typography
							onClick={() =>
								window.open('https://solidityscan.com/discover/', '_blank')
							}
							sx={{ cursor: 'pointer' }}
							variant='h6'>
							Blogs
						</Typography>

						<Button
							onClick={() => {
								window.open('mailto:info@credshields.com', '_blank');
							}}
							sx={{
								width: '150px',
							}}
							size='large'
							variant='contained'>
							Contact us
						</Button>
						<Button
							sx={{
								width: '150px',
							}}
							onClick={() => {
								navigate(isLoggedIn ? '/dashboard' : '/login');
							}}
							variant='outlined'
							size='large'>
							{isLoggedIn ? 'Go to Dashbaord' : 'Log In'}
						</Button>
					</Stack>
				</Box>
			</Drawer>

			<Stack
				direction={'row'}
				justifyContent={'center'}
				alignItems={'center'}
				height={'100%'}
				spacing={5}
				display={{
					xs: 'none',
					sm: 'none',
					md: 'none',
					lg: 'flex',
				}}
				width={'fit-content'}>
				<Typography
					sx={{ cursor: 'pointer' }}
					onClick={() => navigate('/pricing')}
					variant='h6'>
					Pricing{' '}
				</Typography>
				<Typography sx={{ cursor: 'pointer' }} variant='h6'>
					Blogs{' '}
				</Typography>
			</Stack>
			<Stack
				direction={'row'}
				justifyContent={'center'}
				alignItems={'center'}
				height={'100%'}
				spacing={5}
				display={{
					xs: 'none',
					sm: 'none',
					md: 'none',
					lg: 'flex',
				}}
				width={'fit-content'}>
				<Button
					onClick={() => {
						window.open('mailto:info@credshields.com', '_blank');
					}}
					sx={{
						width: '150px',
					}}
					size='large'
					variant='contained'>
					Contact us
				</Button>
				<Button
					sx={{
						width: '150px',
					}}
					onClick={() => {
						navigate(isLoggedIn ? '/dashboard' : '/login');
					}}
					variant='text'
					size='large'>
					{isLoggedIn ? 'Go to Dashbaord' : 'Log In'}
				</Button>
			</Stack>
		</Stack>
	);
}
