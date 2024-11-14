export interface IHotel {
	name: string,
	country: string,
	address: string,
	stars: number,
	type: string,
	description: string,
	services: string[],
	min_price: number,
	currency: string,
	rating: number,
	reviews_amount: number,
	last_review: string
}

export interface IHotelsState {
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