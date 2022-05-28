import React, { Component } from 'react';
import { Modal, StyleSheet, View, Text, ActivityIndicator } from 'react-native';




function ProgressBar({isloadin}) {
	console.log('mensaje desde progresbar', isloadin)

	return (
		<View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isloadin}
                onRequestClose={() => ChangeModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ActivityIndicator size="large" color="#0000ff" />

                        <Text style={styles.modalText}>Cargando...</Text>
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
    padding: 20
  },
  modalView: {
    margin: 40,
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
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
    textAlign: 'center',
  
   
  },
});

export default ProgressBar