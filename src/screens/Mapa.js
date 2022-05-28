import React, {Component, useState, useEffect } from 'react';
import {View, Text, StyleSheet, Dimensions, ToastAndroid, 
  Alert, Modal, ActivityIndicator, Image, TouchableOpacity,
   TouchableHighlight, StatusBar, FlatList, SafeAreaView} from 'react-native';
import * as Location from 'expo-location';
import Map from './Map';
import GetDistancia from '../components/getDistancia';
import * as SecureStore from 'expo-secure-store';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { mapStyle } from '../styles/mapStyle';
import { FAB } from 'react-native-paper';
import { FloatingAction } from "react-native-floating-action";
import modalDistancia from '../components/ModalDist';
import  globalStyles from '../styles/global';
import { Container, Content, List, ListItem, Card, CardItem,  } from 'native-base';
import  api from '../utils/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapViewDirections from 'react-native-maps-directions';

const Mapa = ({route, navigation}) => {

  const { rol } = route.params;
  const { token } = route.params;
  const { datoProp } = route.params;
  const { modal } = route.params;

  const origin = {latitude: 9.8889629, longitude: -67.3940487};
  const destination = {latitude: 9.911336, longitude: -67.358397};
  const  GOOGLE_MAPS_APIKEY  =  'AIzaSyCx2AjmdbaFLqMYQZUR4a96N0lVM3-3zgg';
  //const {navigation} = props;
  console.log('mensaje desde Mapa navigation', navigation)
  console.log('mensaje desde Mapa datoProp', datoProp)
  console.log('mensaje desde Mapa modal', modal)

  const value = AsyncStorage.getItem('key_dat'); 
  console.log('dato de AsyncStorage ', value);
  //console.log('mensaje del rol desde la parte de arriba ', rol)
  //const { token } = route.params;
  SecureStore.setItemAsync('rol', rol);
  SecureStore.setItemAsync('key_token', token);

  const [position, setPosition] = useState(null);
  const [markersTransport, setMarkersTransport] = useState([]);
  const [markersEst, setMarkersEst] = useState([]);
  const [markersChofer1, setMarkersChofer1] = useState([]);
  const [markersChofer2, setMarkersChofer2] = useState([]);
  const [markersChofer3, setMarkersChofer3] = useState([]);
  const [markersDist, setMarkersDist] = useState([]);
  const [markersChof, setMarkersChofer] = useState([]);
  const [ isloadin, guardarIsloadin] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalGeol, setModalGeol] = useState(modal);
  const [markersParadas, setMarkersParadas] = useState([]);

 


  
  

  const getPosition = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      console.log('posicion', coords);
      /*setMarkers([
        {
          latitude: coords.latitude,
          longitude: coords.longitude,
          message: "Transporte",
        },
      ]);*/
     await GuardarLatitlongit(coords)
     var dt = await MostarLatiLogit()
     console.log("datos transport", dt)
     //setMarkersTransport(dt)


    }catch (error) {
      console.log("getPosition -> error", error);
    }
  };

  const entryPoint = async () => {
   
    try {
      const { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        getPosition();
        //setModalGeol(true);
  
      }else{
        ToastAndroid.show('Se denegó el permiso para acceder a la ubicación', ToastAndroid.SHORT);
        //console.log("markersEst", markersEst)
        setModalGeol(false);
      }
    }catch (error) {
      console.log("getPermissionAndPosition -> error", error);
  
    }
  };

  useEffect(() => {
   
    isAuthToken();
     MostrarParadas();
    
  },[]);
  useEffect(() => {
      setTimeout(() => {
        guardarIsloadin(false);
      },
      10)
  }, []);

  useEffect(() => {
   
        //isAuthToken();
        entryPoint();
        //setModalGeol(false)
        //ObtenerLatiLogitChofer();
    
  }, [markersEst]);

  
  useEffect(() => {
    setTimeout(() => {
      markersChofer1
      markersChofer2
      markersChofer3
    },
    10) 

  }, [markersEst]);

//Enviando el token

async function isAuthToken(){
  setModalGeol(true);
        let token = await SecureStore.getItemAsync('key_token');
           console.log('espera..');

         
          let repuest =  api.defaults.headers['x-access-token'] = token;
          //console.log('Enviando el token ', repuest);
}


//Enviando las cordenas del estudiante al servidor

