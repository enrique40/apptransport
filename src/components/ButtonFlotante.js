import  React, {useState} from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';

const ButtonFlotante = () => {
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={'plus'}
          actions={[
            {
              icon: 'email',
              label: 'Distancia Rutas',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: 'bell',
              label: 'Salir',
              onPress: () => console.log('Pressed notifications'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
              console.log('entro en el fi');
            }
            console.log('sepreciono el boton principal');
          }}
        />
      </Portal>
    </Provider>
  );
};

export default ButtonFlotante;