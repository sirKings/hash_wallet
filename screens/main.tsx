import {
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

export default function Main({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.balance}>500</Text>
        <Text style={styles.label}>Eth Balance</Text>

        <View style={styles.addressBox}>
          <Text>dhsjdsldshkslsdkjslksd;sdskj</Text>

          <Pressable>
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
      </View>
      <PrimaryOutlineButton
        title={'Log out'}
        onPressed={() => navigation.navigate(AppRoutes.HOME)}
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
    padding: 20,
    borderRadius: 10,
  },
});
