import React, {useState} from 'react'
import { View, img, TextInput } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {Drawer, Switch, TouchableRipple,  IconButton} from 'react-native-paper';
import LoginForm from '../screens/LoginForm';
import { Avatar } from 'react-native-paper';
import { ejemplo } from '../screens/Mapa';
import globalStyles from '../styles/global';
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons'; 
import { Icon, Container, Header, Footer, Right, Button, Body, H3, Text, ListItem, Thumbnail, Left } from 'native-base';


export default (props) => {
	const {navigation} = props;

	const [active, setActive] = useState('mapa')

	const onChangeScreen = (screen, dato) => {
	
		setActive(screen);
		navigation.navigate(screen, {
			datoProps: dato	
		})
	}

	/*const datosProfile = async () => {
		var repuesta = await api.get('/api/v1/users');
		console.log('datos del usuario', repuesta);
	}*/



	return( 
		<Container>
			<Header style={{backgroundColor: 'white', borderBottonWidth: 0 }} >
				<Right>
				<Entypo name="light-down" size={36} color="white" color={'black'}  />
				</Right>
			</Header>
			<Container contentContainerStyle={{flex: 1}} >
				<ListItem style={{backgroundColor: 'white'}}>
					<Left >
						<Avatar.Image size={70} source={require('../assets/avatar1.png')} style={{backgroundColor: 'white'}}/>
					</Left>
					<Body style={{flexDirection: 'column'}}>
					
						<H3 style={{ marginLeft: -36, fontSize: 18}}>Master</H3>
						<Text style={{fontSize: 10,  flexDirection: 'column', width: 150, marginLeft: -36 }}>master@gmail.com</Text>
					</Body>
				</ListItem>	
				
				<DrawerContentScrollView >
				
					<Drawer.Section>
						<Drawer.Item
							icon={({color, size}) => (
								 <Ionicons name="map" size={32} color="black" />
							)}
							label="Inicio"
							active={active==="mapa"}
							onPress={() => onChangeScreen('mapa', true)}
						 />
						 <Drawer.Item
							icon={({color, size}) => (
								<AntDesign name = "profile" size = {24} color = "black" />
							)} 
							label="Perfil"
							active={active==="perfil"}
							onPress={() => onChangeScreen('perfil', '')}
						 />
						 <Drawer.Item
						 	icon={({color, size}) => (
								<AntDesign name="setting" size={24} color="black" />
						 		 
				
							)} 
							label="Ajuste"
							active={active==="salir"}
							onPress={() => onChangeScreen('salir', '')}

						 />
					</Drawer.Section>
				</DrawerContentScrollView>
			</Container>
			<Footer style={{backgroundColor: '#ffffff', borderBottonWidth: 0 }}/>
		</Container>
	)

}
