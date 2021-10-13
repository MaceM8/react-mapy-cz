import { useEffect, useLayoutEffect, useRef } from 'react';
import { func } from 'prop-types';

import { useMap } from './MapContext';

/**
 * Event listener for actions happening on the map.
 * Enables developer to define onClick handler to react to map click events
 *
 * Usage - Add as a child of Map component
 *
 * @returns null
 */
const Signals = ({ onClusterClick, onMarkerClick }) => {
	const { map } = useMap();
	// https://epicreact.dev/the-latest-ref-pattern-in-react/
	const onClusterClickRef = useRef(onClusterClick);
	const onMarkerClickRef = useRef(onMarkerClick);

	useLayoutEffect(() => {
		onClusterClickRef.current = onClusterClick;
		onMarkerClickRef.current = onMarkerClick;
	});

	useEffect(() => {
		// TODO: For open-source add additional signals
		if (onMarkerClickRef.current || onClusterClickRef.current) {
			map.getSignals().addListener(this, 'marker-click', (e) => {
				if (!e.target._clusterOptions && onMarkerClickRef.current) {
					onMarkerClickRef.current(e.target);
				}
				if (e.target._clusterOptions && onClusterClickRef.current) {
					onClusterClickRef.current(e.target);
				}
			});
		}

		return () => {
			if (onMarkerClickRef.current || onClusterClickRef.current) {
				map.getSignals().removeListener(this, 'marker-click', true);
			}
		};
	}, [map]);

	return null;
};

Signals.propTypes = {
	onClusterClick: func,
	onMarkerClick: func,
};

export default Signals;
