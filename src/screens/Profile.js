import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image,
		Button, ToastAndroid, Alert, ImageBackground, ActivityIndicator,Modal, TouchableHighlight} from 'react-native';
import 	globalStyles from '../styles/global';
import { validateEmail } from '../utils/validations';
import * as SecureStore from 'expo-secure-store';
import  api from '../utils/Api';
import { AntDesign } from '@expo/vector-icons'; 


export default function Profile({ navigation, route}){

	const { name, lastName, rol } = route.params;

	//const {navigation} = props;
    console.log('mensaje desde Profile navigation', navigation)
	//SecureStore.setItemAsync('key_token', token);
	SecureStore.setItemAsync('rol', JSON.stringify(rol));
	console.log('Name:', name);
	console.log('Apelldio:', lastName);
	//campos formulario

	const [ career, guardarcareer] = useState('');
	const [ semester, guardarSemestre] = useState('');
	const [ phone, guardarPhone] = useState('');
	const [ email, guardarEmail] = useState('');
	const [ direction, guardarDirection] = useState('');
	const [ formError, guardarError] = useState({});
	const [ isloadin, guardarIsloadin] = useState(false);

	useEffect(() => {
      setTimeout(() => {
        guardarIsloadin(false);
      },
      30)
    }, []);
   

    useEffect(() => {
		isAuthToken();
	}, []);



	const isAuthToken = async () => {
    	let token = await SecureStore.getItemAsync('key_token');
         console.log('espera..');
        let repuest =  api.defaults.headers['x-access-token'] = token;
        console.log('Enviando el token ', repuest);
      
    }



	//Guarda los Datos en la BD
	const GuardarDatos = async () => {
		//Validar
		if (!career || !semester || !phone || !email || !direction) {
			
			ToastAndroid.show('Todos los Campos son obligatorios', ToastAndroid.SHORT);
			
		
		}else{
			//Generar el cliente
			const data = {career, semester, phone, direction};
			console.log("datosProfile", data);
				
			//guardar el cliente en la api
			try {
				console.log('dentro del try');
				 guardarIsloadin(true);   
				var repuesta = await api.post('/api/v1/student/profile/create', data);
				console.log('Repuesta del perfil--->', repuesta.data);
				console.log('Mensaje al crear la cuenta', repuesta.data.message);

				let rol = await SecureStore.getItemAsync('rol');
				//redireccionar
				navigation.navigate('mapa', {
                	rol: rol
              	});
				guardarIsloadin(false);
				ToastAndroid.show(repuesta.data.message, ToastAndroid.SHORT);
			}catch (error) {
				Alert.alert('Error: ', error.message);
				console.log(error)
			}	
		}
		
	

		// limpiar el from (opcional)
	}
  	/*if (isloadin) {
      return(
        <>
          <View style={styles.container}>
              <ActivityIndicator size="large" color="#ADADAD" />
          </View>
        </>
      );
    }*/

    return (
      <>
      	<View style={globalStyles.container}>
	      	<ImageBackground source={require('../assets/pantalla.png')}
	      		style={globalStyles.image} > 
		      	<View style={globalStyles.contenedor}>
					
				  <Image style={styles.tinyLogo} source={require('../assets/profile.png')} />
		      	

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
			      	 	style={[globalStyles.input, formError.career && globalStyles.error]}
			      		label="career"
			      		placeholder="career"
			      		onChangeText={ texto => guardarcareer(texto) }
			      		value={career}
			      		placeholderTextColor="#969696"
			      	/>

			      	<TextInput
						style={[globalStyles.input, formError.semester && globalStyles.error]}
			      		label="Semestre"
			      		placeholder="Semestre"
			      		onChangeText={ texto => guardarSemestre(texto) }
			      		value={semester}
			      		placeholderTextColor="#969696"
			      	/>

					<TextInput
						style={[globalStyles.input, formError.semester && globalStyles.error]}
						label="phone"
						placeholder="phone"
						onChangeText={ texto => guardarPhone(texto) }
						value={phone}
						placeholderTextColor="#969696"
						/>

					<TextInput
						style={[globalStyles.input, formError.semester && globalStyles.error]}
						label="email"
						placeholder="email"
						onChangeText={ texto => guardarEmail(texto) }
						value={email}
						placeholderTextColor="#969696"
						/>

					<TextInput
						style={[globalStyles.input, formError.semester && globalStyles.error]}
						label="Direccion"
						placeholder="Direccion"
						onChangeText={ texto => guardarDirection(texto) }
						value={direction}
						placeholderTextColor="#969696"
						/>
					<TouchableHighlight onPress={ () => GuardarDatos()} style={globalStyles.btnSubmit}>
						<Text style={globalStyles.textoSubmit}>Guardar Datos</Text>
					</TouchableHighlight>
			 
		
			      		


					  {isloadin==true 
                      ?  
						<Modal
							animationType="fade"
							transparent={true}
							visible={isloadin}
							onRequestClose={false}>
							<View style={styles.centeredViewGeo}>
								<View style={styles.modalViewGeo}>

									<ActivityIndicator  size="large" color="#0000ff" />

									<View style={styles.modalTextGeo}> 
										<Text >Cargando Datos...</Text>
									</View>
									
								</View>
							
							</View>
						</Modal>
						: 
							<Modal
							animationType="fade"
							transparent={true}
							visible={false}
							onRequestClose={false}>
							<View style={styles.centeredViewGeo}>
								<View style={styles.modalViewGeo}>
									<ActivityIndicator size="large" color="#0000ff" />

									<Text style={styles.modalTextGeo}>Cargando...</Text>
								</View>
							
							</View>
							</Modal>
      					}




		      	</View>
      		</ImageBackground>
      	</View>
      </>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
     padding: 10,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  centeredViewGeo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  modalViewGeo: {
    width: '80%',
    height: '22%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: '10%',
    paddingVertical: '10%',
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
  tinyLogo: {
    width: 80,
    height: 80,
	marginBottom: 40,
	marginVertical: 10,
	marginHorizontal: '40%',

  },
});