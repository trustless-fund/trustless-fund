import React, {Component} from 'react';
import Button from '../Shared/Button';

import '../../layout/components/hero.sass';

class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFunds: [],
      render: false
    }

    this.getUserFunds();
  }

  getUserFunds = async () => {
    const userFunds = await this.props.drizzle.contracts.TrustlessFundFactory.methods.getUserFunds(
      this.props.drizzleState.accounts[0]
    ).call();

    this.setState({userFunds});

    if(userFunds.length === 0) {
      this.setState({render: true});
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
              text="Learn More" 
              class="outline" 
              link="https://docs.trustless.fund/" 
              button={false}
              target={true} />
            <Button 
              text="Create Fund" 
              class="solid" 
              link="/factory" 
              button={false} />
          </div>
        </section>
      );
    }
    return null;
  }
}

export default Hero;