import React from 'react';
import Header from '../components/Dashboard/Header';
import PlanContainer from '../components/Pricing/PlanContainer';

export default function Billing() {
	return (
		<>
			<Header selectedMenu={1} />
			<PlanContainer />
		</>
	);
}
