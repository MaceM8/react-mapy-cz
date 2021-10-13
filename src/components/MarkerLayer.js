import React, { createContext, useEffect, useRef } from 'react';
import { node } from 'prop-types';

import { getContextHook } from '../utils/getContextHook';
import { useMap } from './MapContext';

const MarkerLayerContext = createContext();

export const useMarkerLayer = getContextHook(MarkerLayerContext, 'MarkerLayer');

// TODO: Add possibility to get reference to layer - so we can get all rendered markers
const MarkerLayer = ({ children }) => {
	const { map, sMap } = useMap();
	const markerLayerRef = useRef();

	useEffect(() => {
		markerLayerRef.current = new sMap.Layer.Marker();

		map?.addLayer(markerLayerRef.current);
		markerLayerRef.current.enable();

		return () => {
			map.removeLayer(markerLayerRef.current);
		};
	}, [map, sMap]);

	return (
		<MarkerLayerContext.Provider value={markerLayerRef.current}>
			{children}
		</MarkerLayerContext.Provider>
	);
};

MarkerLayer.propTypes = {
	children: node,
};

export default MarkerLayer;
