// @ts-nocheck
const addToMap = (map: Map<string, number>, key: string, value: number) => {
	if(map.has(key)) {
		map.set(key, map.get(key) + value);
	} else {
		map.set(key, value);
	}
};
const getProcessedData = (dataSet: object[], path: string[]): Map<string, number> => {
	const counter = new Map();
	
	for (const item of dataSet) {
		let propertyValue = item;
		
		// Traverse the nested path to get the property value
		for (const key of path) {
			propertyValue = propertyValue[key];
			if (!propertyValue) {
				break;
			}
		}
		
		if (propertyValue && propertyValue.includes(',')) {
			const splitElement = propertyValue.split(', ');
			for (const element of splitElement) {
				addToMap(counter, element, 1);
			}
		} else if (propertyValue) {
			addToMap(counter, propertyValue, 1);
		}
	}
	
	return counter;
};
export default getProcessedData;