async function GuardarLatitlongit(coords){

  let latitude = coords.latitude
  let longitude = coords.longitude
  let rol = await SecureStore.getItemAsync('rol');

  //console.log('rol del studiante ', rol)

  console.log('coords', coords);
  const datos = {
    'latitude': latitude,
    'longitude': longitude,
    'rol': rol}

    try {
    

      var repuesta = await api.post('api/v1/coordinates/creates', datos); 

      console.log('Repuesta de la vista del mapa', repuesta);
        
    }catch (error) {
      console.log(error);
      guardarIsloadin(false);
        Alert.alert('', 'En este momento el servicio no esta disponible');
    }

}
 

  async function MostarLatiLogit(){
    
    try {
      
      var repuesta = await api.get('api/v1/users/actives'); 

      var dat = repuesta.data.dataUser 

      console.log('repuesta de los usuario activos dat repuesta.data.dataUser --->', dat)
      console.log('dato modalGeol --->', modalGeol)

     //console.log('Repuesta de la vista del mapa obteniendo los usuarios activos-->', repuesta.data);
      //setMarkers(datedrive)
        //var datedrive = []

        var ChoferLatLong = []
        var EstudianteLatLong = []
        var ChoferLatLong1 = []
        var ChoferLatLong2 = []
        var ChoferLatLong3 = []
        //setMarkersChofer(EstudianteLatLong)
        var userEstud = "peTfqIOeJsXbyC9V4QybENehseu2"
        var user1 = "6GQrwOrX2jTgQCzZpndA5VZGPCv1"
        var user2 = "f3mDeN5kWZgvJx4NTKordS1osqD2"
        var user3 = "x8uUPGNrf6gtN9UPNtZZWlE0z7r2"
        
    
      for (var dato in dat ) {

         if (dat[dato].hasOwnProperty('key')) {
          console.log("for prueba---->", dat[dato])

          console.log("datos del for--->", dat[dato].key)
          var repuest = await api.get(`api/v1/coordinate/${dat[dato].key}`)
          console.log("repuestaN-->", repuest);
          //datedrive.push({key:repuest.data})
          if (repuest.data != null) {
            for(var datos in repuest.data){
              console.log("forNUevo-->", repuest.data[datos]);

                if (repuest.data[datos].user==user1) {
                  
                  console.log("else if chofer1");
                  ChoferLatLong1.push({key:repuest.data[datos]})
                  console.log('datos de las cordenadas del chofer--->', repuest.data[datos])
                }
                else if (repuest.data[datos].user== user2) {
                  console.log("else if chofer2", repuest.data[datos]);
                  ChoferLatLong2.push({key:repuest.data[datos]})
                }else if (repuest.data[datos].user== user3) {
                  console.log("else if chofer3-->", );
                  ChoferLatLong3.push({key:repuest.data[datos]}) 
                }
                else if(repuest.data[datos].rol=== "student"){
                  console.log("else if estudiante-->");
                  EstudianteLatLong.push({key:repuest.data[datos]})
                  console.log('datos de las coordenadas del estudiante--->', repuest.data[datos])
                }
            }   
            //
          }
          console.log('Repuesta obteniendo las cordenadas 111----->', repuest)
          
         }

        
          
      }

      setModalGeol(false)

      //var datEst = await EstudiAnteLatLon(EstudianteLatLong)
      setMarkersEst(EstudianteLatLong)
      setMarkersChofer1(ChoferLatLong1)
      setMarkersChofer2(ChoferLatLong2)
      setMarkersChofer3(ChoferLatLong3)
      //console.log('datEst------>', datEst)
    
      //console.log('markersEst 2------>', markersEst)
      //ChoferteLatLon(ChoferLatLong)

      // var Distancias = []
      // var idDat = 0;
      // for (var dato in ChoferLatLong) {
      

      //   if (ChoferLatLong[dato].hasOwnProperty('key')) {
      //     console.log('dato id dese Mapa ----->', idDat);
      //     console.log('dato dentro del for ChoferLatLong Posicion ', dato,  " dato ", ChoferLatLong[dato].key)
  
      //     Distancias.push({distancia: GetDistancia(EstudianteLatLong[0].key.latitude, EstudianteLatLong[0].key.longitude, ChoferLatLong[dato].key.latitude, ChoferLatLong[dato].key.longitude)})
      //   }
       
      // }
      // setMarkersDist(Distancias)
      //console.log('Distancia arreglo--->', Distancias)
      //setMarkers(datedrive)
      //console.log('datedrive--->1', datedrive)
     // console.log('arreglo ChoferLatLong-->', ChoferLatLong)
      //console.log('arreglo EstudianteLatLong-->', EstudianteLatLong[0].key)

      //return ChoferLatLong;

    
    }catch (error) {
      console.log(error);
      guardarIsloadin(false);
        Alert.alert('', 'En este momento el servicio no esta disponible');
    }

  }

  async function MostrarParadas(){

    var paradas = []
    var repuesta = await api.get('/api/v1/stops'); 
    
    var datosRepuest = repuesta.data.data
    console.log("Paradas", repuesta.data.data)
    for(var dato in datosRepuest){
      console.log("forPardas", repuesta.data.data[dato])
      paradas.push({key:repuesta.data.data[dato]})
      //console.log("forPar", dato)
    }


    setMarkersParadas(paradas)
   
  }
 
  console.log("datos del marker intententando 1233444---> ", markersTransport)
  console.log('estudiante------>', markersEst)
  console.log('chofer1------>', markersChofer1)
  console.log('chofer2------>', markersChofer2)
  console.log('chofer3------>', markersChofer3)
  //console.log('markersEst 2 ------>', markersDist)
  //console.log('Modal Salir 3 ------>', modalSalir)

  function ChangeModalVisible(bool){
    setModalVisible(bool);
  }

  // const ChangeModalVisible = (bool) => {
  //   setModalVisible(bool);
  // }
 
  function closeModal(bool){
    setModalVisible(bool);
  }
