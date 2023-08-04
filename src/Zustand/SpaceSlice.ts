import StarshipType from '../types/StarshipType';
import { StateCreator } from 'zustand';
import SpeciesType from '../types/SpeciesType';
import PeopleType from '../types/PeopleType';
import FilmType from '../types/FilmType';
import VehicleType from '../types/VehicleType';
import {StarshipSliceType} from './StarshipSlice';
import DataSanitise from '../utils/DataSanitise';
import PeopleDemoData from '../mock/PeopleDemoData';
import FilmsData from '../mock/FilmsData';
import {fetchAllVehicleData} from '../API/getVehicles';
import {fetchAllStarshipData} from '../API/getStarships';
import {fetchAllPeopleData} from '../API/getPeople';

export interface StarwarsState {
	species: SpeciesType[],
	people: PeopleType[],
	films: FilmType[],
	vehicle: VehicleType[],
	fetchVehicle: () => void,
	starship: StarshipType[],
	fetchStarship: () => void,
}
const StarshipSlice: StateCreator<StarwarsState&StarshipSliceType, [['zustand/devtools', never], ['zustand/persist', never]], [], StarwarsState> = (set) => ({
	species: DataSanitise,
	people: PeopleDemoData,
	films: FilmsData,
	vehicle: [],
	starship: [],
	fetchVehicle: async () => {
		const response = await fetchAllVehicleData();
		set({ vehicle: response });
	},
	fetchStarship: async () => {
		const response = await fetchAllStarshipData();
		set({ starship: response });
	},
	fetchPeople: async () => {
		const response = await fetchAllPeopleData();
		set({ people: response });
	},
});

export default StarshipSlice;
