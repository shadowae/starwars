import axios from 'axios';
import VehicleType from '../types/VehicleType';
export async function fetchAllVehicleData(url: string = 'https://swapi.dev/api/vehicles', accumulatedData: VehicleType[] = []): Promise<VehicleType[]> {
	try {
		const response = await axios.get(url);
		const data = response.data;
		const newData = [...accumulatedData, ...data.results];

		if (data.next) {
			return fetchAllVehicleData(data.next, newData);
		}

		return newData;
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
}
