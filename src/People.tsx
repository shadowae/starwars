import React, {useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import {AccordionDetails, AccordionSummary, Container, Typography} from '@mui/material';
import useStarwarsStore from './Zustand/StarwarsStore';
import PersonalData from './components/PersonalData';
import PeopleType from './types/PeopleType';
import './People.css';

const People = () => {
	const { peopleData, fetchV } = useStarwarsStore(
		(state) => ({ peopleData: state.people, fetchV: state.fetchV }),);
	useEffect(() => {
		fetchV();
	}, [fetchV]);
	return (
		<Container sx={{backgroundColor: '#E5E5E5'}} maxWidth="xl">
			<Typography variant={'h4'}>
                Star Wars - People
			</Typography>
			{peopleData.map((person: PeopleType, index: number) => (
				<Accordion key={index}>
					<AccordionSummary>
						{person.name}
					</AccordionSummary>
					<AccordionDetails>
						<PersonalData person={person}/>
					</AccordionDetails>
				</Accordion>
			))}
		</Container>
	);
};

export default People;
