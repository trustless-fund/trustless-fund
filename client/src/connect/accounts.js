import {web3Connect} from "../utils";

class accountsConnect {
  static getAccounts = async () => {
    const web3 = await web3Connect();
    const accounts = await web3.eth.getAccounts();
    return accounts;
  }
}

export default accountsConnect;