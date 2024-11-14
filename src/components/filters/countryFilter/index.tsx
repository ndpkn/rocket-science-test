import { Autocomplete, FormControl, TextField } from '@mui/material'
import { SyntheticEvent } from 'react'
import { useShallow } from 'zustand/react/shallow'
import countriesData from '../../../data/filtersData.json'
import useHotelsStore from '../../../store/hotelsStore'

const countries: string[] = [...countriesData.countries]

const CountryFilter = () => {
	const {
		setSelectedCountry,
		selectedCountry
	} = useHotelsStore(
		useShallow(state => ({
			selectedCountry: state.selectedCountry,
			setSelectedCountry: state.setSelectedCountry
		}))
	)

	const handleChange = (_event: SyntheticEvent, value: string | null) => {
		setSelectedCountry(value || '');
	};

	return (
		<FormControl fullWidth>
			<Autocomplete
				options={countries}
				value={selectedCountry}
				onChange={handleChange}
				noOptionsText="К сожалению, по вашему запросу ничего не найдено :("
				renderInput={(params) => <TextField {...params} label="Страна" />}
			/>
		</FormControl>
	)
}

export default CountryFilter