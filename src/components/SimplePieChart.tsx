import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import capitalise from '../utils/capitalise';
import {Card, CardContent, CardHeader, Container} from '@mui/material';
import GenericPieChart from './GenericPieChart';
import PeopleType from '../types/PeopleType';
import SpeciesType from '../types/SpeciesType';
import getProcessedData from '../utils/getProcessedData';

ChartJS.register(ArcElement, Tooltip, Legend);
interface SimplePieChartProps {
    dataSet: PeopleType[] | SpeciesType[];
    path: string[];
    label?: string;
}

const colourPalette = [
	'RGB(244, 67, 54)', 'RGB(232, 30, 99)', 'RGB(156, 39, 176)', 'RGB(103, 58, 183)', 'RGB(63, 81, 181)',
	'RGB(33, 150, 243)', 'RGB(3, 169, 244)', 'RGB(0, 188, 212)', 'RGB(0, 150, 136)', 'RGB(76, 175, 80)',
	'RGB(139, 195, 74)', 'RGB(205, 220, 57)','RGB(255, 235, 59)', 'RGB(255, 193, 7)', 'RGB(255, 152, 0)',
	'RGB(255, 87, 34)', 'RGB(121, 85, 72)', 'RGB(158, 158, 158)', 'RGB(96, 125, 139)', 'RGB(0, 0, 0)'
];

function SimplePieChart(props: SimplePieChartProps) {
	const {dataSet, path, label} = props;
	const processedData: Map<string, number> = getProcessedData(dataSet, path);
	// Handle a large variety of data values
	if (Array.from (processedData.values()).length > 20) {
		return (
			<GenericPieChart dataSet={dataSet} path={path} label={label} selectionMethod={'dropdown'}/>
		);
	}
	const pieChartData = {
		labels: Array.from (processedData.keys()).map((item: string) => capitalise(item)),
		datasets: [
			{
				data: Array.from (processedData.values()),
				backgroundColor: colourPalette.slice(0,Array.from (processedData.values()).length+1),
				borderColor: ['rgb(0,0,0)'],
				borderWidth: 1,
			},
		],
	};
 
	const pieOptions = {
		animation: {
			animateRotate: true,
		},
	};
 
	return (
		<Container maxWidth={'xs'}>
			<Card>
				<CardHeader
					title={label}
					titleTypographyProps={{noWrap: true, gutterBottom: true}}
				/>
				<CardContent sx={{border:  '1px solid #ededed', borderRadius: '10px', margin: '0.5rem'}}>
					<Pie
						data={pieChartData}
						options={pieOptions}
						width={300}
						height={300}
					/>
				</CardContent>
			</Card>
		</Container>
	);
}

export default SimplePieChart;
