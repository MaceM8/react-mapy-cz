import { useEffect } from 'react';

import { useMap } from '../../MapContext';

const defaultConfig = {
	// CZ
	bounds: '48.5370786,12.0921668|51.0746358,18.8927040',
	enableCategories: 0,
	lang: 'cs,en',
};

const useSuggest = (
	inputRef,
	disableSuggest,
	onSuggestItemSelect,
	config = defaultConfig
) => {
	const { setMapCenter, sMap } = useMap();

	useEffect(() => {
		let suggest;

		if (!disableSuggest) {
			suggest = new sMap.Suggest(inputRef.current, {
				provider: new sMap.SuggestProvider({
					updateParams: (params) => ({ ...params, ...config }),
				}),
			});
			suggest.addListener('suggest', ({ data }) => {
				setMapCenter(data.longitude, data.latitude);

				if (onSuggestItemSelect) {
					onSuggestItemSelect(data);
				}
			});
		}

		return () => {
			if (!disableSuggest) {
				suggest.removeListener('suggest');
			}
		};
	}, [
		config,
		disableSuggest,
		inputRef,
		onSuggestItemSelect,
		setMapCenter,
		sMap,
	]);
};

export default useSuggest;
