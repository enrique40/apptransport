import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Navigation from "./src/navigation/Navigation";
import LoginForm from './src/screens/LoginForm';
import { store } from './src/store/store';


export default function App() {


  return (
	  	<Provider store={store}>
			<NavigationContainer>
			   	<Navigation />
			</NavigationContainer>
		</Provider>
  );
}

