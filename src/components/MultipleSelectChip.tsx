import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent}  from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {ReactNode} from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

interface MultipleSelectChipProps {
	label: string,
	selectList: string[],
	onSelect: (event: SelectChangeEvent<string[]>, child: ReactNode) => void;
	selected: string[]
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function MultipleSelectChip({label, selectList, onSelect, selected}: MultipleSelectChipProps) {
	const theme = useTheme();
	
	return (
		<div>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id="multiple-chip-label">{label}</InputLabel>
				<Select
					labelId={`multiple-chip-label-${label}`}
					id={`multiple-chip-${label}`}
					multiple
					value={selected}
					onChange={onSelect}
					input={<OutlinedInput id="select-multiple-chip" label={label} />}
					renderValue={(selected) => (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{selected.map((value) => (
								<Chip key={value} label={value} />
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{selectList.map((name) => (
						<MenuItem
							key={name}
							value={name}
							style={getStyles(name, selected, theme)}
						>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
