// @ts-nocheck
import SpeciesType from '../types/SpeciesType';

const getLanguageOptions = (rawData: SpeciesType[]) => {
	const allLanguages = rawData.flatMap((species) => species.language === 'n/a' ? [] : species.language);
	return Array.from(new Set(allLanguages));
};

// Generic function to extract unique options from the speciesData array given path variable
const getGenericOptions = (rawData: SpeciesType[], path: string) => {
	const allOptions = rawData.flatMap((species: object) => species[path]);
	return Array.from(new Set(allOptions));
};

const getOptions = (rawData: SpeciesType[], path: string) => {
	switch (path) {
	case 'language':
		return getLanguageOptions(rawData);
	default:
		return getGenericOptions(rawData, path);
	}
};

export { getOptions };
