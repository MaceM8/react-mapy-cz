import React, { createContext, useEffect, useRef } from 'react';
import { func, node } from 'prop-types';

import { getContextHook } from '../utils/getContextHook';
import { useMap } from './MapContext';

const MarkerLayerContext = createContext();

export const useMarkerLayer = getContextHook(MarkerLayerContext, 'MarkerLayer');

const MarkerLayer = ({ children, onAfterCreate }) => {
	const { map, sMap } = useMap();
	const markerLayer = useRef();

	useEffect(() => {
		markerLayer.current = new sMap.Layer.Marker();

		map?.addLayer(markerLayer);
		markerLayer.enable();

		// if (onAfterCreate) {
		// 	onAfterCreate(markerLayer);
		// }

		return () => {
			map.removeLayer(markerLayer);
		};
	}, [map, onAfterCreate, sMap]);

	return (
		<MarkerLayerContext.Provider value={markerLayer}>
			{children}
		</MarkerLayerContext.Provider>
	);
};

MarkerLayer.propTypes = {
	children: node,
	/** Callback returning instance of markerLayer object - for getting all rendered markers f.e. */
	onAfterCreate: func,
};

export default MarkerLayer;
