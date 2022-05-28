

const initialState = {
	contacts: []
}

 const pruebaRedux = (state={}, action) => {
	switch (action.type){
		
		case 'DatosUsuario':
			return {
				name: action.payload.name,
				email: action.payload.email
			} 
		default:
			return state;
	}
}

export default pruebaRedux;