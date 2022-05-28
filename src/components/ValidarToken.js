import 'react-native-gesture-handler';
import React from 'react';
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from "./src/navigation/HomeStack";



export default function ValidarToken() {

	const [token, guardarToken] = useState(false);

  return (
    <View style={styles.formulario}>

    	<TextInput
    		style={styles.input}
			onChangeText={ texto => guardarToken(texto) }
		/>
    </View>
    
  );
}

const styles = StyleSheet.create({
	input: {
		marginTop: 10,
		height: 50,
		borderColor: '#e1e1e1',
		borderWidth: 1,
		borderStyle: 'solid'
	},
	formulario: {
		backgroundColor: '#FFF',
		paddingHorizontal: 20,
		paddingVertical: 10
		
		
	},
});