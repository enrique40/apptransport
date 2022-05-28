import React, {useEffect} from 'react';
import { StyleSheet, Image, View } from 'react-native';


const Splash = ({
	navigation
}) => {

	useEffect(() => {
      setTimeout(() => {
        navigation.navigate('mapa')
      },
      1000)
    }, []);

	return(

		<View>
			<Image source={require('../assets/student.png')} resizeMode="contain" style={{
				width : 130,
				marginHorizontal: '35%',
				marginVertical: '20%',
			}} />

		</View>
	)
};


const styles = StyleSheet.create({
	home: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default Splash;