import {
  Clipboard,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Theme from '../constants/theme';
import {AppRoutes} from '../constants/routes';
import PrimaryOutlineButton from '../components/primary-outline_button';
import theme from '../constants/theme';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import {StorageHelper} from '../storage/storage-helper';
import AwesomeAlert from 'react-native-awesome-alerts';
import {CryptoHelper} from '../crypt/crypto-helper';
import {Web3Helper} from '../web3/web-three-helper';

export default function Main({navigation}: any) {
  const [address, onChangeAddress] = useState('');
  const [balance, onChangeBalance] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [error, setError] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const showToast = (msg: string, title: string = 'Error') => {
    setAlertTitle(title);
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

  useEffect(() => {
    fetchAddressFromLocalStorage();
  }, []);

  const hideAlert = () => {
    setShowAlert(false);
  };

  const fetchAddressFromLocalStorage = async () => {
    const address = await new StorageHelper().getPublicAddress();
    console.log('Cipher here', address);

    if (!address) {
      showToast('No Address found');
      return;
    }

    showProgressAlert();

    const web3 = new Web3Helper();
    const balance = await web3.getBalanceFromAddress(address);

    onChangeAddress(address);
    onChangeBalance(balance);
    hideAlert();
  };

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.main}>
        <Text style={styles.balance}>{balance}</Text>
        <Text style={styles.label}>Eth Balance</Text>

        <View style={styles.addressBox}>
          <Text>{address}</Text>
        </View>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            Clipboard.setString(address);
            showToast('Address copied to clipboard', 'Copied');
          }}>
          {({pressed}) => (
            <FontAwesomeIcon
              icon={faCopy}
              size={25}
              color={theme.Colors.primary}
              style={{marginLeft: 25, opacity: pressed ? 0.5 : 1}}
            />
          )}
        </Pressable>
      </View>
      <PrimaryOutlineButton
        title={'Log out'}
        onPressed={() => {
          new StorageHelper().clear();
          navigation.navigate(AppRoutes.HOME);
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
    paddingBottom: 30,
  },
  balance: {
    color: Theme.Colors.primary,
    fontSize: 100,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    color: Theme.Colors.primary,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  main: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  logout: {
    marginBottom: 30,
    width: '70%',
    backgroundColor: 'red',
  },
  addressBox: {
    flexDirection: 'row',
    marginTop: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },

  pressable: {
    alignItems: 'flex-end',
    padding: 10,
  },
});
