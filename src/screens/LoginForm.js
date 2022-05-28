import React, {useState, useEffect, createContext, Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput,
        Button, ToastAndroid , TouchableHighlight, 
        ImageBackground, Alert, Image, ActivityIndicator, Modal, AsyncStorage, KeyboardAvoidingView
      } from 'react-native';
import  globalStyles from '../styles/global';
import NetInfo from '@react-native-community/netinfo';
import antivityIndicador from '../components/AntivityIndicador';
import { validateEmail } from '../utils/validations';
import * as SecureStore from 'expo-secure-store';
import ModalDistanc from '../components/ModalDistancia';
import  api from '../utils/Api';
import PropsContext from '../useContext/PropsContext';
import { login  } from '../actions/Proosp';
import { AntDesign, Entypo } from '@expo/vector-icons'; 
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';




export default function LoginForm({navigation}) {

    console.log('mensaje desde login navigation', navigation)
   // const PropsContext = createContext(null);

    //campos formulario
    const [ email, guardarEmail] = useState('');
    const [ password, guardarContraseña] = useState('');
    const [ isloadin, guardarIsloadin] = useState(false);
    const [ isloadinWif, guardarIsloadinWif] = useState(false);
    const [ isprogres, guardarProgres] = useState(false);
    const [cont, setCont] = useState('')
    const [show, setShow] = useState(false)



    useEffect(() => {
    
        connectionWifi();
        //isAuthToken();
        //guardarIsloadin(false);
    }, []);
   

    const connectionWifi = async () => {
      console.log('entro en la fucion de wifi')
       //dispatch(login(navigation))
       var state = await NetInfo.fetch();
       //console.log('state', state.isConnected);
       if (!state.isConnected) {
        guardarIsloadinWif(true)
        //console.log('dentro del if de connectionWifi');
        //Alert.alert('Error', 'Revise su conexion wifi', <Image source={require('../assets/pantalla.png')} /> );
       }

  
     
    }


    const isAuthToken = async () => {
      let token = await SecureStore.getItemAsync('key_token');
         console.log('espera..');
        let repuest =  api.defaults.headers['x-access-token'] = token;
        console.log('Enviando el token ', repuest);
      
    }

    //Guarda los Datos en la BD
    const GuardarLogin = async (bool) => {
       
      //Validar
      if (email === '' || password === '') {
        {await connectionWifi()}
        //guardarMensaje('Todos los campos son obligatorios');
        ToastAndroid.show('Todos los campos son obligatorios', ToastAndroid.SHORT);
      }else if(!validateEmail(email)){
        {await connectionWifi()}
          ToastAndroid.show('El email que esta ingresando no es valido verifique su email', ToastAndroid.SHORT);
      } else{

        //Generar el cliente
        const datos = { email, password };
  
        {await connectionWifi()}
        //guardar el cliente en la api
        try {
          console.log('dentro del try');
         guardarIsloadin(bool)
          var repuesta = await api.post('/api/v1/session/signin', datos);

           console.log('Repuesta en login--->', repuesta);
          
       
        //console.log('Imprimiendo variable profile', repuesta.data.value.profile);

          if (repuesta.data.hasOwnProperty('value')) {
              //const {roles} = repuesta.data.value.datauser;
            if (repuesta.data.value.datauser.roles == "student") {
                
              
              if (repuesta.data.value.datauser.profile == true){
                {await isAuthToken()}
                const { token } = await repuesta.data.value;
                const {roles} = repuesta.data.value.datauser;
                SecureStore.setItemAsync('key_token', token);

                guardarIsloadin(false);

                navigation.navigate('mapa', {
                  rol: roles,
                  token: token,
                  modal: true
                });
                //guardarIsloadin(false);
                  
                console.log('dentro del if ');
              }else{
                {await isAuthToken()}
                console.log('dentro del else if');
                const { lastName } = await repuesta.data.value.datauser;
                const { roles } = await repuesta.data.value;
                console.log("id usuario ", roles);
                const { name } = await repuesta.data.value.datauser;
                const { token } = await repuesta.data.value;
                SecureStore.setItemAsync('key_token', token);
                console.log("name ", name);
                console.log("lastName ", lastName);
                console.log("token ", token);
                //redireccionar
                navigation.navigate('profile', {
                  name: name,
                  lastName: lastName,
                  rol: roles
                });
                guardarIsloadin(false);
                ToastAndroid.show('Inicio de sesion exitosa', ToastAndroid.SHORT);
              }  

            }else{
              guardarIsloadin(false)
              ToastAndroid.show('Esta cuenta no pertenece a un estudiante', ToastAndroid.SHORT);
            }  
          }else{
            //console.log('Error de la repuesta', repuesta.data.Error.errorMessage);
            //ToastAndroid.show(repuesta.data.Error.errorMessage, ToastAndroid.SHORT);
            guardarIsloadin(false);
            ToastAndroid.show('No eres estudiante/ o contraseña incorreacta', ToastAndroid.SHORT);
          }
          

         
          
        }catch (error) {
          console.log('ERROR del la repuesta Login',error);
          guardarIsloadin(false);
           //Alert.alert('', 'En este momento el servicio no esta disponible');
        }

      }
    
 
      // limpiar el from (opcional)
    }

    const ChangeModalVisible = (bool) => {
      guardarIsloadinWif(bool);
    }
 
    const closeModal = (bool, data) => {
      guardarIsloadinWif(bool);
    }


    /*if (isloadin) {
      <Dialog
        visible={isloadin}
        title="Custom Dialog"
        onTouchOutside={() => this.setState({dialogVisible: false})} >
          <View>
              Cargando...
          </View>
      </Dialog>
    }*/

    return (
   
        <>
          <View style={globalStyles.container}>
            <ImageBackground source={require('../assets/pantalla.png')} 
                style={globalStyles.image} > 
                  <View style={globalStyles.contenedor}>
                     
                  <Image style={styles.tinyLogo} source={require('../assets/profile.png')} />
                    
                        <TextInput style={globalStyles.input} 
                          placeholder="Email"
                          placeholderTextColor="#969696"
                          onChangeText={ texto => guardarEmail(texto) }
                          value={email}
                          
                        />

                        <TextInput style={globalStyles.input} 
                          placeholder="Password"
                          onChangeText={ texto => guardarContraseña(texto) }
                          value={password}
                          placeholderTextColor="#969696"
                          secureTextEntry={true}
                        />

                    <TouchableHighlight onPress={ () => GuardarLogin(true) } style={globalStyles.btnSubmit}>
                      <Text style={globalStyles.textoSubmit}> INICIAR SECCIÓN </Text>
                    </TouchableHighlight>



                    {isloadin==true 
                      ?  
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={isloadin}
                        onRequestClose={false}>
                        <View style={styles.centeredView}>
                              <View style={styles.modalView}>

                                  <ActivityIndicator style={styles.Indicador} size="large" color="#0000ff" />

                                  <View style={styles.modalText}> 
                                    <Text >Cargando...</Text>
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
                          <View style={styles.centeredView}>
                              <View style={styles.modalView}>
                                  <ActivityIndicator size="large" color="#0000ff" />

                                  <Text style={styles.modalText}>Cargando...</Text>
                              </View>
                          
                          </View>
                        </Modal>
                    }


                    {isloadinWif==true 
                    ?
                    <Modal
                      animationType="fade"
                      transparent={true}
                      visible={isloadinWif}
                      onRequestClose={() => ChangeModalVisible(false)}>
                      <View style={styles.centeredViewWifi}>
                        <View style={styles.modalViewWifi}>
                          <View style={styles.imgwifi}>
                            <Image  source={require('../assets/wifi_connected_no_internet.png')} />
                          </View> 
                         
                          <Text style={styles.modalTextwifi}>Sin conexion a internet!</Text>

                          <View style={globalStyles.btnDialogWif}>
                            <TouchableHighlight onPress={ () => closeModal(false, 'Ok')} >
                              <Text style={globalStyles.textoDialogWif}> Ok </Text>
                            </TouchableHighlight>
            
                          </View>
                         
                        </View>
       

        
                      </View>
                    </Modal>
                    :
                    <Modal
                      animationType="fade"
                      transparent={true}
                      visible={false}
                      onRequestClose={() => ChangeModalVisible(false)}>
                      <View style={styles.centeredViewWifi}>
                        <View style={styles.modalViewWifi}>
                          <Image source={require('../assets/wifi_connected_no_internet.png')}  style={globalStyles.imgWif}/>
                          <Text style={styles.modalTextwifi}>Sin conexion a internet!</Text>

                          <TouchableHighlight onPress={ () => closeModal(false, 'Ok')} style={globalStyles.btnDialogWif}>
                            <Text style={globalStyles.textoDialogWif}> Ok </Text>
                          </TouchableHighlight>
            
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
  progresBar: {
     flex: 1,
     justifyContent: 'space-evenly',
     padding: 10,
  },
  containerInicator: {
    flex: 1,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 120,
  },
  centeredViewWifi: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 120,
    paddingVertical: 20
  },
    modalViewWifi: {
    marginHorizontal: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalView: {
    flexDirection: 'row',
    width: '57%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
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
  modalText: {
    marginTop: -1,
    marginHorizontal: "10%",
  
   
  },
  inputIconEmail: {
    position: 'absolute',
    marginBottom: 15,
    marginLeft: 39
  },
  inputIconPassword: {
    position: 'absolute',
    marginTop: 25,
    marginLeft: 40
  },

  imgwifi: {
    marginBottom: 28,
    alignItems: "center"
   
  },
  
  Indicador: {
    justifyContent: 'space-evenly',
  
   
  },
  modalTextwifi: {
    textAlign: 'center'
  },
  tinyLogo: {
    width: 80,
    height: 80,
	  marginBottom: 36,
	  marginVertical: 10,
	  marginHorizontal: '40%',

  },
});