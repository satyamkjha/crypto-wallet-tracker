import {
	Avatar,
	Box,
	Button,
	Container,
	Fab,
	Stack,
	useMediaQuery,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
} from '@mui/material';
import React, { useState } from 'react';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { assetsURL } from '../../utils/assetsURL';
import DehazeIcon from '@mui/icons-material/Dehaze';

export default function Header({ selectedMenu }) {
	const navigate = useNavigate();
	const [MetaMaskAddress, setMetaMaskAddress] = useState('');

	const logout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('user');
		window.open('/login', '_self');
	};

	const isDesktop = useMediaQuery('(min-width:1000px)');

	const showAddress = useMediaQuery('(min-width:1300px)');

	const [openDrawer, setOpenDrawer] = useState(false);

	useEffect(() => {
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

		if (
			!localStorage.getItem('accessToken') ||
			!localStorage.getItem('refreshToken') ||
			!localStorage.getItem('user')
		) {
			navigate('/login');
		}
	}, []);

	return (
		<Container maxWidth={'80vw'} sx={{ maxWidth: '1800px', width: '95vw' }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
				pt={2}>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					{!isDesktop && (
						<Fab
							sx={{
								borderRadius: 1,
								boxShadow: 'none',
								border: '2px solid #00000060',
								backgroundColor: '#FFFFFF',
								marginRight: 2,
							}}
							onClick={() => {
								setOpenDrawer(true);
							}}>
							<DehazeIcon />
						</Fab>
					)}
					<Box
						component='img'
						sx={{
							height: 42,
							marginTop: 1,
						}}
						src={`${assetsURL}logo.jpg`}
					/>
				</Box>
				<Drawer
					anchor={'left'}
					open={openDrawer}
					onClose={() => setOpenDrawer(false)}>
					<Box
						sx={{
							width: 250,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-start',
							alignItems: 'flex-start',
							marginTop: 3,
						}}
						role='presentation'
						onClick={() => setOpenDrawer(false)}>
						<Box
							component='img'
							sx={{
								height: 42,
								marginBottom: 4,
								marginLeft: 3,
							}}
							src={`${assetsURL}logo.jpg`}
						/>
						<List>
							<ListItem
								sx={{
									marginBottom: 2,
								}}
								disablePadding>
								<ListItemButton
									onClick={() => {
										navigate('/dashboard');
									}}>
									<ListItemIcon>
										<GridViewRoundedIcon />
									</ListItemIcon>
									<ListItemText primary={'Dashboard'} />
								</ListItemButton>
							</ListItem>
							<ListItem
								sx={{
									marginBottom: 2,
								}}
								disablePadding>
								<ListItemButton
									onClick={() => {
										navigate('/billing');
									}}>
									<ListItemIcon>
										<LocalOfferRoundedIcon />
									</ListItemIcon>
									<ListItemText primary={'Billing'} />
								</ListItemButton>
							</ListItem>
							<ListItem
								sx={{
									marginBottom: 2,
								}}
								disablePadding>
								<ListItemButton
									onClick={() => {
										navigate('/notifications');
									}}>
									<ListItemIcon>
										<NotificationsActiveRoundedIcon />
									</ListItemIcon>
									<ListItemText primary={'Notifications'} />
								</ListItemButton>
							</ListItem>
							{MetaMaskAddress === '' && (
								<ListItem
									sx={{
										marginBottom: 2,
									}}
									disablePadding>
									<ListItemButton
										onClick={() => {
											navigate('/settings');
										}}>
										<ListItemIcon>
											<SettingsRoundedIcon />
										</ListItemIcon>
										<ListItemText primary={'Settings'} />
									</ListItemButton>
								</ListItem>
							)}
						</List>
					</Box>
				</Drawer>

				{isDesktop && (
					<Stack direction='row' spacing={2}>
						<Button
							startIcon={<GridViewRoundedIcon />}
							variant='text'
							sx={{
								backgroundColor: selectedMenu === 0 && 'background.neutral',
								borderRadius: selectedMenu === 0 && 0.8,
							}}
							onClick={() => {
								navigate('/dashboard');
							}}>
							Dashboard
						</Button>

						<Button
							startIcon={<LocalOfferRoundedIcon />}
							variant='text'
							sx={{
								backgroundColor: selectedMenu === 1 && 'background.neutral',
								borderRadius: selectedMenu === 1 && 0.8,
							}}
							onClick={() => {
								navigate('/billing');
							}}>
							Billing
						</Button>

						<Button
							startIcon={<NotificationsActiveRoundedIcon />}
							variant='text'
							sx={{
								backgroundColor: selectedMenu === 2 && 'background.neutral',
								borderRadius: selectedMenu === 2 && 0.8,
							}}
							onClick={() => {
								navigate('/notifications');
							}}>
							Notifications
						</Button>

						{MetaMaskAddress === '' && (
							<Button
								startIcon={<SettingsRoundedIcon />}
								variant='text'
								sx={{
									backgroundColor: selectedMenu === 3 && 'background.neutral',
									borderRadius: selectedMenu === 3 && 0.8,
								}}
								onClick={() => {
									navigate('/settings');
								}}>
								Settings
							</Button>
						)}
					</Stack>
				)}

				<Box sx={{ display: 'flex', alignItems: 'stretch' }}>
					{/* <Fab size='small' sx={{ marginRight: 1, borderRadius: 1, backgroundColor: 'secondary.main', color: 'white', boxShadow: 'none' }}>
                        <PhotoCameraIcon />
                    </Fab> */}
					{MetaMaskAddress !== '' && showAddress && (
						<Box
							sx={{
								border: 'solid',
								borderWidth: 0.3,
								borderColor: 'gray',
								borderRadius: 1,
								display: 'flex',
								alignItems: 'center',
							}}
							pr={2}
							pl={2}
							mr={2}>
							<Avatar
								sx={{ width: 24, height: 24, marginRight: 1 }}
								size='sm'
								src={
									'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg'
								}
							/>
							{MetaMaskAddress}
						</Box>
					)}

					<Button
						onClick={() => {
							logout();
						}}
						variant='outlined'
						color='error'
						sx={{ backgroundColor: 'error.lighter' }}>
						Log out
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
