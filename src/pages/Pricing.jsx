import React from 'react';
import Header from '../components/Dashboard/Header';
import PlanContainer from '../components/Pricing/PlanContainer';
import PublicHeader from '../components/Landing/PublicHeader';
import { Container } from '@mui/material';

export default function Pricing() {
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
			<PlanContainer />
		</Container>
	);
}
