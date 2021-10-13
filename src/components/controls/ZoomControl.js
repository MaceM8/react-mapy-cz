import { useEffect } from 'react';
import { arrayOf, bool, number, shape, string } from 'prop-types';

import { useMap } from '../MapContext';

// https://api.mapy.cz/doc/SMap.Control.Zoom.html
const ZoomControl = ({
	labels,
	showZoomMenu,
	sliderHeight = 16,
	step = 9,
	titles = [],
}) => {
	const { map, SMap } = useMap();

	useEffect(() => {
		const zoomControl = new SMap.Control.Zoom(labels, {
			showZoomMenu,
			sliderHeight,
			step,
			titles,
		});
		map.addControl(zoomControl);

		return () => {
			map.removeControl(zoomControl);
		};
	}, [labels, map, showZoomMenu, sliderHeight, SMap, step, titles]);

	return null;
};

ZoomControl.propTypes = {
	// Object with Zoom number as key and string value as label
	labels: shape({ [number]: string }),
	showZoomMenu: bool,
	sliderHeight: number,
	step: number,
	titles: arrayOf(string),
};

export default ZoomControl;
