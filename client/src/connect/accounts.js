import getWeb3 from "../getWeb3";

class accountsConnect {
  static getAccounts = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    return accounts;
  }
}

export default accountsConnect;