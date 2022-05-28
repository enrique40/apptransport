import React, { useContext } from "react";
import {IconButton} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import LoginForm from '../screens/LoginForm';
import RegisterForm from '../screens/RegisterForm'; 
import Profile from '../screens/Profile'; 
import Paradas from '../screens/Paradas';
import Mapa from '../screens/Mapa';
import Home from '../screens/Home';
import Salir from '../screens/Salir';
import ModalDistancia from '../components/ModalDistancia';



const Stack = createStackNavigator();

export default function HomeStack(props) {
	
	const {navigation} = props;
	//const { hola } = useContext(ContenedorContext);
	console.log('Dato desde el mgv HomeStack', props);
	/*const state = useSelector( state => state.datonvg);
	console.log('Datos del redux HomeStack', state);*/

	const buttonLeft = () => {
		return <IconButton icon="menu" onPress={() => navigation.openDrawer()} />;
	};


	return (
		<Stack.Navigator
		  screensOptions={{	
		  	headerStyle: {
				backgroundColor: '#51d1F6'
			},
		  }}


		>
			<Stack.Screen
				 name="login" 
				 component={LoginForm} 
				 options={{ headerShown: false}}
			 /> 
			 


			<Stack.Screen
				 name="profile"
				 component={Profile} 
				 options={{ headerShown: false
			}} /> 

			 <Stack.Screen
				 name="mapa"
				 component={Mapa} 
				 options={{
				 	title: 'Mapa', 
				 	headerTitleAlign: 'right', 
				 	headerLeft: () => buttonLeft()
			 }} /> 
			 
			<Stack.Screen
				 name="registro" 
				 component={RegisterForm} 
				 options={{ headerShown: false
			}} /> 


			 <Stack.Screen
				 name="perfil"
				 component={Paradas} 
				 options={{title: 'Perfil', headerLeft: () => buttonLeft()
			 }} /> 

 			<Stack.Screen
				 name="salir"
				 component={Salir} 
				  options={{ title: '', headerLeft: () => buttonLeft()
			}} /> 

			<Stack.Screen
				 name="home"
				 component={Home} 
				  options={{title: 'Home', headerLeft: () => buttonLeft()
			}} /> 
		


		</Stack.Navigator>
	);

} 

