import React, { useEffect, useState } from 'react';
import useStarwarsStore from './Zustand/StarwarsStore';
import LoadingBackdrop from './components/LoadingBackdrop';

function StarshipPagination() {
	const {
		starshipPagination,
		fetchStarshipApi,
		starshipNextPage,
		starshipPrevPage,
		fetchNextStarshipPage,
		fetchPrevStarshipPage,
	} = useStarwarsStore();
	
	const [loading, setLoading] = useState(false); // Add loading state
	
	useEffect(() => {
		fetchStarshipApi();
	}, [fetchStarshipApi]);
	
	const handleFetchStarshipPage = async (fetchFunc: Function) => {
		try {
			setLoading(true);
			await fetchFunc();
		} catch (error) {
			console.error('Error fetching starship data:', error);
		} finally {
			setLoading(false);
		}
	};
	
	return (
		<div>
			{/* Display starship data */}
			{starshipPagination.map((ship) => (
				<div key={ship.name}>{ship.name}</div>
			))}
			
			{/* Pagination controls */}
			<button
				onClick={() => handleFetchStarshipPage(fetchPrevStarshipPage)}
				disabled={!starshipPrevPage || loading}
			>
				Previous
			</button>
			<button
				onClick={() => handleFetchStarshipPage(fetchNextStarshipPage)}
				disabled={!starshipNextPage || loading}
			>
				Next
			</button>
			
			{/* Loading backdrop */}
			<LoadingBackdrop loading={loading} onClose={() => setLoading(false)} />
		</div>
	);
}

export default StarshipPagination;
