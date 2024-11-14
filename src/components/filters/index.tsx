import { Button } from '@mui/material'
import { useShallow } from 'zustand/react/shallow'

import useHotelsStore from '../../store/hotelsStore'
import CountryFilter from './countryFilter'

import styles from './filters.module.scss'
import PriceFilter from './priceFilter'
import RatingFilter from './ratingFilter'
import ReviewsFilter from './reviewsFilter'
import TypeFilter from './typeFilter'

const Filters = () => {
	const {resetFilters, applyFilters} = useHotelsStore(
		useShallow((state) => ({
			resetFilters: state.resetFilters,
			applyFilters: state.applyFilters
		}))
	)

	return (
		<div className={styles.filters}>
			<CountryFilter />
			<TypeFilter />
			<RatingFilter />
			<ReviewsFilter />
			<PriceFilter />
			<Button variant={'contained'} onClick={applyFilters}>Применить фильтр</Button>
			<Button variant={'outlined'} onClick={resetFilters}>Сбросить фильтр</Button>
		</div>);
};

export default Filters;