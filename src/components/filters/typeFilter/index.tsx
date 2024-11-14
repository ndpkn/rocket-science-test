import {
	Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent,
} from '@mui/material'
import { useShallow } from 'zustand/react/shallow'

import typesData from '../../../data/filtersData.json'
import useHotelsStore from '../../../store/hotelsStore'

const TypeFilter = () => {
	const {selectedTypes, setSelectedTypes} = useHotelsStore(
		useShallow(state => ({
			selectedTypes: state.selectedTypes,
			setSelectedTypes: state.setSelectedTypes
		}))
	)

	const handleChange = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value },
		} = event;
		const valueArray = typeof value === 'string' ? value.split(',') : value;

		setSelectedTypes(valueArray);
	};
	return (
		<FormControl fullWidth>
			<InputLabel id="checkbox-label">Тип</InputLabel>
			<Select
				labelId="checkbox-label"
				id="checkbox"
				multiple
				value={selectedTypes}
				onChange={handleChange}
				input={<OutlinedInput label="Тип" />}
				renderValue={(selected) => selected.join(', ')}
				fullWidth
				variant={'standard'}
			>
				{typesData.types.map((type) => (
					<MenuItem key={type} value={type}>
						<Checkbox checked={selectedTypes.includes(type)} />
						<ListItemText primary={type} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default TypeFilter