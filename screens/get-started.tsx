import {Alert, SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import PrimaryButton from '../components/primary-button';
import Theme from '../constants/theme';
import {AppRoutes} from '../constants/routes';
import {Web3Helper} from '../web3/web-three-helper';

export default function GetStarted({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
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
});
