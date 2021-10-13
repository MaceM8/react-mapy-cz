import { useEffect } from 'react';

import { useMap } from '../MapContext';

const MouseControl = ({ pan, wheel, zoom }) => {
	const { map, SMap } = useMap();

	let mode = 0;

	mode |= pan && SMap.MOUSE_PAN;
	mode |= zoom && SMap.MOUSE_ZOOM;
	mode |= wheel && SMap.MOUSE_WHEEL;

	useEffect(() => {
		const mouseControl = new SMap.Control.Mouse(mode);

		map.addControl(mouseControl);

		return () => {
			map.removeControl(mouseControl);
		};
	}, [map, mode, SMap]);

	return null;
};

export default MouseControl;
