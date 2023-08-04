import axios from 'axios';
import StarshipType from '../types/StarshipType';
export async function fetchAllStarshipData(url: string = 'https://swapi.dev/api/starships', accumulatedData: StarshipType[] = []): Promise<StarshipType[]> {
	try {
		const response = await axios.get(url);
		const data = response.data;
		const newData = [...accumulatedData, ...data.results];

		if (data.next) {
			return fetchAllStarshipData(data.next, newData);
		}

		return newData;
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
}
