import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import SpeciesType from '../types/SpeciesType';
import DataSanitise from '../utils/DataSanitise';
import PeopleDemoData from '../mock/PeopleDemoData';
import {fetchAllPeopleData} from '../API/getPeople';
import PeopleType from '../types/PeopleType';
import FilmsData from '../mock/FilmsData';
import {fetchAllVehicleData} from '../API/getVehicles';
import VehicleType from '../types/VehicleType';
import FilmType from '../types/FilmType';
import {fetchAllStarshipData} from '../API/getStarships';
import StarshipType from '../types/StarshipType';

interface StarwarsState {
    species: SpeciesType[],
    people: PeopleType[],
	films: FilmType[],
	vehicle: VehicleType[],
	fetchVehicle: () => void,
	starship: StarshipType[],
	fetchStarship: () => void,
}

const useStarwarsStore = create<StarwarsState>()(
	devtools(
		persist(
			(set) => ({
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
			}),
			{
				name: 'starwars-storage',
			}
		)
	)
);

export default useStarwarsStore;
