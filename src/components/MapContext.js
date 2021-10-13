import React, { createContext, useEffect, useState } from 'react';
import { arrayOf, node, number, oneOf, shape, string } from 'prop-types';

import { BaseLayers } from '../utils/constants';
import { coordsShape } from '../utils/shapes';
import mapScriptLoader from '../hoc/mapScriptLoader';
import setMapCenter from '../utils/setMapCenter';
import { getContextHook } from '../utils/getContextHook';

const MapContext = createContext();

export const useMap = getContextHook(MapContext, 'MapProvider');

const MapProvider = ({
	center,
	children,
	id = '',
	mapLayers = [BaseLayers.BASE_NEW],
	maxZoom = 18,
	minZoom = 1,
	zoom,
}) => {
	const [map, setMap] = useState();
	const [sMap, setSMap] = useState();

	useEffect(() => {
		if (!map) {
			const sMap = window.sMap;
			setSMap(sMap);

			const centerCoords = window.SMap.Coords.fromWGS84(center.lng, center.lat);
			const mapInstance = new window.SMap(
				window.JAK.gel(id),
				centerCoords,
				zoom
			);
			mapInstance.setZoomRange(minZoom, maxZoom);

			const [firstLayer, ...otherLayers] = mapLayers;
			mapInstance.addDefaultLayer(firstLayer).enable();
			otherLayers.forEach((layer) => {
				mapInstance.addDefaultLayer(layer);
			});

			setMap(mapInstance);
		}

		return () => {
			map?.$destructor();
		};
	}, [center, id, map, mapLayers, maxZoom, minZoom, zoom]);

	return (
		<MapContext.Provider
			value={{ id, map, mapLayers, setMapCenter: setMapCenter(map), sMap }}
		>
			{children}
		</MapContext.Provider>
	);
};

MapProvider.propTypes = {
	center: shape(coordsShape).isRequired,
	children: node,
	id: string,
	mapLayers: arrayOf([oneOf(Object.keys(BaseLayers))]),
	maxZoom: number,
	minZoom: number,
	zoom: number,
};

export default mapScriptLoader(MapProvider);
