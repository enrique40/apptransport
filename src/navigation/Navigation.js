import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import Mapa from '../screens/Mapa';
import Paradas from '../screens/Paradas';
import Salir from '../screens/Home';
import DrawerContent from './DrawerContent';
import StackNavigation from './HomeStack';

const Drawer = createDrawerNavigator();

export default function Navigation(){
	return (
		<Drawer.Navigator  
			initialRouteName="app"
			drawerContent={(props) => <DrawerContent {...props} /> } >
				<Drawer.Screen name="app"  options={{ headerShown: false}} >
				 {props => <StackNavigation {...props} />}
				</Drawer.Screen> 
		</Drawer.Navigator>
	);
}
