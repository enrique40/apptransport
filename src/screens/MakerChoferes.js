import React from "react";
import MapView, { Marker } from "react-native-maps";
import {View, StyleSheet, Dimensions} from 'react-native';


export default function MarkerChoferes({ markers, navigation}) {
  console.log(markers);
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
          initialRegion={{
          latitude: 9.91152,
          longitude: -67.35381,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
    
         }}
         minZoomLevel={11}
        >
   
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            image={require('../assets/student.png')}
            title={marker.message}
          />
        ))}
      </MapView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
   
  },
});