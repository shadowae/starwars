import getProcessedData from './getProcessedData';
const mock  = [
	{ name: 'Yoda\'s species', hair_colors: 'brown, white', classification: 'mammal', face: {hair_colors: 'brown, white'}},
	{ name: 'Trandoshan', hair_colors: 'green, brown', classification: 'reptile', face: {hair_colors: 'green, brown'} },
	{ name: 'Mon Calamari', hair_colors: 'none', classification: 'amphibian', face: {hair_colors: 'none'} },
	{ name: 'Ewok', hair_colors: 'white, brown, black', classification: 'mammal', face: {hair_colors: 'white, brown, black'}},
	{ name: 'Sullustan', hair_colors: 'red, green', classification: 'mammal', face: {hair_colors: 'red, green'} }
];
describe('getProcessedData', () => {
	test('should return processed simple data given path', () => {
		const result = new Map();
		result.set('mammal', 3);
		result.set('reptile', 1);
		result.set('amphibian', 1);
  
		expect(getProcessedData(mock,['classification'])).toEqual(result);
	});
 
	test('should return processed complex data given path', () => {
		const result = new Map();
		result.set('brown', 3);
		result.set('white', 2);
		result.set('green', 2);
		result.set('black', 1);
		result.set('red', 1);
		result.set('none', 1);
  
		expect(getProcessedData(mock,['hair_colors'])).toEqual(result);
	});
	
	test('should return processed complex data given complex path', () => {
		const result = new Map();
		result.set('brown', 3);
		result.set('white', 2);
		result.set('green', 2);
		result.set('black', 1);
		result.set('red', 1);
		result.set('none', 1);
		
		expect(getProcessedData(mock,['face','hair_colors'])).toEqual(result);
	});
});
