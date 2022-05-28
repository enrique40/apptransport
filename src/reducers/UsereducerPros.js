import { types } from '../types/types';


const initialState = {
	datoname: 'name',
	datoape: 'msd'

}


export const UsereducerPros = (state = initialState, action) => {
	switch(action.type){
		case types.dato:
			return {
				datonvg: action.payload.datonavig
			}


		default:
			return state;
	}
}