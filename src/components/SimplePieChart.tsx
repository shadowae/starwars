import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
// import capitalise from '../utils/capitalise';
import {Card, CardContent, CardHeader, Container} from '@mui/material';
// import GenericPieChart from './GenericPieChart';
import PeopleType from '../types/PeopleType';
import SpeciesType from '../types/SpeciesType';
import getProcessedData from '../utils/getProcessedData';
import MultipleSelectChip from './MultipleSelectChip';
import {SelectChangeEvent} from '@mui/material/Select';

ChartJS.register(ArcElement, Tooltip, Legend);
interface SimplePieChartProps {
    dataSet: PeopleType[] | SpeciesType[];
    path: string[];
    label?: string;
	multiSelect?: boolean;
	height? : number;
	width? : number;
}

const colourPalette = [
	'RGB(244, 67, 54)', 'RGB(232, 30, 99)', 'RGB(156, 39, 176)', 'RGB(103, 58, 183)', 'RGB(63, 81, 181)',
	'RGB(33, 150, 243)', 'RGB(3, 169, 244)', 'RGB(0, 188, 212)', 'RGB(0, 150, 136)', 'RGB(76, 175, 80)',
	'RGB(139, 195, 74)', 'RGB(205, 220, 57)','RGB(255, 235, 59)', 'RGB(255, 193, 7)', 'RGB(255, 152, 0)',
	'RGB(255, 87, 34)', 'RGB(121, 85, 72)', 'RGB(158, 158, 158)', 'RGB(96, 125, 139)', 'RGB(0, 0, 0)'
];

const getValuesFromSelected = (selected: string[], processedData: Map<string, number>) => {
	// given selected array elements as key to map to processedData and return corresponding values only
	return selected.map((item: string) => processedData.get(item));
};

function SimplePieChart(props: SimplePieChartProps) {
	const {
		dataSet, path, label, multiSelect = false,
		height, width
	} = props;
	const processedData: Map<string, number> = getProcessedData(dataSet, path);
	const valueArray = Array.from (processedData.values());
	const keyArray = Array.from (processedData.keys());
	// TODO: handle large data set without multiple selects
	const [selected, setSelected] = React.useState<string[]>(multiSelect ? keyArray.slice(0,5) : []);
	
	const handleSelectChange = (event: SelectChangeEvent<typeof selected>) => {
		const {
			target: { value },
		} = event;
		setSelected(
			typeof value === 'string' ? value.split(',') : value,
		);
	};
	
	const pieChartData = {
		labels:  multiSelect ? selected: keyArray,
		datasets: [
			{
				data: multiSelect ? getValuesFromSelected(selected, processedData) : valueArray,
				backgroundColor: colourPalette.slice(0,keyArray.length+1),
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
					subheader={multiSelect && <MultipleSelectChip label={label || ''} selectList={keyArray} selected={selected} onSelect={handleSelectChange}/>}
				/>
				<CardContent sx={{border:  '1px solid #ededed', borderRadius: '10px', margin: '0.5rem'}}>
					<Pie
						data={pieChartData}
						options={pieOptions}
						width={width || 300}
						height={height || 300}
					/>
				</CardContent>
			</Card>
		</Container>
	);
}

export default SimplePieChart;
