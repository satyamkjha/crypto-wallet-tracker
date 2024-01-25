import React from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { assetsURL } from '../../utils/assetsURL';
import { useNavigate } from 'react-router-dom';

export default function PublicFooter() {
	const navigate = useNavigate();

	const footerIcons = [
		{
			imgUrl: 'medium',
			link: 'https://blog.solidityscan.com/',
		},
		{
			imgUrl: 'telegram',
			link: 'https://t.me/solidityscan',
		},
		{
			imgUrl: 'discord',
			link: 'https://discord.com/invite/9HhV4hGENw',
		},
		{
			imgUrl: 'instagram',
			link: 'https://www.instagram.com/credshields/',
		},
		{
			imgUrl: 'twitter',
			link: 'https://twitter.com/CredShields',
		},
	];
	return (
		<>
			<Divider
				width='90%'
				color='#000000'
				sx={{
					opacity: 0.2,
				}}
			/>
			<Stack
				direction={{
					xs: 'column',
					sm: 'column',
					md: 'row',
				}}
				justifyContent={{
					xs: 'flex-start',
					sm: 'flex-start',
					md: 'space-between',
				}}
				alignItems={'center'}
				height={{
					xs: 'fit-content',
					md: 'fit-content',
					md: '130px',
				}}
				width={'90%'}
				sx={{
					paddingY: '20px',
				}}>
				<Stack
					direction={'row'}
					justifyContent={'center'}
					alignItems={'center'}
					height={'fit-content'}
					spacing={2}
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
							height: '50px',
						}}
						orientation='vertical'
						flexItem
						color='black'
					/>
					<Typography variant='h4'>Wallet Tracker</Typography>
				</Stack>
				<Stack
					direction={'column'}
					marginTop={{
						xs: '30px',
						sm: '30px',
						lg: '30px',
					}}
					justifyContent={'center'}
					alignItems={'flex-end'}
					marginBottom={{
						xs: '30px',
						sm: '30px',
					}}
					height={'100%'}
					width={'fit-content'}>
					<Stack
						direction={{
							xs: 'column',
							sm: 'column',
							md: 'row',
						}}
						justifyContent={{
							xs: 'flex-start',
							sm: 'flex-start',
							md: 'center',
						}}
						alignItems={'flex-start'}
						height={'fit-content'}
						spacing={5}
						width={{ xs: '100%', sm: '100%', md: 'fit-content' }}>
						<Typography
							sx={{ cursor: 'pointer' }}
							onClick={() => navigate('/pricing')}
							variant='h6'>
							Pricing{' '}
						</Typography>
						<Typography sx={{ cursor: 'pointer' }} variant='h6'>
							Case Studies{' '}
						</Typography>
						<Typography sx={{ cursor: 'pointer' }} variant='h6'>
							Blogs{' '}
						</Typography>
						<Typography sx={{ cursor: 'pointer' }} variant='h6'>
							Terms of Use{' '}
						</Typography>
					</Stack>
					<Stack
						direction={'row'}
						justifyContent={{
							xs: 'flex-start',
							sm: 'flex-start',
							md: 'flex-end',
						}}
						alignItems={'center'}
						marginTop={'10px'}
						height={'fit-content'}
						spacing={2}
						width={'fit-content'}>
						{footerIcons.map((item) => (
							<Box
								component='img'
								sx={{
									height: 42,
								}}
								onClick={() => {
									window.open(item.link, '_blank');
								}}
								src={`${assetsURL}landing/socials/${item.imgUrl}.svg`}
							/>
						))}
					</Stack>
				</Stack>
			</Stack>
		</>
	);
}
