import {
  Alert,
  InteractionManager,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PrimaryButton from '../components/primary-button';
import Theme from '../constants/theme';
import {AppRoutes} from '../constants/routes';
import React, {useEffect, useState} from 'react';
import {StorageHelper} from '../storage/storage-helper';
// @ts-ignore
import PincodeInput from 'react-native-pincode-input';
import theme from '../constants/theme';
import {CryptoHelper} from '../crypt/crypto-helper';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function GetStarted({navigation}: any) {
  const [pin, onPinChange] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [error, setError] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const showToast = (msg: string, title: string = 'Error') => {
    setModalVisible(false);
    InteractionManager.runAfterInteractions(() => {
      setAlertTitle(title);
      setError(msg);
      setShowProgress(false);
      setShowAlert(true);
    });
  };

  const showProgressAlert = () => {
    setAlertTitle('Please wait');
    setError('Processign data...');
    setShowProgress(true);
    setShowAlert(true);
  };

  const checkUser = async () => {
    const helper = new StorageHelper();
    const address = await helper.getPublicAddress();
    if (address) {
      setModalVisible(true);
    }
  };

  const decryptAddress = async () => {
    const helper = new StorageHelper();
    const cipher = await helper.getEncryptedPrivatekey();
    console.log('Cipher', cipher);
    if (!cipher) {
      showToast('Invalid PIN');
      return;
    }
    const cryptoHelper = new CryptoHelper();
    const wallet = cryptoHelper.decryptKey(cipher, pin);
    if (!wallet) {
      showToast('Invalid PIN');
      return;
    }

    if (wallet.split('*')[0] == (await helper.getPublicAddress())) {
      setModalVisible(false);
      InteractionManager.runAfterInteractions(() => {
        navigation.navigate(AppRoutes.MAIN);
      });
    } else {
      showToast('Invalid PIN');
      return;
    }
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.header}>Please enter your pin to continue</Text>
            <PincodeInput
              autoFocus
              length={4}
              containerStyle={{
                display: 'flex',
                width: '100%',
                height: 200,
                justifyContent: 'center',
              }}
              circleContainerStyle={{
                paddingHorizontal: 32,
              }}
              circleEmptyStyle={{
                borderWidth: 1,
                borderColor: theme.Colors.primary,
              }}
              circleFilledStyle={{
                backgroundColor: theme.Colors.primary,
              }}
              pin={pin}
              onTextChange={(pin: string) => {
                onPinChange(pin);
                if (pin.length == 4) {
                  decryptAddress();
                }
              }}
            />
          </View>
        </View>
      </Modal>
      <AwesomeAlert
        show={showAlert}
        showProgress={showProgress}
        title={alertTitle}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        message={error}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor={theme.Colors.primary}
        onConfirmPressed={() => {
          hideAlert();
        }}
      />
      <Text style={styles.header}>Welcome to HashWallet</Text>
      <PrimaryButton
        title={'Get Started'}
        onPressed={() => {
          navigation.navigate(AppRoutes.ENTER_PASSPHRASE);
        }}
      />
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    color: Theme.Colors.primary,
    fontSize: 30,
    fontWeight: 'bold',
  },
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
    shadowRadius: 4,
    elevation: 5,
  },
});
