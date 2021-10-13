import { useEffect, useRef } from 'react';
import { arrayOf, shape } from 'prop-types';

import { markerShape } from '../utils/shapes';

import { useMarkerLayer } from './MarkerLayer';
import { useMap } from '.';

/**
 * Component for rendering large numbers of markers at once.
 * Hugely more performant than rendering markers one by one.
 *
 * Generally if you have more than 100 markers, you should consider using this component
 * indead of creating individual markers by yourself.
 *
 * @param {*} markersData
 * @returns component
 */
const MultipleMarkers = ({ markersData }) => {
	const markerLayer = useMarkerLayer();
	const { SMap } = useMap();
	const markersDataRef = useRef();
	const markersRef = useRef();

	useEffect(() => {
		if (
			JSON.stringify(markersDataRef.current) !== JSON.stringify(markersData)
		) {
			const markersArray = markersData.map(
				({ coords, imgSrc, tooltip, ...props }) => {
					const options = {
						...(imgSrc ? { url: imgSrc } : undefined),
						...(tooltip ? { title: tooltip } : undefined),
						...props,
					};
					const mapCoords = SMap.Coords.fromWGS84(
						coords.longitude,
						coords.latitude
					);

					return new SMap.Marker(
						mapCoords,
						false,
						Object.keys(options).length > 0 ? options : undefined
					);
				}
			);

			markerLayer?.removeMarker(markersRef.current);
			markerLayer?.addMarker(markersArray);

			markersDataRef.current = markersData;
			markersRef.current = markersArray;
		}

		return () => {
			markerLayer?.removeMarker(markersRef.current, true);
		};
	}, [markerLayer, markersData, SMap]);

	return null;
};

MultipleMarkers.propTypes = {
	markersData: arrayOf(shape(markerShape)),
};

export default MultipleMarkers;
