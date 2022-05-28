import React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

const ModalSalir = ({route}) => {
	const { dato } = route.params;
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
      <Portal>
        <Modal visible={dato} onDismiss={true} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default ModalSalir;