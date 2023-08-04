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

interface StarwarsState {
    species: SpeciesType[],
    people: PeopleType[],
	films: FilmType[],
	vehicle: VehicleType[],
	fetchV: () => void,
}

const useStarwarsStore = create<StarwarsState>()(
	devtools(
		persist(
			(set) => ({
				species: DataSanitise,
				people: PeopleDemoData,
				films: FilmsData,
				vehicle: [],
				fetchV: async () => {
					const response = await fetchAllVehicleData();
					set({ vehicle: response });
				},
				fetchPeople: async () => {
					const response = await fetchAllPeopleData();
					set({ people: await response });
				},
			}),
			{
				name: 'starwars-storage',
			}
		)
	)
);

export default useStarwarsStore;
