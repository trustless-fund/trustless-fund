import React, {Component} from 'react';
import Button from '../Shared/Button';

import TrustlessFundFactoryV1 from '../../contracts/TrustlessFundFactory.json';
import TrustlessFundFactoryV2 from '../../contracts/TrustlessFundFactoryV2.json';

import '../../layout/components/hero.sass';

class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFunds: [],
      render: false,
      FactoryV1: null,
      FactoryV2: null
    }

    if(window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        this.isUserFunds();
      });
    }
  }

  componentDidMount = async () => {
    const FactoryV1 = await new this.props.web3.eth.Contract(TrustlessFundFactoryV1);
    const FactoryV2 = await new this.props.web3.eth.Contract(TrustlessFundFactoryV2);

    await this.setState({FactoryV1});
    await this.setState({FactoryV2});

    if(this.props.web3.givenProvider) {
      this.isUserFunds();
    } else {
      this.state = {render: true}
    }
  }

  isUserFunds = async () => {
    const v1UserFunds = await this.state.FactoryV1.methods.getUserFunds(
      this.props.address
    ).call();
    const v2UserFunds = await this.state.FactoryV2.methods.getUserFunds(
      this.props.address
    ).call();

    const userFunds = v1UserFunds.concat(v2UserFunds);

    this.setState({userFunds});

    if(userFunds.length === 0) {
      this.setState({render: true});
    } else {
      this.setState({render: false});
    }
  }

  render() {
    if(this.state.render) {
      return (
        <section className="hero">
          <h1 className="hero__header">
            Deploy a Trustless Fund
          </h1>
          <h4 className="hero__subheader">
            Lock in the Time-Value of Your Money
          </h4>
          <div className="hero__buttons">
            <Button 
              text="Create Fund" 
              class="solid hero__button" 
              link="/factory" 
              button={false} />
            <a 
              href="https://docs.trustless.fund/" 
              className="hero__learn-more"
              target="_blank"
              rel="noopener noreferrer">
              Learn More
            </a>
          </div>
        </section>
      );
    }
    return null;
  }
}

export default Hero;