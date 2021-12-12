import React from 'react';
import Loading from '../Loading';

function ProductLoading(Component) {
	return function ProductLoadingComponent({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
			<Loading/>
		);
	};
}
export default ProductLoading;