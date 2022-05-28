import React, { useState } from 'react';
import {createContext} from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import  globalStyles from '../styles/global';




export default function Salir({route}) {
 
    const { datoo } = route.params;
  console.log('mensaje desde el componente Salir ', datoo);
  const ChangeModalVisible = (bool) => {
  
  }
 
  return (

    

      <Modal
        animationType="fade"
        transparent={true}
        visible={datoo}
        onRequestClose={() => ChangeModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          
            <Text style={styles.modalText}>Desea Cerrar Sesion?</Text>



          
          </View>
        </View>
      </Modal>

  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
   
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    marginBottom: 15,
    textAlign: 'center',
  },
});
