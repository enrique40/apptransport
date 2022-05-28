import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
	contenedor: {
		flex: 1,
    	flexDirection: 'column',
    	justifyContent: 'center', 
		marginHorizontal: '8%'
	},
	input: {
		marginBottom: 20,
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 25,
		paddingVertical: 3,
		borderRadius: 50,
		fontSize: 10,
		borderWidth: 2,
		marginHorizontal: 15,
		borderColor: '#5462DE'
	},
	error: {
		borderColor: '#940c0c'
	},
	btnText: {
    	color: '#ADADAD',
    	fontSize: 18,
  
  	},
  	titulo: {
		marginBottom: 30,
    	textAlign: 'center',
    	color: '#fff',
    	fontSize: 30,
   
	},
	image: {
  
    	flex: 1,

  	},
  	container: {
    	flex: 1,

  	},
  	btnSubmit: {
		padding: 8,
		backgroundColor: '#ADADAD',
		marginVertical: 10,
		marginHorizontal: '28%',
		borderRadius: 30,
	},
	textoSubmit: {
		color: '#FFF',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	btnSubmitAler: {
		padding: 12,
		backgroundColor: 'red',
		alignSelf: 'center',
		borderRadius: 30,
		marginTop: 110,
		width: 80,
		height: 20 

	},
	textoSubmitAlerSalir: {
		color: '#FFF',
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: -10
	},

	textoSubmitAlerAcept : {
		color: '#FFF',
		fontWeight: 'bold',
		alignItems: 'center',
		marginTop: -10
	},
	
	btnDialogWif: {
		padding: 3,
		width: 60,
		alignSelf: 'flex-end',
		backgroundColor: 'red',
		marginRight: 10,
		marginTop: 40,
		marginVertical: 10,
		borderRadius: 30,
	
	},
	textoDialogWif: {
		color: '#FFF',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	centeredViewGeo: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		marginBottom: 120,
	},

	modalTextGeo: {
		marginTop: -1,
		marginHorizontal: "10%",
	   
	},

	modalViewGeo: {
		flexDirection: 'row',
		width: '57%',
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 30,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
		  width: 0,
		  height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	imgwifiGeo: {
		marginBottom: 28,
		alignItems: "center"
	   
	},

	avatarDrawer: {
		marginRight: "30%"
	   
	},

	inputDrawer: {
		marginBottom: 20,
		width: 140,
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 20,
		paddingVertical: 1,
		borderRadius: 50,
		fontSize: 10,
		borderWidth: 2,
		marginHorizontal: 1,
		borderColor: '#5462DE'
	},

	btnSalir: {
		padding: 12,
		backgroundColor: 'red',
		borderRadius: 30,
		width: 80,
		height: 20 
	},

	btnCancelar: {
		padding: 12,
		backgroundColor: 'red',
		borderRadius: 30,
		width: 80,
		height: 20 
	},
	ContenedorBotton: {
		justifyContent: 'space-evenly'
	}
	

});

export default globalStyles;