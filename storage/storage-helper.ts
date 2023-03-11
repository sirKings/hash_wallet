import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageHelper {
  private PRIVATE_KEY = 'pkey';
  private PUBLIC_ADDRESS = 'pAddress';

  getEncryptedPrivatekey = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(this.PRIVATE_KEY);
  };

  saveEncryptedPrivateKey = async (value: string) => {
    return await AsyncStorage.setItem(this.PRIVATE_KEY, value);
  };

  savePublicAddress = async (value: string) => {
    return await AsyncStorage.setItem(this.PUBLIC_ADDRESS, value);
  };

  getPublicAddress = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(this.PUBLIC_ADDRESS);
  };

  clear = async () => {
    await AsyncStorage.removeItem(this.PRIVATE_KEY);
    await AsyncStorage.removeItem(this.PUBLIC_ADDRESS);
  };
}
