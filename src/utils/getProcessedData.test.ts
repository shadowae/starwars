import getProcessedData from './getProcessedData';
const mock  = [
    { name: "Yoda's species", hair_colors: 'brown, white', classification: 'mammal' },
    { name: 'Trandoshan', hair_colors: 'green, brown', classification: 'reptile' },
    { name: 'Mon Calamari', hair_colors: 'none', classification: 'amphibian' },
    { name: 'Ewok', hair_colors: 'white, brown, black', classification: 'mammal' },
    { name: 'Sullustan', hair_colors: 'red, green', classification: 'mammal' }
]
describe('getProcessedData', () => {
    test('should return processed simple data given path', () => {
        const result = new Map();
        result.set('mammal', 3)
        result.set('reptile', 1)
        result.set('amphibian', 1)
        
        expect(getProcessedData(mock,['classification'])).toEqual(result)
    });
    
    test('should return processed complex data given path', () => {
        const result = new Map();
        result.set('brown', 3)
        result.set('white', 2)
        result.set('green', 2)
        result.set('black', 1)
        result.set('red', 1)
        result.set('none', 1)
        
        expect(getProcessedData(mock,['hair_colors'])).toEqual(result)
    });
});
