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
