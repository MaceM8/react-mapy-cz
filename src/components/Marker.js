import { useEffect } from 'react';
import { useMap } from '.';

import { markerShape } from '../utils/shapes';

import { useMarkerLayer } from './MarkerLayer';

const Marker = ({ coords, imgSrc, tooltip, ...props }) => {
	const markerLayer = useMarkerLayer();
	const { SMap } = useMap();

	useEffect(() => {
		const options = {
			...(imgSrc ? { url: imgSrc } : undefined),
			...(tooltip ? { title: tooltip } : undefined),
			...props,
		};

		const mapCoords = SMap.Coords.fromWGS84(coords.longitude, coords.latitude);
		const marker = new SMap.Marker(
			mapCoords,
			false,
			Object.keys(options).length > 0 ? options : undefined
		);

		markerLayer?.addMarker(marker);

		return () => {
			markerLayer?.removeMarker(marker, true);
		};
	}, [coords, imgSrc, markerLayer, props, SMap, tooltip]);

	return null;
};

Marker.propTypes = markerShape;

export default Marker;
