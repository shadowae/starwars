import React from 'react';
import {Container, Paper, Typography} from '@mui/material';
import Stack from '@mui/material/Stack';
import {SimpleBarChart} from './components/SimpleBarChart';
import './Species.css';
import GenericPieChart from './components/GenericPieChart';
import useStarwarsStore from './Zustand/StarwarsStore';
import SimplePieChart from './components/SimplePieChart';
const Species = () => {
	const speciesData = useStarwarsStore(state => state.species);
	
	return (
		<Container sx={{backgroundColor: '#E5E5E5'}} maxWidth="xl">
			<Stack spacing={3}>
				<Typography variant={'h4'}>
                    Star Wars - Species
				</Typography>
				<Stack useFlexGap spacing={1} direction={'row'}>
					<GenericPieChart label={'Species Language Breakdown'} dataSet={speciesData} path={['language']} selectionMethod={'dropdown'}/>
					<GenericPieChart label={'Species Classification Breakdown'} dataSet={speciesData} path={['classification']} selectionMethod={'buttons'}/>
					<GenericPieChart label={'Species Designation Breakdown'} dataSet={speciesData} path={['designation']} selectionMethod={'buttons'}/>
				</Stack>
				<Stack useFlexGap spacing={1} direction={'row'}>
					<SimplePieChart label={'Eye Colors Breakdown'} dataSet={speciesData} path={['eye_colors']} />
					<SimplePieChart label={'Classification Breakdown'} dataSet={speciesData} path={['classification']} />
					<SimplePieChart label={'Designation Breakdown'} dataSet={speciesData} path={['designation']} />
				</Stack>
				<Stack>
					<SimplePieChart label={'Skin Colors Breakdown'} dataSet={speciesData} path={['skin_colors']}  multiSelect/>
				</Stack>
				<Container>
					<Paper sx={{width: '90%', border: '5px dashed aquamarine', marginX: 'auto'}}>
						<SimpleBarChart title={'Starwars Species Chart'} dataSet={speciesData} dataPoint={['average_height', 'average_lifespan']}/>
					</Paper>
				</Container>
			</Stack>
		</Container>
	);
};

export default Species;
