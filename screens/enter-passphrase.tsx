import {
  Alert,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PrimaryButton from '../components/primary-button';
import {useEffect, useState} from 'react';
// @ts-ignore
import PincodeInput from 'react-native-pincode-input';
import theme from '../constants/theme';
import {AppRoutes} from '../constants/routes';
import {Web3Helper} from '../web3/web-three-helper';
import AwesomeAlert from 'react-native-awesome-alerts';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';

export default function EnterPassphrase({navigation}: any) {
  const [text, onChangeText] = useState('');
  const [pin, onPinChange] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [error, setError] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const showToast = (msg: string) => {
    setAlertTitle('Error');
    setError(msg);
    setShowProgress(false);
    setShowAlert(true);
  };

  const showProgressAlert = () => {
    setAlertTitle('Please wait');
    setError('Processign data...');
    setShowProgress(true);
    setShowAlert(true);
  };

  const submit = async () => {
    //navigation.navigate(AppRoutes.MAIN)

    if (text.length == 0) {
      showToast('Please enter your seed phrase');
      return;
    }

    const phrase = text.trim().toLowerCase();

    if (phrase.split(' ').length != 12) {
      showToast('Please enter a 12 seed phrase');
      return;
    }

    showProgressAlert();

    const helper = new Web3Helper();

    const address = helper
      .getWalletFromSeedPhrase(phrase)
      .then(res => {
        showToast('Correct ' + res);
      })
      .catch(error => {
        showToast('' + error);
      });
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.header}>
                Please create a PIN to protect your wallet
              </Text>
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
                onTextChange={onPinChange}
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
        <Text style={styles.header}>
          Please enter your seed phrase below. Be careful to avoid typographical
          error.
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={8}
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={'Type here'}
        />
      </View>
      <PrimaryButton title={'Continue'} onPressed={submit} />
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlignVertical: 'top',
  },
  inputView: {
    width: '90%',
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
