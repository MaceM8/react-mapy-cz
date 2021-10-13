import React, { memo } from 'react';
import { node, string } from 'prop-types';

import { useMap } from './MapContext';

const Map = ({ children, width = '100%', height = '300px' }) => {
	const { map, id } = useMap();

	return (
		<div
			// TODO: Add style for all map images with max-width: initial, so map is visible
			style={{ width, height, img: { maxWidth: 'initial !important' } }}
			id={id}
		>
			{map && children}
		</div>
	);
};

Map.propTypes = {
	children: node,
	height: string,
	width: string,
};

export default memo(Map);
