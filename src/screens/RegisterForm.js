import React, {useState, useEffect} from 'react';
import { View, ToastAndroid, Text, TouchableOpacity, 
		TextInput, Button, ImageBackground, Alert
	   } from 'react-native';
import 	globalStyles from '../styles/global';
import { validateEmail } from '../utils/validations';
import  api from '../utils/Api';

export default function RegisterForm({navigation}){



//campos formulario
	const [ name, guardarNombre] = useState('');
	const [ lastName, guardarApellido] = useState('');
	const [ email, guardarCorreo] = useState('');
	const [ password, guardarContraseña] = useState('');
	const [ confirmPassword, guardarConfirmarContraseña] = useState('');
	const [ formError, guardarError] = useState({});
	const [ mensaje, guardarMensaje] = useState({});

	


	//Guarda los Datos en la BD
	const GuardarDatos = async () => {
		//Validar
		let errores = {};
		if (!name || !lastName || !email || !password || !confirmPassword) {
			
			//guardarMensaje('Todos los campos son obligatorios');
			 ToastAndroid.show('Todos los campos son obligatorios', ToastAndroid.SHORT);
	
		}else{
			//Generar el cliente
			const data = { name, lastName, email, password, confirmPassword};
			console.log(data);
			//guardar el cliente en la api
			try {
				
				var dato = await api.post('/api/v1/session/signup', data);
				//console.log('json del registro',JSON.stringify(dato.data));
				console.log('Mensaje exitoso', dato.data.studentValue);
				console.log(dato);
				
				//redireccionar
				navigation.navigate('login');
			}catch (error) {
				Alert.alert(
					'', //Titulo
			 		 'En este momento el servicio no esta disponible', // mensaje
					[{
						tex: 'ok' //Arreglos de botones
					}]
				)
				console.log(error);
			}	
		}
		
	

	
		

		// limpiar el from (opcional)
	}


    return (
      <>
      	<View style={globalStyles.container}>
	      	<ImageBackground source={require('../assets/pantalla.png')}
	      		style={globalStyles.image} > 
		      	<View style={globalStyles.contenedor}>

		      		 <Text style={globalStyles.titulo} >Registro</Text>
		      

		      		<TextInput
		      			style={[globalStyles.input, formError.name && globalStyles.error]} 
		      			label="Nombre"
		      			placeholder="Nombre"
		      			placeholderTextColor="#969696"
		      			onChangeText={ texto => guardarNombre(texto) }
		      			value={name}
		      		
		      		/>

			      	<TextInput
			      		style={[globalStyles.input, formError.lastName && globalStyles.error]}
			      		label="Apellido"
			      		placeholder="Apellido"
			      		onChangeText={ texto => guardarApellido(texto) }
			      		value={lastName}
			      		placeholderTextColor="#969696"
			      	/>

			      	<TextInput
			      	 	style={[globalStyles.input, formError.email && globalStyles.error]}
			      		label="Correo"
			      		placeholder="Correo"
			      		onChangeText={ texto => guardarCorreo(texto) }
			      		value={email}
			      		placeholderTextColor="#969696"
			      	/>

			      	<TextInput
						style={[globalStyles.input, formError.password && globalStyles.error]}
			      		label="Contraseña"
			      		placeholder="Contraseña"
			      		onChangeText={ texto => guardarContraseña(texto) }
			      		value={password}
			      		placeholderTextColor="#969696"
			      		secureTextEntry={true}
			      	/>

			      	<TextInput
						style={[globalStyles.input, formError.confirmPassword && globalStyles.error]}
			      		label="Confirmar Contraseña"
			      		placeholder="Confirmar Contraseña"
			      		onChangeText={ texto => guardarConfirmarContraseña(texto) }
			      		value={confirmPassword}
			      		placeholderTextColor="#969696"BJTR64GR
			      		secureTextEntry={true}
			      	/>


			      	<Button  title="Registro" onPress={() => GuardarDatos() } />
			      		
			  
			      	<TouchableOpacity onPress={() => navigation.navigate('login')} >

			      		<Text style={globalStyles.btnText} >Iniciar sección</Text>

			      	</TouchableOpacity>
		      	</View>
	      	</ImageBackground>
      	</View>
      	
      </>
    );
}