//  const closeModal = (bool, data) => {
//     setModalVisible(bool);
//   } 



   


  return(

    

    <View style={styles.container}>
      <MapView
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={{
          latitude: 9.91152,
          longitude: -67.35381,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,

        }}
        mapType="mutedStandard"
        minZoomLevel={14}
       >
  {markersChofer1.map((marker, index, key) => (
        <Marker
          key={index}
            coordinate={{
              'latitude': marker.key.latitude,
              'longitude': marker.key.longitude,
            }}
            image={require('../assets/buss.png')}
            title={key.id, marker.key.rol}

          />
    ))}

    {markersChofer2.map((marker, index, key) => (
        <Marker
          key={index}
            coordinate={{
              'latitude': marker.key.latitude,
              'longitude': marker.key.longitude,
            }}
            image={require('../assets/buss.png')}
            title={key.id, marker.key.rol}

          />
    ))}
   
    {markersEst.map((marker, index, key) => (
      <Marker
        key={index}
        coordinate={{
          'latitude': marker.key.latitude,
          'longitude': marker.key.longitude,
        }}
        image={require('../assets/student.png')}
        title={key.id, marker.key.rol}
      />
    ))}

    {markersParadas.map((marker, index, key) => (
      <Marker
        key={index}
        coordinate={{
          'latitude': marker.key.latitude,
          'longitude': marker.key.longitude,
        }}
        
        //image={require('../assets/paradas1.jpg')} style={{width:'-100%', height:'-100%' }}
        title={key.id, marker.key.name}
      />
    ))}


      </MapView>

   
      
    
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => ChangeModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Distancia De Unidades</Text>
              <Text style={styles.linea}></Text>
            
               
                  <FlatList 
                      key={markersDist.id}
                      data={markersDist} 
                      renderItem={
                        ({item}) =>
                        <Card >
                          <CardItem  style={styles.DatoDialogDistancCard}>
                            <Text >Distancia: {item.distancia} km {"\n"}</Text>
                            
                          </CardItem>
                        </Card>
                      } 
                      keyExtractor={(item, index) => index.toString()}
                    />
                
              <View style={styles.buttonsView} >
              

                <TouchableHighlight onPress={ () => closeModal(false, 'Cancel')} style={globalStyles.btnSubmitAler}>
                  <Text style={globalStyles.textoSubmitAlerSalir}> Salir </Text>
                </TouchableHighlight>

                <Text style={styles.linea2}></Text>
                
              </View>
            </View>
            
          </View>
        </Modal>

      </View>


     
      {modalGeol==true 
                      ?  
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalGeol}
                        onRequestClose={false}>
                        <View style={styles.centeredViewGeo}>
                              <View style={styles.modalViewGeo}>

                                  <ActivityIndicator  size="large" color="#0000ff" />

                                  <View style={styles.modalTextGeo}> 
                                    <Text >Cargando Geolocalización...</Text>
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
     
       
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => ChangeModalVisible(true)}
      />

     <StatusBar barStyle={'default'} />
     
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
  },
  enteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flex:1,
    margin: 100,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 100,
    paddingHorizontal: 10,
  
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

  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    width: 200,
    marginTop: -90,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: '#ADADAD'
   
  },

  modalTextGeo: {
    textAlign: 'center',
    marginTop: 10
  },
  containerM: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',


  },

  centeredViewGeo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  containerSafeA: {
    marginTop: 20,
    paddingHorizontal: -4,
   
   

  },
  DatoDialogDistancCard : {
    flexDirection: 'column'
    
   
  },

  DatoDialogTiempo : {
    paddingRight: 95
  },

  buttonsView: {
    justifyContent: 'flex-start',
   
 
  },
  touchableOpacity: {
    width: 60,
    height: 20,
    marginTop: 90,
    borderRadius: 10,
    backgroundColor: 'red',
    marginVertical: 10,
    marginHorizontal: '28%',
    padding: 7,
  },
  TextDis: {
    width: 70,
    marginTop: 30,
    justifyContent: 'flex-start',
    
  },
  linea: {
    marginTop: 10,
    borderRadius: 10,
    width: 190,
    height: 4,
    backgroundColor: '#ADADAD'
  },
   linea2: {
    marginTop: -50,
    borderRadius: 10,
    width: 190,
    height: 4,
    backgroundColor: '#ADADAD'
  },
  modalSal: {
    justifyContent: 'center',
  }
  
});



export default Mapa;