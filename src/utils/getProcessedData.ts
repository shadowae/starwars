
const addToMap = (map: Map<string, number>, key: string, value: number) => {
    if(map.has(key)) {
        // @ts-ignore
        map.set(key, map.get(key) + value)
    } else {
        map.set(key, value)
    }
}
const getProcessedData = (dataSet: any, path: any): Map<string, number> => {
    const counter = new Map()
    
    for(let item of dataSet) {
        if (item[path].includes(',')) {
            const splitElement = item[path].split(', ')
            for(let element of splitElement) {
                addToMap(counter, element, 1)
            }
        } else {
            addToMap(counter, item[path], 1)
        }
        
    }
    return counter;
}

export default getProcessedData;
