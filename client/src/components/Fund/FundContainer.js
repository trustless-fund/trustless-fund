import React, {Component} from 'react';
import InvalidFund from './InvalidFund';
import DepositWithdrawForm from './DepositWithdrawForm';
import Assets from './Assets';
import Expiration from './Expiration';
import Details from './Details';
import Button from '../Shared/Button';
import Message from '../Shared/Message';
import TrustlessFund from '../../contracts/TrustlessFund.json';
import {TOKEN_LIST} from '../../utils/tokenList';

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
      assetList: [],
      tokenList: null,
      allTokens: TOKEN_LIST[this.props.drizzleState.web3.networkId],
      usdAmounts: null,
      searchToken: '',
      noProvider: false
    }
  }

  componentDidMount = async () => {
    if(this.props.drizzle.web3.givenProvider) {
      await this.getFund();
      await this.getAssets();
      await this.getUsdAmounts();
      this.getTokenList();
      this.renderWithdrawal();
    } else {
      this.setState({noProvider: true});
    }

    if(window.ethereum) {
      window.ethereum.on('accountsChanged', async (accounts) => {
        await this.props.drizzle.store.dispatch({type: 'ACCOUNTS_FETCHED', accounts});
        this.renderWithdrawal();
      });
    }
  }

  getFund = async () => {
    const fundAddress = 
      await this.props.drizzle.contracts.TrustlessFundFactory.methods.getFund(this.props.fundId).call();

    await this.isInvalidFund(fundAddress);

    if(!this.state.invalidFund) {
      const fund = await new this.props.drizzle.web3.eth.Contract(
        TrustlessFund.abi,
        fundAddress
      );
    
      this.setState({fund});
    }
  }

  isInvalidFund = (address) => {
    if(address === '0x0000000000000000000000000000000000000000') {
      this.setState({invalidFund: true});
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

    if(beneficiary.toLowerCase() === this.props.drizzleState.accounts[0].toLowerCase() && expiration < ts) {
      this.setState({renderWithdrawal: true});
    } else {
      this.setState({renderWithdrawal: false});
    }
  }

  renderDepositModal = () => {
    this.setState({depositModal: true});
  }

  closeDepositModal = (e) => {
    const depositBackground = document.querySelector('.deposit__background');
    const depositButton = document.querySelector('.deposit__button');
    if(e.target === depositBackground) {
      this.setState({depositModal: false});
    }
    if(e.target === depositButton) {
      // TODO: Find better solution than setTimeout
      setTimeout(() => {
        this.setState({depositModal: false});
      }, 200);
    }
  }

  renderWithdrawalModal = () => {
    this.setState({withdrawalModal: true});
  }

  closeWithdrawalModal = (e) => {
    const withdrawBackground = document.querySelector('.withdraw__background');
    const withdrawButton = document.querySelector('.deposit__button');
    if(e.target === withdrawBackground) {
      this.setState({withdrawalModal: false});
    }
    if(e.target === withdrawButton) {
      // TODO: Find better solution than setTimeout
      setTimeout(() => {
        this.setState({withdrawalModal: false});
      }, 200);
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
    let assetList = [];

    if(tokenLUTSize > 0) {
      for(let i = 0; i < tokenLUTSize; i++) {
        const tokenAddress = await this.state.fund.methods.tokenLUT(i).call();
        const token = await this.state.fund.methods.tokens(tokenAddress).call();
        assetList.push({address: tokenAddress, balance: token.balance});
      }
    }

    this.setState({assetList});
  }

  handleSearchTokenChange = async (e, search) => {
    await this.setState({searchToken: e ? e.target.value : search});
    this.getTokenList();
  }

  getUsdAmounts = () => {
    let usdAmounts = {}
    this.state.assetList.forEach(asset => {
      if(asset.balance > 0) {
        usdAmounts[asset.address] = asset.balance;
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

    this.setState({tokenList});
  }

  render() {
    if(this.state.invalidFund) {
      return (<InvalidFund />);
    }

    if(this.state.noProvider) {
      return(
        <div className="fund-error">
          <h2 className="fund-error__header">
            Error
          </h2>
          <p className="fund-error__info">
            You must be connected to web3 to view this page.
            <a 
              href="https://metamask.io/" 
              className="fund-error__link"
              target="_blank"
              rel="noopener noreferrer">
              Download Metamask.
            </a>
          </p>
        </div>
      );
    }

    if(this.state.fund) {
      return (
        <div className="fund">
          <Expiration 
            drizzle={this.props.drizzle} 
            drizzleState={this.props.drizzleState}
            fund={this.state.fund} />
          <Assets 
            drizzle={this.props.drizzle} 
            drizzleState={this.props.drizzleState}
            assetList={this.state.assetList}
            tokenList={this.state.tokenList}
            allTokens={this.state.allTokens} />
          <div className="fund__buttons">
            <div onClick={this.renderDepositModal}>
              <Button 
                text="Deposit" 
                class="solid fund__button" 
                link={null} 
                button={true}
              />
            </div>
            {this.state.renderWithdrawal &&
              <div onClick={this.renderWithdrawalModal}>
                <Button text="Withdraw" class="outline fund__button" link={null} button={true} />
              </div>
            }
          </div>
          {this.state.depositModal && 
            <div className="deposit__background" onClick={this.closeDepositModal}>
              <DepositWithdrawForm 
                drizzle={this.props.drizzle} 
                drizzleState={this.props.drizzleState}
                fund={this.state.fund}
                setMessage={this.setMessage}
                clearMessage={this.clearMessage}
                getAssets={this.getAssets}
                assetList={this.state.assetList}
                handleSearchTokenChange={this.handleSearchTokenChange}
                allTokens={this.state.allTokens}
                tokenList={this.state.tokenList}
                deposit={true} />
            </div>
          }
          {this.state.withdrawalModal &&
            <div className="withdraw__background" onClick={this.closeWithdrawalModal}>
              <DepositWithdrawForm 
                drizzle={this.props.drizzle} 
                drizzleState={this.props.drizzleState}
                fund={this.state.fund}
                setMessage={this.setMessage}
                clearMessage={this.clearMessage}
                getAssets={this.getAssets}
                assetList={this.state.assetList}
                handleSearchTokenChange={this.handleSearchTokenChange}
                allTokens={this.state.allTokens}
                tokenList={this.state.tokenList}
                deposit={false} />
            </div>
          }
          <Details 
            drizzle={this.props.drizzle} 
            drizzleState={this.props.drizzleState}
            fund={this.state.fund} />
          <Message 
            message={this.state.message} 
            txHash={this.state.txHash}
            drizzleState={this.props.drizzleState} />
        </div>
      );
    }

    return null;
  }
}

export default FundContainer;