import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import SpeciesType from '../types/SpeciesType';
import PeopleType from '../types/PeopleType';

interface GenericBarChartProps {
    dataSet: SpeciesType[] | PeopleType [];
	title?: string;
	dataPoint: string[];
}

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const colorOption = [
	['rgba(255,99,132)','rgba(255,99,132,0.5)'],
	['rgb(53,162,235)','rgb(53,162,235,0.5)']
];

const mapLabels = (data: any[])=> {
	return data.map(item => item.name);
};

const mapData = (data: SpeciesType[] | { [x: string]: any; }[], key: string) => {
	return data.map((item: { [x: string]: any; }) => parseInt(item[key]));
};

const getDataSet = (dataSet: SpeciesType[] | { [x: string]: any; }[], dataPoint: string[]) => {
	return dataPoint.map((item: string, index: number) => {
		return {
			label: dataPoint[0],
			data: mapData(dataSet, item),
			backgroundColor: colorOption[index][0],
			borderWidth: 2,
			borderRadius: 75,
			borderColor: colorOption[index][1],
		};
	});
};


export function SimpleBarChart(props: GenericBarChartProps) {
	const {dataSet, title, dataPoint}= props;
	let delayed: boolean;
	const options = {
		responsive: true,
		animation: {
			onComplete: () => {
				delayed = true;
			},
			delay: (context: { type: string; mode: string; dataIndex: number; datasetIndex: number; }) => {
				let delay = 0;
				if (context.type === 'data' && context.mode === 'default' && !delayed) {
					delay = context.dataIndex * 300 + context.datasetIndex * 100;
				}
				return delay;
			},
		},
		plugins: {
			legend: {
				position: 'bottom' as const,
			},
			title: {
				display: true,
				text: title,
			},
		},
		scale:{
			y: {
				suggestedMin: 0,
				// @ts-ignore
				suggestedMax: dataSet.reduce((max: number, item) => Math.max(max, parseFloat(item[dataPoint[0]])), -Infinity) + 20,
				type: 'category',
				offset: true,
				grid: {
					offset: true
				},
				ticks: {
					stepSize: 10 // Set the interval of the x-axis to 10
				}
			}
		}
	};
	

	const data = {
		labels: mapLabels(dataSet),
		datasets: getDataSet(dataSet,dataPoint),
	};
	return <Bar options={options} data={data} />;
}
