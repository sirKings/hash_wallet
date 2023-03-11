import {INFURA_URL} from '@env';
import 'node-libs-react-native/globals.js';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';

export class Web3Helper {
  getWalletFromSeedPhrase = async (phrase: string): Promise<string> => {
    const wallet = ethers.Wallet.fromMnemonic(phrase);
    return wallet.getAddress();
  };

  getBalanceFromAddress = async (address: string): Promise<string> => {
    const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  };
}

// const getblockNumber = async () => {
//   const phrase =
//     'capital point denial leg maid mosquito blood frame erase sustain property mask';

//   getWallet(phrase);
// };

// const getWallet = async (phrase: string) => {
//   const provider = new ethers.providers.JsonRpcProvider(
//     'https://mainnet.infura.io/v3/c984113f6f26487d970a85d66714024b',
//   );

//   //const wallet = ethers.Wallet.fromMnemonic(phrase);

//   const balance = await provider.getBalance(
//     '0xF43Af58E08923b2d08a834a1eF6E1668f0d28cEc',
//   ); //wallet.address);
//   // const block = await provider.getBlockNumber();

//   //console.log(wallet.address);

//   Alert.alert(' Balance is ' + balance);
// };
