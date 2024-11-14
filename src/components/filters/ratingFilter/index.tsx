import { Checkbox, FormControl, FormControlLabel, FormLabel, Rating } from '@mui/material'
import { ChangeEvent } from 'react'
import { useShallow } from 'zustand/react/shallow'

import useHotelsStore from '../../../store/hotelsStore'

const RatingFilter = () => {
	const { selectedRatings, setSelectedRatings } = useHotelsStore(
		useShallow(state => ({
			selectedRatings: state.selectedRatings,
			setSelectedRatings: state.setSelectedRatings,
		}))
	);

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		const rating = Number(event.target.name);
		const updatedRatings = {
			...selectedRatings,
			[rating]: event.target.checked,
		};
		setSelectedRatings(updatedRatings);
	}

	return (
		<FormControl fullWidth>
			<FormLabel
				component="legend"
				sx={{textAlign: 'left'}}
			>
				Количество звёзд
			</FormLabel>
			{[1, 2, 3, 4, 5].map((rating) => (
				<FormControlLabel
					key={rating}
					control={
						<Checkbox
							checked={selectedRatings[rating]}
							onChange={handleCheckboxChange}
							name={rating.toString()}
						/>
					}
					label={<Rating name="read-only" value={rating} readOnly />}
				/>
			))}
		</FormControl>
	);
};

export default RatingFilter;