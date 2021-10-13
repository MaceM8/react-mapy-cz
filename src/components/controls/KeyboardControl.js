import { useEffect } from 'react';

import { useMap } from '../MapContext';

const KeyboardControl = ({ pan = true, zoom = true }) => {
	const { map, SMap } = useMap();

	let mode = 0;

	mode |= pan && SMap.KB_PAN;
	mode |= zoom && SMap.KB_ZOOM;

	useEffect(() => {
		const keyboardControl = new SMap.Control.Keyboard(mode);
		map.addControl(keyboardControl);

		return () => {
			map.removeControl(keyboardControl);
		};
	}, [map, mode, SMap]);

	return null;
};

export default KeyboardControl;
