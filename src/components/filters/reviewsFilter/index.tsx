import { FormControl, TextField } from '@mui/material'
import { ChangeEvent } from 'react'
import { useShallow } from 'zustand/react/shallow'

import useHotelsStore from '../../../store/hotelsStore'

const ReviewsFilter = () => {
	const {
		selectedReviewsAmount,
		setSelectedReviewsAmount
	} = useHotelsStore(
		useShallow(state => ({
			selectedReviewsAmount: state.selectedReviewsAmount,
			setSelectedReviewsAmount: state.setSelectedReviewsAmount
		}))
	)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.valueAsNumber;
		setSelectedReviewsAmount(value);
	}

	return (
		<FormControl fullWidth>
			<TextField
				label="Количество отзывов (от)"
				variant="outlined"
				type="number"
				value={selectedReviewsAmount === null ? '' : selectedReviewsAmount}
				onChange={handleChange}
			/>
		</FormControl>
	)
}

export default ReviewsFilter