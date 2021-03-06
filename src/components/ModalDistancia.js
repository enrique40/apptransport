import React, { useState } from 'react';
import {createContext} from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';





export default function ModalDistancia(dato) {

  console.log("Mensaje desde la el componente ModalDistancia", dato)
  //const [modalVisible, setModalVisible] = useState(isloadinWif);
   //console.log("Mensaje desde la el componente ModalDistancia state", modalVisible)
  const ChangeModalVisible = (isloadinWif) => {
    //setModalVisible(isloadinWif);
  }
 
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={dato}
        onRequestClose={() => ChangeModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={require('../assets/wifi_connected_no_internet.png')} />
            <Text style={styles.modalText}>Revise su conexion a internet!</Text>

          
          </View>
        </View>
      </Modal>
    </View>
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
