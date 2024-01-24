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
import { assetsURL } from '../utils/assetsURL';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PublicHeader from '../components/Landing/PublicHeader';
import PublicFooter from '../components/Landing/PublicFooter';

export default function Landing() {
	const navigate = useNavigate();
	const benefitsData = [
		{
			heading: 'Transaction Visualization',
			body: 'Find mapped visualised connections across multiple wallet addresses, helping you connect the dots between on chain transactions. Snoop freely!',
			imgLink: 'benefits_1',
		},
		{
			heading: 'Entity Analysis',
			body: 'Analyze holdings & transactions for all wallet addresses and the ones linked to them. Track anonymously',
			imgLink: 'benefits_2',
		},
		{
			heading: 'Wallet Tagging',
			body: 'Added features to color tag nodes & add custom notes to help you investigate efficiently. Detective Mode',
			imgLink: 'benefits_3',
		},
		{
			heading: 'Address Monitoring',
			body: 'Set custom alerts to track wallet addresses & transactions linked to those via email. Stay Notified!',
			imgLink: 'benefits_4',
		},
		{
			heading: 'Multiple Networks',
			body: 'Freely track wallet addresses across multiple ecosystems including Ethereum, Polygon & Binance. More coming soon!',
			imgLink: 'benefits_5',
		},
	];

	return (
		<Container
			maxWidth='xxl'
			style={{
				height: '100vh',
				width: '100vw',
				display: 'flex',
				justifyContent: 'flex-start',
				alignItems: 'center',
				flexDirection: 'column',
				margin: 0,
				padding: 0,
				overflowX: 'hidden',
			}}>
			<PublicHeader />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignItems: 'center',
					width: '100%',
					height: 'fit-content',
					paddingTop: {
						xs: '30px',
						sm: '50px',
						md: '100px',
						lg: '120px',
					},
					textAlign: 'center',
				}}>
				<Typography fontWeight={900} variant='h2'>
					Empower your Investigations{' '}
				</Typography>
				<Typography
					width={'90%'}
					marginTop={'30px'}
					marginBottom={'50px'}
					maxWidth={'500px'}
					variant='body1'
					display={{
						xs: 'none',
						sm: 'none',
						md: 'flex',
					}}
					color={'#00000060'}>
					Visualize complex transaction networks, identify entities, assess
					risk, and track investigations - all in one intuitive platform.
				</Typography>
				<Box
					display={{
						xs: 'none',
						sm: 'none',
						md: 'flex',
						lg: 'flex',
						xl: 'flex',
					}}>
					<Button
						marginTop={'30px'}
						onClick={() => {
							navigate('/signup');
						}}
						sx={{
							width: '250px',
						}}
						size='large'
						variant='contained'>
						SignUp for Free Trial
					</Button>
				</Box>
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					height={'fit-content'}
					width={'90%'}
					marginTop={{
						xs: '30px',
						sm: '50px',
						md: '-50px',
						lg: '-100px',
					}}
					maxWidth={'1600px'}>
					<Box
						component='img'
						sx={{
							height: 'auto',
							maxWidth: '650px',
							width: '40%',
						}}
						src={`/static/images/hero_left.svg`}
					/>
					<Box
						component='img'
						sx={{
							height: 'auto',
							maxWidth: '650px',
							width: '40%',
						}}
						src={`/static/images/hero_right.svg`}
					/>
				</Stack>
				<Typography
					width={'90%'}
					marginTop={'30px'}
					marginBottom={'50px'}
					maxWidth={'500px'}
					variant='body1'
					display={{
						xs: 'flex',
						sm: 'flex',
						md: 'none',
					}}
					color={'#00000060'}>
					Visualize complex transaction networks, identify entities, assess
					risk, and track investigations - all in one intuitive platform.
				</Typography>
				<Box
					display={{
						xs: 'flex',
						sm: 'flex',
						md: 'none',
						lg: 'none',
						xl: 'none',
					}}>
					<Button
						marginTop={'30px'}
						onClick={() => {
							navigate('/signup');
						}}
						sx={{
							width: '250px',
						}}
						size='large'
						variant='contained'>
						SignUp for Free Trial
					</Button>
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignItems: 'center',
					width: '100%',
					height: 'fit-content',
					paddingTop: '120px',
					textAlign: 'center',
				}}>
				<Typography fontWeight={700} variant='h3'>
					Key Features
				</Typography>
				<Typography
					marginTop={'30px'}
					marginBottom={'50px'}
					maxWidth={'500px'}
					variant='body1'
					width={'90%'}
					color={'#00000060'}>
					Visualize complex transaction networks, identify entities, assess
					risk, and track investigations - all in one intuitive platform.
				</Typography>
				<Stack
					direction={'row'}
					justifyContent={'center'}
					alignItems={'center'}
					height={'fit-content'}
					flexWrap={'wrap'}
					width={'90%'}
					sx={{
						paddingY: '20px',
					}}>
					<Stack
						direction={'column'}
						justifyContent={'flex-start'}
						alignItems={'center'}
						height={'fit-content'}
						flexWrap={'wrap'}
						width={'250px'}
						sx={{
							padding: '40px',
						}}>
						<Box
							component='img'
							sx={{
								height: 'auto',
								width: '100%',
							}}
							src={`static/images/key_1.svg`}
						/>
						<Typography marginTop={'30px'} marginBottom={'50px'} variant='h6'>
							Transaction Visualization
						</Typography>
					</Stack>
					<Stack
						direction={'column'}
						justifyContent={'flex-start'}
						alignItems={'center'}
						height={'fit-content'}
						flexWrap={'wrap'}
						width={'250px'}
						sx={{
							padding: '40px',
						}}>
						<Box
							component='img'
							sx={{
								height: 'auto',
								width: '100%',
							}}
							src={`static/images/key_2.svg`}
						/>
						<Typography marginTop={'30px'} marginBottom={'50px'} variant='h6'>
							Entity Analysis
						</Typography>
					</Stack>
					<Stack
						direction={'column'}
						justifyContent={'flex-start'}
						alignItems={'center'}
						height={'fit-content'}
						flexWrap={'wrap'}
						width={'250px'}
						sx={{
							padding: '40px',
						}}>
						<Box
							component='img'
							sx={{
								height: 'auto',
								width: '100%',
							}}
							src={`static/images/key_3.svg`}
						/>
						<Typography marginTop={'30px'} marginBottom={'50px'} variant='h6'>
							Wallet Tagging
						</Typography>
					</Stack>
					<Stack
						direction={'column'}
						justifyContent={'flex-start'}
						alignItems={'center'}
						height={'fit-content'}
						flexWrap={'wrap'}
						width={'250px'}
						sx={{
							padding: '40px',
						}}>
						<Box
							component='img'
							sx={{
								height: 'auto',
								width: '100%',
							}}
							src={`static/images/key_4.svg`}
						/>
						<Typography marginTop={'30px'} marginBottom={'50px'} variant='h6'>
							Address Monitoring
						</Typography>
					</Stack>
					<Stack
						direction={'column'}
						justifyContent={'flex-start'}
						alignItems={'center'}
						height={'fit-content'}
						flexWrap={'wrap'}
						width={'250px'}
						sx={{
							padding: '40px',
						}}>
						<Box
							component='img'
							sx={{
								height: 'auto',
								width: '100%',
							}}
							src={`static/images/key_5.svg`}
						/>
						<Typography marginTop={'30px'} marginBottom={'50px'} variant='h6'>
							Multiple Networks
						</Typography>
					</Stack>
				</Stack>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignItems: 'center',
					width: '100%',
					height: 'fit-content',
					paddingTop: '120px',
					textAlign: 'center',
				}}>
				<Typography fontWeight={700} variant='h3'>
					Benefits Features
				</Typography>
				<Typography
					marginTop={'30px'}
					marginBottom={'50px'}
					maxWidth={'600px'}
					width={'90%'}
					variant='body1'
					color={'#00000060'}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante
					vel nulla consequat venenatis quis sit amet justo. Maecenas vitae
					vehicula mauris.
				</Typography>
				<Box
					display={'flex'}
					// flexDir="column"
					alignItems='center'
					justifyContent={'flex-start'}
					w={'80%'}
					px={[0, 0, 0]}
					py={10}
					my={10}
					borderRadius={20}
					background={'#FFFFFF'}>
					<Swiper
						slidesPerView={'auto'}
						navigation={true}
						centeredSlides={true}
						spaceBetween={0}
						modules={[Navigation, Pagination]}
						style={{
							width: '80%',
							height: 'fit-content',
							maxWidth: '1600px',
						}}>
						{benefitsData.map((item) => (
							<SwiperSlide
								style={{
									width: '100%',
									height: 'fit-content',
									opacity: 1,
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
								}}>
								<Stack
									direction={{
										xs: 'column-reverse',
										sm: 'column-reverse',
										md: 'row',
									}}
									justifyContent={'space-between'}
									alignItems={'center'}
									height={'fit-content'}
									width={{
										xs: '90%',
										sm: '90%',
										md: '90%',
										lg: '80%',
									}}
									sx={{
										paddingY: '20px',
									}}>
									<Stack
										direction={'column'}
										justifyContent={'center'}
										alignItems={'flex-start'}
										height={'300px'}
										width={{
											xs: '80%',
											sm: '80%',
											md: '40%',
										}}
										textAlign={{
											xs: 'center',
											sm: 'center',
											md: 'left',
										}}
										sx={{
											paddingY: '20px',
										}}>
										<Typography width={'100%'} fontWeight={700} variant='h6'>
											{item.heading}
										</Typography>
										<Typography
											marginTop={'30px'}
											marginBottom={'50px'}
											maxWidth={'500px'}
											variant='body1'
											color={'#00000060'}>
											{item.body}
										</Typography>
									</Stack>
									<Box
										component='img'
										sx={{
											height: 'auto',
											width: {
												xs: '80%',
												sm: '80%',
												md: '40%',
											},
										}}
										src={`/static/images/${item.imgLink}.svg`}
									/>
								</Stack>
							</SwiperSlide>
						))}
					</Swiper>
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignItems: 'center',
					width: '100%',
					height: 'fit-content',
					paddingY: '120px',
					textAlign: 'center',
				}}>
				<Stack
					direction={{
						xs: 'column-reverse',
						sm: 'column-reverse',
						md: 'row',
					}}
					justifyContent={'space-between'}
					alignItems={'center'}
					height={'fit-content'}
					width={'90%'}
					maxWidth={'1200px'}>
					<Stack
						direction={'column'}
						justifyContent={'flex-start'}
						alignItems={'flex-start'}
						height={'300px'}
						maxWidth={'400px'}
						width={{
							xs: '90%',
							sm: '90%',
							md: '40%',
						}}
						textAlign={'left'}
						sx={{
							paddingY: '20px',
						}}>
						<Typography fontWeight={700} variant='h1'>
							Questions? Let’s talk
						</Typography>
					</Stack>
					<Stack
						direction={'column'}
						justifyContent={'flex-start'}
						alignItems={'flex-start'}
						height={'300px'}
						maxWidth={'400px'}
						width={{
							xs: '90%',
							sm: '90%',
							md: '40%',
						}}
						textAlign={'left'}
						sx={{
							paddingY: '20px',
						}}>
						<Typography
							marginTop={'30px'}
							marginBottom={'50px'}
							maxWidth={'500px'}
							variant='body1'
							color={'#00000060'}>
							Contact us through our 24/7 live chat. We’re always happy to help!
						</Typography>

						<Button
							marginTop={'30px'}
							onClick={() => {}}
							sx={{
								width: '250px',
							}}
							size='large'
							variant='contained'>
							Get Started
						</Button>
					</Stack>
				</Stack>
			</Box>
			<PublicFooter />
		</Container>
	);
}
