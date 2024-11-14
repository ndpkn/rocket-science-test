import { FormControl, FormLabel, Slider } from '@mui/material'
import { useShallow } from 'zustand/react/shallow'

import useHotelsStore from '../../../store/hotelsStore'

const PriceFilter = () => {
	const { setSelectedPriceRange, selectedPriceRange } = useHotelsStore(
		useShallow(state => ({
			setSelectedPriceRange: state.setSelectedPriceRange,
			selectedPriceRange: state.selectedPriceRange,
		}))
	);

	const handleSliderPriceChange = (_event: Event, newValue: number | number[]) => {
		setSelectedPriceRange(newValue as number);
	};

	return (
		<div>
			<FormControl fullWidth>
				<FormLabel
					component="legend"
					sx={{textAlign: 'left'}}
				>
					Цена (до)
				</FormLabel>
				<Slider
					value={selectedPriceRange === null ? 0 : selectedPriceRange}
					onChange={handleSliderPriceChange}
					valueLabelDisplay="auto"
					min={0}
					max={10000}
					step={1}
				/>
			</FormControl>
		</div>
	);
};

export default PriceFilter;