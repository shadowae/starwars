import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingBackdropProps {
	loading: boolean;
	onClose: () => void;
}
const LoadingBackdrop = ({ loading, onClose }: LoadingBackdropProps) => {
	return (
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={loading}
			onClick={onClose}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default LoadingBackdrop;
