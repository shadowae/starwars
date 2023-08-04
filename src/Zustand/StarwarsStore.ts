import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import StarshipSlice, {StarshipSliceType} from './StarshipSlice';
import SpaceSlice,{StarwarsState} from './SpaceSlice';

const useStarwarsStore = create<StarwarsState&StarshipSliceType>()(
	devtools(
		persist(
			(...a) => ({
				// @ts-ignore
				...SpaceSlice(...a),
				// @ts-ignore
				...StarshipSlice(...a)
			}),
			{
				name: 'starwars-storage',
			}
		)
	)
);

export default useStarwarsStore;
