import React, {Component} from 'react';

import github from '../../assets/github.svg';
import twitter from '../../assets/twitter.svg';
import discord from '../../assets/discord.png';
import medium from '../../assets/medium.png';

import '../../layout/components/footer.sass';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p className="footer__disclaimer">
          © 2020 Trustless Fund
        </p>
        <div className="footer__icons">
          <a href="https://github.com/trustless-fund">
            <img src={github} alt="Github" className="footer__icon" />
          </a>
          <a href="https://twitter.com/trustlessfund">
            <img src={twitter} alt="Twitter" className="footer__icon" />
          </a>
          <a href="https://medium.com/trustless-fund">
            <img src={medium} alt="Medium" className="footer__icon" />
          </a>
          <a href="https://discord.gg/sC7Rzd">
            <img src={discord} alt="Discord" className="footer__icon" />
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;