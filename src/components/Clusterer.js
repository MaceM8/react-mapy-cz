import { useEffect, useRef } from 'react';

import { useMap } from './MapContext';
import { useMarkerLayer } from './MarkerLayer';

/**
 * Clusterer for markers.
 * Sets default clusterer for parent Marker layer.
 *
 * Usage - Add as a child of MarkerLayer component
 *
 * @returns null
 */
const Clusterer = () => {
	const { map, sMap } = useMap();
	const markerLayer = useMarkerLayer();
	const clustererRef = useRef();

	useEffect(() => {
		clustererRef.current = new sMap.Marker.Clusterer(map);

		markerLayer.setClusterer(clustererRef.current);

		return () => {
			markerLayer.removeClusterer(clustererRef.current);
		};
	}, [map, markerLayer, sMap]);

	return null;
};

export default Clusterer;
