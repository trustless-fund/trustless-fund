import React, {Component} from 'react';
import InvalidFund from './InvalidFund';
import DepositWithdrawForm from './DepositWithdrawForm';
import Assets from './Assets';
import Expiration from './Expiration';
import Details from './Details';
import Settings from './Settings';
import Button from '../Shared/Button';
import Message from '../Shared/Message';
import Warning from '../Shared/Warning';
import TrustlessFundV1 from '../../contracts/TrustlessFund.json';
import TrustlessFundV2 from '../../contracts/TrustlessFundV2.json';
import TrustlessFundFactoryV1 from '../../contracts/TrustlessFundFactory.json';
import TrustlessFundFactoryV2 from '../../contracts/TrustlessFundFactoryV2.json';
import {TOKEN_LIST} from '../../utils/tokenList';
import ERC20 from '../../contracts/ERC20.json';
import {getUsdValue, isZeroAddress} from '../../utils/helpers';

import '../../layout/components/fund.sass';
import '../../layout/components/withdraw.sass';

class FundContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidFund: false,
      renderWithdrawal: false,
      depositModal: false,
      withdrawalModal: false,
      fund: null,
      message: null,
      txHash: null,
      userAssets: [],
      tokenList: null,
      allTokens: null,
      usdAmounts: null,
      searchToken: '',
      expiration: null,
      factory: null,
      settingsModal: false,
      renderSettings: false
    }
  }

  componentDidMount = async () => {
    this.initialize();
  }

  componentDidUpdate = () => {
    if(!this.state.factory) {
      this.initialize();
    }
  } 

  initialize = async () => {
    if(this.props.web3 && this.props.web3.givenProvider) {
      await this.getFactoryContract();
      await this.getFund();
      await this.getAssets();
      await this.getUsdAmounts();
      await this.setState({allTokens: TOKEN_LIST[this.props.networkId]});
      this.getTokenList();
      this.renderWithdrawal();
      this.renderSettings();
    }
  }

  getFactoryContract = () => {
    let factory;
    if(this.props.version === 'v1') {
      factory = new this.props.web3.eth.Contract(
        TrustlessFundFactoryV1.abi,
        TrustlessFundFactoryV1.networks[this.props.networkId].address
      )
    } else if(this.props.version === 'v2') {
      factory = new this.props.web3.eth.Contract(
        TrustlessFundFactoryV2.abi,
        TrustlessFundFactoryV2.networks[this.props.networkId].address
      )
    }
    this.setState({factory});
  }

  getFund = async () => {
    const fundAddress = 
      await this.state.factory.methods.getFund(this.props.fundId).call();

    const invalidFund = await isZeroAddress(fundAddress);
    await this.setState({invalidFund});

    if(!this.state.invalidFund) {
      let fund;
      if(this.props.version === 'v1') {
        fund = await new this.props.web3.eth.Contract(
          TrustlessFundV1.abi,
          fundAddress
        );
      } else if(this.props.version === 'v2') {
        fund = await new this.props.web3.eth.Contract(
          TrustlessFundV2.abi,
          fundAddress
        );
      }
    
      this.setState({fund});
    }
  }

  getExpiration = async () => {
    const expiration = await this.state.fund.methods.expiration().call();
    return expiration;
  }

  getBeneficiary = async () => {
    const beneficiary = await this.state.fund.methods.beneficiary().call();
    return beneficiary;
  }

  renderWithdrawal = async () => {
    const beneficiary = await this.getBeneficiary();
    const expiration = await this.getExpiration();
    const ts = Math.round((new Date()).getTime() / 1000);

    if(beneficiary.toLowerCase() === this.props.address.toLowerCase() && expiration < ts) {
      this.setState({renderWithdrawal: true});
    } else {
      this.setState({renderWithdrawal: false});
    }
  }

  renderSettings = async () => {
    const owner = await this.state.fund.methods.owner().call();

    if(this.props.address === owner) {
      this.setState({renderSettings: true});
    } else {
      this.setState({renderSettings: false});
    }
  }

  renderDepositModal = () => {
    this.setState({depositModal: true});
  }

  depositBackgroundClick = (e) => {
    const depositBackground = document.querySelector('.deposit__background');
    if(e.target === depositBackground) {
      this.closeDepositModal();
    }
  }

  closeDepositModal = () => {
    this.setState({depositModal: false})
  }

  renderWithdrawalModal = () => {
    this.setState({withdrawalModal: true});
  }

  withdrawBackgroundClick = (e) => {
    const withdrawBackground = document.querySelector('.withdraw__background');
    if(e.target === withdrawBackground) {
      this.closeWithdrawalModal();
    }
  }

  closeWithdrawalModal = () => {
    this.setState({withdrawalModal: false});
  }

  renderSettingsModal = () => {
    this.setState({settingsModal: true});
  }

  closeSettingsModal = (e) => {
    const settingsBackground = document.querySelector('.settings__background');
    if(e.target === settingsBackground) {
      this.setState({settingsModal: false});
    }
  }

  setMessage = (newMessage, txHash) => {
    this.setState({
      message: newMessage,
      txHash
    });
  }

  clearMessage = () => {
    this.setState({
      message: null,
      txHash: null
    });
  }

  getAssets = async () => {
    const tokenLUTSize = await this.state.fund.methods.getTokenSize().call();
    let userAssets = [];

    if(tokenLUTSize > 0) {
      for(let i = 0; i < tokenLUTSize; i++) {
        const tokenAddress = await this.state.fund.methods.tokenLUT(i).call();
        if(this.props.version === 'v1') {
          const token = await this.state.fund.methods.tokens(tokenAddress).call();
          userAssets.push({address: tokenAddress, balance: token.balance});
        } else if(this.props.version === 'v2') {
          let balance;
          if(tokenAddress === '0x0000000000000000000000000000000000000000') {
            balance = await this.props.web3.eth.getBalance(this.state.fund._address);
          } else {
            const token = await new this.props.web3.eth.Contract(
              ERC20, tokenAddress
            );
            balance = await token.methods.balanceOf(this.state.fund._address).call();
          }
          userAssets.push({address: tokenAddress, balance});
        }
      }
    }

    this.setState({userAssets});
  }

  handleSearchTokenChange = async (e, search) => {
    await this.setState({searchToken: e ? e.target.value : search});
    this.getTokenList();
  }

  getUsdAmounts = async () => {
    let usdAmounts = {}
    this.state.userAssets.forEach(async (asset) => {
      if(asset.balance > 0) {
        const usdAmount = await getUsdValue(asset.address, asset.balance);
        usdAmounts[asset.address] = usdAmount;
      }
    });

    this.setState({usdAmounts});
  }

  getTokenList = () => {
    const {allTokens} = this.state;
    let filteredTokens = allTokens;

    if(this.state.searchToken) {
      filteredTokens = Object.keys(allTokens)
        .filter(key => {
          return allTokens[key].symbol.toLowerCase().includes(this.state.searchToken.toLowerCase());
        }).reduce((obj, key) => {
          obj[key] = allTokens[key];
          return obj;
        }, {});
    }

    // Source: https://github.com/Uniswap/uniswap-frontend
    const tokenList = Object.keys(filteredTokens)
      .sort((a, b) => {
        if (filteredTokens[a].symbol && filteredTokens[b].symbol) {
          const aSymbol = filteredTokens[a].symbol.toLowerCase()
          const bSymbol = filteredTokens[b].symbol.toLowerCase()



          // Pin ETH to the top
          if (aSymbol === 'ETH'.toLowerCase() || bSymbol === 'ETH'.toLowerCase()) {
            return aSymbol === bSymbol ? 0 : aSymbol === 'ETH'.toLowerCase() ? -1 : 1;
          }

          // Tokens with a balance
          if(this.state.usdAmounts[a] && !this.state.usdAmounts[b]) {
            return -1;
          } else if(this.state.usdAmounts[b] && !this.state.usdAmounts[a]) {
            return 1;
          }

          // Sort by balance
          if (this.state.usdAmounts[a] && this.state.usdAmounts[b]) {
            const aUSD = this.state.usdAmounts[a]
            const bUSD = this.state.usdAmounts[b]

            return aUSD > bUSD ? -1 : aUSD < bUSD ? 1 : 0
          }

          // Sort remaining tokens alphabetically
          return aSymbol < bSymbol ? -1 : aSymbol > bSymbol ? 1 : 0
        } else {
          return 0
        }
      });

      // Remove aDai from token list if v1 fund
      let filteredTokenList;
      if(this.props.version === 'v1') {
        filteredTokenList = tokenList.filter(token => token !== '0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d');
      } else {
        filteredTokenList = tokenList;
      }

    this.setState({tokenList: filteredTokenList});
  }

  setExpiration = (expiration) => {
    this.setState({expiration});
  }

  render() {
    if(this.state.invalidFund) {
      return (<InvalidFund />);
    }

    if(this.state.fund) {
      return (
        <div className="fund">
          <Expiration 
            fund={this.state.fund}
            expiration={this.state.expiration}
            setExpiration={this.setExpiration} />
          {this.state.allTokens &&
            <Assets 
              userAssets={this.state.userAssets}
              tokenList={this.state.tokenList}
              allTokens={this.state.allTokens}
              web3={this.props.web3} />
          }
          <div className="fund__buttons">
            <div onClick={this.renderDepositModal}>
              <Button 
                text="Deposit" 
                class="solid fund__button" 
                link={null} 
                button={true}
              />
            </div>
            {this.state.userAssets.length > 0 && this.state.renderWithdrawal &&
              <div onClick={this.renderWithdrawalModal}>
                <Button text="Withdraw" class="outline fund__button" link={null} button={true} />
              </div>
            }
          </div>
          {this.state.depositModal && 
            <div className="deposit__background" onClick={this.depositBackgroundClick}>
              <DepositWithdrawForm 
                fund={this.state.fund}
                setMessage={this.setMessage}
                clearMessage={this.clearMessage}
                getAssets={this.getAssets}
                userAssets={this.state.userAssets}
                handleSearchTokenChange={this.handleSearchTokenChange}
                allTokens={this.state.allTokens}
                tokenList={this.state.tokenList}
                deposit={true}
                expiration={this.state.expiration}
                closeDepositModal={this.closeDepositModal}
                web3={this.props.web3}
                address={this.props.address} />
            </div>
          }
          {this.state.withdrawalModal &&
            <div className="withdraw__background" onClick={this.withdrawBackgroundClick}>
              <DepositWithdrawForm 
                fund={this.state.fund}
                setMessage={this.setMessage}
                clearMessage={this.clearMessage}
                getAssets={this.getAssets}
                userAssets={this.state.userAssets}
                handleSearchTokenChange={this.handleSearchTokenChange}
                allTokens={this.state.allTokens}
                tokenList={this.state.tokenList}
                deposit={false}
                closeWithdrawalModal={this.closeWithdrawalModal} />
            </div>
          }
          <Warning 
            message="This application is unaudited. Use at your own risk."
            className="fund__warning"/>
          <Details 
            fund={this.state.fund}
            web3={this.props.web3}
            networkId={this.props.networkId} />
          {this.state.renderSettings && 
            <p 
              className="fund__settings"
              onClick={this.renderSettingsModal} >
              Settings
            </p>
          }
          {this.state.settingsModal &&
            <div className="settings__background" onClick={this.closeSettingsModal}> 
              <Settings 
                fund={this.state.fund}
                setMessage={this.setMessage}
                clearMessage={this.clearMessage}
                web3={this.props.web3}
                address={this.props.address} />
            </div>
          }
          <Message 
            message={this.state.message} 
            txHash={this.state.txHash}
            networkId={this.props.networkId} />
        </div>
      );
    }

    return null;
  }
}

export default FundContainer;