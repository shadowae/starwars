import React from 'react';
import Stack from '@mui/material/Stack';
import './PersonalData.css';
import PeopleType from '../types/PeopleType';
import genderIcons from './img/gender';
import peopleImage from './img/people';
import fileImages from './img/films';
import {Avatar, Box, Card, Divider, Paper, Typography} from '@mui/material';
import useStarwarsStore from '../Zustand/StarwarsStore';
import VehicleType from '../types/VehicleType';
import FilmType from '../types/FilmType';

// Use the defined type for the data prop
interface PropsType {
    person: PeopleType;
}

const PersonalData: React.FC<PropsType> = ({ person }) => {
	const {vehiclesData, filmsData} = useStarwarsStore((state) => ({vehiclesData: state.vehicle, filmsData: state.films}),);
	const {defaultImage} = peopleImage;
	const {
		name,
		height,
		mass,
		hair_color,
		skin_color,
		eye_color,
		birth_year,
		gender,
	} = person;
 
	const getGenderIcon = (gender: string) => {
		const {maleIcon, femaleIcon, agenderIcon} = genderIcons;
		if (gender === 'male') {
			return (
				<img
					src={maleIcon}
					alt="Male"
					width={20}
				/>
			);
		} else if (gender === 'female') {
			return (
				<img
					src={femaleIcon}
					alt="Female"
					width={20}
				/>
			);
		} else {
			return (
				<img
					src={agenderIcon}
					alt="Unknown"
					width={20}
				/>
			);
		}
	};
	const getFilmSrc = (movieUrl: string): string => {
		const { SWmovie1, SWmovie2, SWmovie3, SWmovie4, SWmovie5, SWmovie6, SWmovie7, SWmovie8, SWmovie9 } = fileImages;
		
		switch (parseInt(movieUrl.slice(-2,-1))) {
		case 1:
			return SWmovie1;
		case 2:
			return SWmovie2;
		case 3:
			return SWmovie3;
		case 4:
			return SWmovie4;
		case 5:
			return SWmovie5;
		case 6:
			return SWmovie6;
		case 7:
			return SWmovie7;
		case 8:
			return SWmovie8;
		case 9:
			return SWmovie9;
		default:
			return '';
		}
	};
	
	const renderSliderContent = (contentList: VehicleType[] | FilmType[], srcFunction?: Function) => {
		return (
			<Stack direction="row" spacing={2} sx={{ minWidth: 0,overflowX: 'scroll', borderColor: 'black' }}>
				{contentList.map((content, index) => {
					let displayName;
					if ('title' in content) {
						displayName = `Episode ${content.episode_id}: ${content.title}`;
					} else {
						displayName = content.name;
					}
					return (
						<div className="movie" key={index}>
							{srcFunction &&<img src={srcFunction(content.url)} alt={'SW Movie 1'} className={'sw-movie-image'} width={50}/>}
							<div className="movie-name">
								{displayName}
							</div>
						</div>
					);
				})}
			</Stack>
		);
	};
 
	const getVehicleList = (personObjectList: string[]) => {
		return personObjectList.flatMap((object) => {
			return vehiclesData.filter((vehicle) => vehicle.url === object);
		});
	};
	
	const getFilmList = (personObjectList: string[]) => {
		return personObjectList.flatMap((object) => {
			return filmsData.filter((film) => film.url === object);
		}).sort((a,b) =>  a.episode_id - b.episode_id);
	};
	
	return (
		<Paper elevation={24}>
			<Stack
				direction="row"
				divider={<Divider orientation="vertical" flexItem />}
				spacing={2}
			>
				<Box className={'left-side'}>
					<Box sx={{ display: 'flex' }}>
						<Avatar
							src={defaultImage}
							alt="Person"
							sx={{
								width: 100, height: 100
							}}
						/>
						<Card
							elevation={0}
							sx={{
								paddingLeft: '15px',
								whiteSpace: 'nowrap'
							}}
						>
							<h3 >{name} {getGenderIcon(gender)}</h3>
							<Typography variant="caption" display="block" gutterBottom>
								<span>Image by <a href="https://www.freepik.com/free-photo/colorful-equal-rights-symbol-concept_6654425.htm#query=gender%20symbol&position=13&from_view=search&track=ais">Freepik</a></span>
							</Typography>
						</Card>
					</Box>
					<Box>
						<p className={'section-header'}>Details</p>
						<Stack>
							<div className="info">
								<div className="label">Height:</div>
								<div className="value">{height} cm</div>
							</div>
							<div className="info">
								<div className="label">Weight:</div>
								<div className="value">{mass} kg</div>
							</div>
							<Box sx={{textTransform: 'capitalize'}} className="info">
								<div className="label">Hair Color:</div>
								<div className="value">{hair_color}</div>
							</Box>
							<Box sx={{textTransform: 'capitalize'}} className="info">
								<div className="label">Skin Color:</div>
								<div className="value">{skin_color}</div>
							</Box>
							<div className="info">
								<div className="label">Birth Year:</div>
								<div className="value">{birth_year}</div>
							</div>
							<Box sx={{textTransform: 'capitalize'}} className="info">
								<div className="label">Eye Color:</div>
								<div className="value">{eye_color}</div>
							</Box>
						</Stack>
					</Box>
				</Box>
				<Stack padding={ '15px' } sx={{ overflowX: 'scroll', maxWidth: '90%', paddingRight: '15px'}}>
					<Box>
						<p className={'section-header'}>Movies Featured In</p>
						{renderSliderContent(getFilmList(person.films), getFilmSrc)}
					</Box>
					
					{person.vehicles.length > 0 && <Box>
						<p className={'section-header'}>Vehicles Used</p>
						{renderSliderContent(getVehicleList(person.vehicles))}
					</Box>}
				</Stack>
			</Stack>
		</Paper>
	);
};

export default PersonalData;
