import {web3Connect} from "../utils";
import TrustlessFundFactory from '../contracts/TrustlessFundFactory.json';

class factoryConnect {
  static getFactory = async () => {
    const web3 = await web3Connect();
    const networkId = await web3.eth.net.getId();
    const factoryNetwork = TrustlessFundFactory.networks[networkId];
    const factory = new web3.eth.Contract(
      TrustlessFundFactory.abi,
      factoryNetwork && factoryNetwork.address,
    );
    return factory;
  }

  static getFundAddress = async (fundId) => {
    const factory = await this.getFactory();
    const fundAddress = await factory.methods.getFund(fundId).call();
    return fundAddress;
  }
}

export default factoryConnect;