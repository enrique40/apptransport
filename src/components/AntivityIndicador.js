import React from 'react';
import {Text, View, Button, ActivityIndicator, StyleSheet} from 'react-native';




function AntivityIndicador({isloadin}) {
	console.log(isloadin);
	if (isloadin) {
		return (
        	<>
          		<View style={styles.container}>
              		<ActivityIndicator size="large" color="#ADADAD" />
         		</View>
        	</>
       );
    }
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
});

export default AntivityIndicador;