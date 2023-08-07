import React, {useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import {AccordionDetails, AccordionSummary, Container, Paper, Typography} from '@mui/material';
import useStarwarsStore from './Zustand/StarwarsStore';
import PersonalData from './components/PersonalData';
import PeopleType from './types/PeopleType';
import './People.css';
import Stack from '@mui/material/Stack';
import SimplePieChart from './components/SimplePieChart';
import {SimpleBarChart} from './components/SimpleBarChart';

const People = () => {
	const { peopleData, fetchVehicle, fetchStarship } = useStarwarsStore(
		(state) => ({ peopleData: state.people, fetchVehicle: state.fetchVehicle, fetchStarship: state.fetchStarship }),);
	useEffect(() => {
		fetchVehicle();
		fetchStarship();
	}, [fetchVehicle, fetchStarship]);
	return (
		<Container sx={{backgroundColor: '#E5E5E5'}} maxWidth="xl">
			<Stack spacing={3}>
				<Typography variant={'h4'}>
					Star Wars - People
				</Typography>
			</Stack>
			
			<Stack useFlexGap direction={'row'} spacing={2} paddingY={'15px'}>
				<SimplePieChart label={'Gender Breakdown'} dataSet={peopleData} path={['gender']}/>
				<SimplePieChart label={'Eye Color Breakdown'} dataSet={peopleData} path={['eye_color']}/>
				<SimplePieChart label={'Skin Color Breakdown'} dataSet={peopleData} path={['skin_color']}/>
			</Stack>
			<Container>
				<Paper sx={{width: '90%', border: '5px dashed aquamarine', marginX: 'auto'}}>
					<SimpleBarChart dataSet={peopleData} dataPoint={['height', 'mass']}/>
				</Paper>
			</Container>
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
