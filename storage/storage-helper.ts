import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageHelper {
  private PRIVATE_KEY = "pkey";

  getEncryptedPrivatekey = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(this.PRIVATE_KEY);
  };

  saveEncryptedPrivateKey = async (value: string) => {
    return await AsyncStorage.setItem(this.PRIVATE_KEY, value);
  };

  clear = async () => {
    await AsyncStorage.removeItem(this.PRIVATE_KEY);
  };
}
