import axios from 'axios';
import StarshipType from '../types/StarshipType';
import { StateCreator } from 'zustand';
import {StarwarsState} from './SpaceSlice';

export interface StarshipSliceType {
	starshipPagination: StarshipType[],
	starshipPage: number,
	starshipNextPage: string | null,
	starshipPrevPage: string | null,
	fetchStarshipApi: () => void,
	fetchNextStarshipPage: () => void,
	fetchPrevStarshipPage: () => void,
}
const StarshipSlice: StateCreator<StarwarsState&StarshipSliceType, [['zustand/devtools', never], ['zustand/persist', never]], [], StarshipSliceType> = (set, get) => ({
	starshipPagination: [],
	starshipPage: 1,
	starshipNextPage: null,
	starshipPrevPage: null,
	
	fetchStarshipApi: async () => {
		const response = await axios.get('https://swapi.dev/api/starships');
		set({
			starshipPage: 1,
			starshipPagination: response.data.results,
			starshipNextPage: response.data.next,
			starshipPrevPage: response.data.previous,
		});
	},
	
	fetchNextStarshipPage: async () => {
		const nextPage = get().starshipNextPage;
		if (nextPage) {
			const response = await axios.get(nextPage);
			set({
				starshipPage: get().starshipPage + 1,
				starshipPagination: response.data.results,
				starshipNextPage: response.data.next,
				starshipPrevPage: response.data.previous,
			});
		}
	},
	
	fetchPrevStarshipPage: async () => {
		const prevPage = get().starshipPrevPage;
		if (prevPage) {
			const response = await axios.get(prevPage);
			set({
				starshipPage: get().starshipPage - 1,
				starshipPagination: response.data.results,
				starshipNextPage: response.data.next,
				starshipPrevPage: response.data.previous,
			});
		}
	},
});

export default StarshipSlice;
