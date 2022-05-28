import React, {useState, useEffect} from 'react';
import {Text, View, Button, StyleSheet, TextInput, ScrollView, TouchableHighlight, ActivityIndicator} from 'react-native';
import { Avatar, Card, Title, Paragraph, Modal } from 'react-native-paper';
import  api from '../utils/Api';
import   globalStyles from '../styles/global';

function Paradas() {

  const [modalDatos, setmodalDatos] = useState(true);
  const [name, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setlasName] = useState('');

  useEffect(() => {
    datosProfile()
  }, [])

  const datosProfile = async () => {
    var repuesta = await api.get('/api/v1/user/profile');
    console.log('datosperfil', repuesta);
    /*setNombre(repuesta.data.data.name)
    setEmail(repuesta.data.data.email)
    setlasName(repuesta.data.data.lastName)
    setmodalDatos(false);*/
  }

  return (
    <View style={styles.centeredView}>
          <Card style={styles.tarjeta}>
          <Card.Content> 
            <Avatar.Image size={80} source={require('../assets/avatar1.png')} style={styles.logo}/>

            <ScrollView>
            
              <Paragraph>Nombre</Paragraph>
               <TextInput
                   style={styles.textInput}
                          placeholder="Nombre"
                          placeholderTextColor="#969696"
                 		  value={name}	
                      />

                      <Paragraph>Apellido</Paragraph>  

                      <TextInput
                        style={styles.textInput}
                          placeholder="Apellido"
                          placeholderTextColor="#969696"
                          value={lastName}
                           
                      />

                      <Paragraph>Carrera</Paragraph>  
                      <TextInput
                        style={styles.textInput}
                          placeholder="Carrera"
                          placeholderTextColor="#969696"
                           
                      />

                      <Paragraph>Semestre</Paragraph>  
                      <TextInput
                        style={styles.textInput}
                          placeholder="Semestre"
                          placeholderTextColor="#969696"
                           
                      />
             
               <Paragraph>Telefono</Paragraph>
               <TextInput
                        style={styles.textInput}
                          placeholder="Telefono"
                          placeholderTextColor="#969696"
                           
                      />
                <Paragraph>Correo</Paragraph>
               <TextInput
                        style={styles.textInput}
                          placeholder="Correo"
                          placeholderTextColor="#969696"
                          value={email}
                      />
                       <Paragraph>Direccion</Paragraph>  
                      <TextInput
                        style={styles.textInput}
                          placeholder="Direccion"
                          placeholderTextColor="#969696"
                          multiline={true}
                           
                      />

                       {modalDatos==true 
                      ?  
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalDatos}
                        onRequestClose={false}>
                        <View style={styles.centeredViewGeo}>
                              <View style={styles.modalViewGeo}>

                                  <ActivityIndicator  size="large" color="#0000ff" />


								  <View style={styles.modalTextGeo}> 
                                    <Text >Cargando Datos...</Text>
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
                    </ScrollView>
                     
          </Card.Content>
        </Card>

          

      </View>
  

       
    
  );
} 


const styles = StyleSheet.create({
  container: {
    flex: 1,
      
  },
  tarjeta: {
    flex: 1,
      backgroundColor: '#ffffff',
      padding: 10,
      margin: 50,
      marginHorizontal: '5%',
      borderRadius: 20,
  },
   logo: {
    marginTop: -60,
    marginVertical: 10,
    marginHorizontal: '40%',
    backgroundColor: 'white'

  },
  
  centeredViewGeo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 55
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
  textInput: {
    backgroundColor: '#ADADAD',
  paddingHorizontal: '30%',
  },
   buttonsView: {
    justifyContent: 'flex-start',
 
  },
   centeredView: {
    flex: 1,
    alignItems: 'center',


  },
  centeredView: {
    flex: 1,
    alignItems: 'center',


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

});

export default Paradas;