import { Button, Pagination, Rating, Typography } from '@mui/material'
import { useState } from 'react'
import useHotelsStore from '../../store/hotelsStore'

import styles from './hotels.module.scss'

const Hotels = () => {
	const [isReserved, setIsReserved] = useState<string[]>([])
	const filteredHotels = useHotelsStore(state => state.filteredHotels)

	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 3

	const pluralize = (count: number, words: string[]): string => {
		const cases = [2, 0, 1, 1, 1, 2];
		return count + ' ' + words[ (count % 100 > 4 && count % 100 < 20) ? 2 : cases[ Math.min(count % 10, 5)] ];
	}

	const handleClick = (hotelName: string) => {
		if (isReserved.includes(hotelName)) {
			setIsReserved(isReserved.filter(name => name !== hotelName));
		} else {
			setIsReserved([...isReserved, hotelName])
		}
	}

	const indexOfLastHotel = currentPage * itemsPerPage;
	const indexOfFirstHotel = indexOfLastHotel - itemsPerPage;
	const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
	}

	return (
		<div className={styles.hotels}>
			{filteredHotels.length > 0 ?
				currentHotels.map((hotel) => (
				<div className={styles.hotel} key={hotel.name}>
					<div className={styles.info}>
						<h2>{hotel.name}</h2>
						<div className={styles.params}>
							<Rating name="read-only" value={hotel.stars} readOnly />
							<p className={styles.params_type}>{hotel.type}</p>
							<p className={styles.params_reviews}>{pluralize(hotel.reviews_amount, ['отзыв', 'отзыва', 'отзывов'])}</p>
							<p className={styles.params_country}>{hotel.country}</p>
						</div>
						<p>{hotel.description}</p>
					</div>
					<div className={styles.price}>
						<div className={styles.price_info}>
							<span>
								<p>{hotel.min_price}</p>
								<p>{hotel.currency}</p>
							</span>
							<p>Цена за 1 ночь</p>
						</div>
						<Button
							value={isReserved}
							variant={isReserved.includes(hotel.name) ? 'outlined' : 'contained'}
							onClick={() => handleClick(hotel.name)}
						>
							{isReserved.includes(hotel.name) ? 'Забронировано' : 'Забронировать'}
						</Button>
					</div>
				</div>
			))
			:
				<Typography variant='h5'>Записей не найдено</Typography>
			}
			{filteredHotels.length > itemsPerPage && (
				<Pagination
					count={Math.ceil(filteredHotels.length / itemsPerPage)}
					page={currentPage}
					onChange={handlePageChange}
					variant="outlined"
					shape="rounded"
					color="primary"
					className={styles.pagination}
				/>
			)}
		</div>
	);
}

export default Hotels