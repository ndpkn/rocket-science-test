import { create } from 'zustand'
import data from '../data/hotels.json'
import { IHotel } from '../types'

interface HotelsState {
	hotels: IHotel[],
	filteredHotels: IHotel[],
	selectedCountry: string,
	selectedTypes: string[],
	selectedRatings: { [key: number]: boolean },
	selectedReviewsAmount: number | null,
	selectedPriceRange: number,
	setSelectedCountry: (country: string) => void,
	setSelectedTypes: (type: string[]) => void,
	setSelectedRatings: (ratings: { [key: number]: boolean }) => void,
	setSelectedReviewsAmount: (amount: number) => void,
	setSelectedPriceRange: (range: number) => void,
	setFilteredHotels: (hotels: IHotel[]) => void,
	applyFilters: () => void,
	resetFilters: () => void,
}

const hotelsData = [...data.hotels]

const useHotelsStore = create<HotelsState>((set) => ({
	hotels: hotelsData,
	filteredHotels: hotelsData,
	selectedCountry: '',
	selectedTypes: [],
	selectedRatings: { 1: false, 2: false, 3: false, 4: false, 5: false },
	selectedReviewsAmount: null,
	selectedPriceRange: 0,
	setSelectedCountry: (country: string) => set({selectedCountry: country}),
	setSelectedTypes: (type: string[]) => set({selectedTypes: [...type]}),
	setSelectedRatings: (ratings: { [key: number]: boolean }) => set({ selectedRatings: ratings }),
	setSelectedReviewsAmount: (amount: number) => set({selectedReviewsAmount: amount}),
	setSelectedPriceRange: (range: number) => set({selectedPriceRange: range}),
	setFilteredHotels: (hotels: IHotel[]) => set({filteredHotels: hotels}),
	applyFilters: () => set((state) => {
		const { hotels, selectedCountry, selectedTypes, selectedRatings, selectedReviewsAmount, selectedPriceRange } = state;

		const filteredHotels = hotels.filter(hotel => {
			const matchesCountry =
				selectedCountry
					? hotel.country === selectedCountry
					: true;
			const matchesType =
				selectedTypes.length > 0
					? selectedTypes.includes(hotel.type)
					: true;
			const matchesRating = Object
				.keys(selectedRatings)
				.some(rating => {
					const ratingNumber = Number(rating);
					return selectedRatings[ratingNumber] && hotel.stars === ratingNumber;
				}) || Object.values(selectedRatings).every(value => !value);
			const matchesReviewsAmount = selectedReviewsAmount === null || hotel.reviews_amount >= selectedReviewsAmount;
			const matchesPrice =
				selectedPriceRange > 0
					? hotel.min_price <= selectedPriceRange
					: true;

			return matchesCountry && matchesType && matchesRating && matchesReviewsAmount && matchesPrice;
		});

		return { filteredHotels };
	}),
	resetFilters: () => set({
		selectedCountry: '',
		selectedTypes: [],
		selectedRatings: { 1: false, 2: false, 3: false, 4: false, 5: false },
		selectedReviewsAmount: null,
		selectedPriceRange: 0,
		filteredHotels: hotelsData,
	})
}))

export default useHotelsStore