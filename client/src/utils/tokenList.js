const NAME = 'name'
const SYMBOL = 'symbol'
const DECIMALS = 'decimals'
const LOGO = 'logo'

// Modified version of: https://github.com/Uniswap/uniswap-frontend/blob/beta/src/contexts/Tokens.js
export const TOKEN_LIST = {
  1: { '0x0000000000000000000000000000000000000000':
    { [NAME]: 'Ethereum',
      [SYMBOL]: 'ETH',
      [DECIMALS]: 18,
      [LOGO]:
      'https://cdn.iconscout.com/icon/free/png-256/ethereum-3-569581.png' },
  '0xB6eD7644C69416d67B522e20bC294A9a9B405B31':
    { [NAME]: '0xBitcoin Token',
      [SYMBOL]: '0xBTC',
      [DECIMALS]: 8,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB6eD7644C69416d67B522e20bC294A9a9B405B31/logo.png' },
  '0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d':
    { [NAME]: 'Aave Interest bearing DAI',
      [SYMBOL]: 'aDAI',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d/logo.png' },
  '0x737F98AC8cA59f2C68aD658E3C3d8C8963E40a4c':
    { [NAME]: 'Amon',
      [SYMBOL]: 'AMN',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x737F98AC8cA59f2C68aD658E3C3d8C8963E40a4c/logo.png' },
  '0xD46bA6D942050d489DBd938a2C909A5d5039A161':
    { [NAME]: 'Ampleforth',
      [SYMBOL]: 'AMPL',
      [DECIMALS]: 9,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD46bA6D942050d489DBd938a2C909A5d5039A161/logo.png' },
  '0x960b236A07cf122663c4303350609A66A7B288C0':
    { [NAME]: 'Aragon Network Token',
      [SYMBOL]: 'ANT',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x960b236A07cf122663c4303350609A66A7B288C0/logo.png' },
  '0x0D8775F648430679A709E98d2b0Cb6250d2887EF':
    { [NAME]: 'Basic Attention Token',
      [SYMBOL]: 'BAT',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0D8775F648430679A709E98d2b0Cb6250d2887EF/logo.png' },
  '0x107c4504cd79C5d2696Ea0030a8dD4e92601B82e':
    { [NAME]: 'Bloom Token',
      [SYMBOL]: 'BLT',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x107c4504cd79C5d2696Ea0030a8dD4e92601B82e/logo.png' },
  '0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C':
    { [NAME]: 'Bancor Network Token',
      [SYMBOL]: 'BNT',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C/logo.png' },
  '0x26E75307Fc0C021472fEb8F727839531F112f317':
    { [NAME]: 'Crypto20',
      [SYMBOL]: 'C20',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x26E75307Fc0C021472fEb8F727839531F112f317/logo.png' },
  '0x4F9254C83EB525f9FCf346490bbb3ed28a81C667':
    { [NAME]: 'CelerToken',
      [SYMBOL]: 'CELR',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4F9254C83EB525f9FCf346490bbb3ed28a81C667/logo.png' },
  '0xF5DCe57282A584D2746FaF1593d3121Fcac444dC':
    { [NAME]: 'Compound Dai',
      [SYMBOL]: 'cSAI',
      [DECIMALS]: 8,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xF5DCe57282A584D2746FaF1593d3121Fcac444dC/logo.png' },
  '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643':
    { [NAME]: 'Compound Dai',
      [SYMBOL]: 'cDAI',
      [DECIMALS]: 8,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643/logo.png' },
  '0x06AF07097C9Eeb7fD685c692751D5C66dB49c215':
    { [NAME]: 'Chai',
      [SYMBOL]: 'CHAI',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x06AF07097C9Eeb7fD685c692751D5C66dB49c215/logo.png' },
  '0x41e5560054824eA6B0732E656E3Ad64E20e94E45':
    { [NAME]: 'Civic',
      [SYMBOL]: 'CVC',
      [DECIMALS]: 8,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x41e5560054824eA6B0732E656E3Ad64E20e94E45/logo.png' },
  '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359':
    { [NAME]: 'Dai Stablecoin v1.0 (SAI)',
      [SYMBOL]: 'SAI',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359/logo.png' },
  '0x6B175474E89094C44Da98b954EedeAC495271d0F':
    { [NAME]: 'Dai Stablecoin',
      [SYMBOL]: 'DAI',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png' },
  '0x0Cf0Ee63788A0849fE5297F3407f701E122cC023':
    { [NAME]: 'Streamr DATAcoin',
      [SYMBOL]: 'DATA',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0Cf0Ee63788A0849fE5297F3407f701E122cC023/logo.png' },
  '0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A':
    { [NAME]: 'DigixDAO',
      [SYMBOL]: 'DGD',
      [DECIMALS]: 9,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A/logo.png' },
  '0x4f3AfEC4E5a3F2A6a1A411DEF7D7dFe50eE057bF':
    { [NAME]: 'Digix Gold Token',
      [SYMBOL]: 'DGX',
      [DECIMALS]: 9,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4f3AfEC4E5a3F2A6a1A411DEF7D7dFe50eE057bF/logo.png' },
  '0xc719d010B63E5bbF2C0551872CD5316ED26AcD83':
    { [NAME]: 'Decentralized Insurance Protocol',
      [SYMBOL]: 'DIP',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc719d010B63E5bbF2C0551872CD5316ED26AcD83/logo.png' },
  '0xC0F9bD5Fa5698B6505F643900FFA515Ea5dF54A9':
    { [NAME]: 'Donut',
      [SYMBOL]: 'DONUT',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC0F9bD5Fa5698B6505F643900FFA515Ea5dF54A9/logo.png' },
  '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c':
    { [NAME]: 'Enjin Coin',
      [SYMBOL]: 'ENJ',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c/logo.png' },
  '0x06f65b8CfCb13a9FE37d836fE9708dA38Ecb29B2':
    { [NAME]: 'SAINT FAME: Genesis Shirt',
      [SYMBOL]: 'FAME',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x06f65b8CfCb13a9FE37d836fE9708dA38Ecb29B2/logo.png' },
  '0x4946Fcea7C692606e8908002e55A582af44AC121':
    { [NAME]: 'FOAM Token',
      [SYMBOL]: 'FOAM',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4946Fcea7C692606e8908002e55A582af44AC121/logo.png' },
  '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b':
    { [NAME]: 'FunFair',
      [SYMBOL]: 'FUN',
      [DECIMALS]: 8,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b/logo.png' },
  '0x543Ff227F64Aa17eA132Bf9886cAb5DB55DCAddf':
    { [NAME]: 'DAOstack',
      [SYMBOL]: 'GEN',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x543Ff227F64Aa17eA132Bf9886cAb5DB55DCAddf/logo.png' },
  '0x6810e776880C02933D47DB1b9fc05908e5386b96':
    { [NAME]: 'Gnosis Token',
      [SYMBOL]: 'GNO',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6810e776880C02933D47DB1b9fc05908e5386b96/logo.png' },
  '0x12B19D3e2ccc14Da04FAe33e63652ce469b3F2FD':
    { [NAME]: 'GRID Token',
      [SYMBOL]: 'GRID',
      [DECIMALS]: 12,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x12B19D3e2ccc14Da04FAe33e63652ce469b3F2FD/logo.png' },
  '0x0000000000b3F879cb30FE243b4Dfee438691c04':
    { [NAME]: 'Gastoken.io',
      [SYMBOL]: 'GST2',
      [DECIMALS]: 2,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000b3F879cb30FE243b4Dfee438691c04/logo.png' },
  '0x493C57C4763932315A328269E1ADaD09653B9081':
    { [NAME]: 'Fulcrum DAI iToken ',
      [SYMBOL]: 'iDAI',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x493C57C4763932315A328269E1ADaD09653B9081/logo.png' },
  '0x14094949152EDDBFcd073717200DA82fEd8dC960':
    { [NAME]: 'Fulcrum SAI iToken ',
      [SYMBOL]: 'iSAI',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x14094949152EDDBFcd073717200DA82fEd8dC960/logo.png' },
  '0x3212b29E33587A00FB1C83346f5dBFA69A458923':
    { [NAME]: 'The Tokenized Bitcoin',
      [SYMBOL]: 'imBTC',
      [DECIMALS]: 8,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x3212b29E33587A00FB1C83346f5dBFA69A458923/logo.png' },
  '0x6fB3e0A217407EFFf7Ca062D46c26E5d60a14d69':
    { [NAME]: 'IoTeX Network',
      [SYMBOL]: 'IOTX',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6fB3e0A217407EFFf7Ca062D46c26E5d60a14d69/logo.png' },
  '0x818Fc6C2Ec5986bc6E2CBf00939d90556aB12ce5':
    { [NAME]: 'Kin',
      [SYMBOL]: 'KIN',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x818Fc6C2Ec5986bc6E2CBf00939d90556aB12ce5/logo.png' },
  '0xdd974D5C2e2928deA5F71b9825b8b646686BD200':
    { [NAME]: 'Kyber Network Crystal',
      [SYMBOL]: 'KNC',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdd974D5C2e2928deA5F71b9825b8b646686BD200/logo.png' },
  '0x514910771AF9Ca656af840dff83E8264EcF986CA':
    { [NAME]: 'ChainLink Token',
      [SYMBOL]: 'LINK',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png' },
  '0x6c6EE5e31d828De241282B9606C8e98Ea48526E2':
    { [NAME]: 'HoloToken',
      [SYMBOL]: 'HOT',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6c6EE5e31d828De241282B9606C8e98Ea48526E2/logo.png' },
  '0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD':
    { [NAME]: 'LoopringCoin V2',
      [SYMBOL]: 'LRC',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD/logo.png' },
  '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03':
    { [NAME]: 'EthLend Token',
      [SYMBOL]: 'LEND',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x80fB784B7eD66730e8b1DBd9820aFD29931aab03/logo.png' },
  '0xA4e8C3Ec456107eA67d3075bF9e3DF3A75823DB0':
    { [NAME]: 'LoomToken',
      [SYMBOL]: 'LOOM',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA4e8C3Ec456107eA67d3075bF9e3DF3A75823DB0/logo.png' },
  '0x58b6A8A3302369DAEc383334672404Ee733aB239':
    { [NAME]: 'Livepeer Token',
      [SYMBOL]: 'LPT',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x58b6A8A3302369DAEc383334672404Ee733aB239/logo.png' },
  '0xD29F0b5b3F50b07Fe9a9511F7d86F4f4bAc3f8c4':
    { [NAME]: 'Liquidity.Network Token',
      [SYMBOL]: 'LQD',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD29F0b5b3F50b07Fe9a9511F7d86F4f4bAc3f8c4/logo.png' },
  '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942':
    { [NAME]: 'Decentraland MANA',
      [SYMBOL]: 'MANA',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0F5D2fB29fb7d3CFeE444a200298f468908cC942/logo.png' },
  '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0':
    { [NAME]: 'Matic Token',
      [SYMBOL]: 'MATIC',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png' },
  '0x8888889213DD4dA823EbDD1e235b09590633C150':
    { [NAME]: 'Marblecoin',
      [SYMBOL]: 'MBC',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x8888889213DD4dA823EbDD1e235b09590633C150/logo.png' },
  '0x80f222a749a2e18Eb7f676D371F19ad7EFEEe3b7':
    { [NAME]: 'Magnolia Token',
      [SYMBOL]: 'MGN',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x80f222a749a2e18Eb7f676D371F19ad7EFEEe3b7/logo.png' },
  '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2':
    { [NAME]: 'Maker',
      [SYMBOL]: 'MKR',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png' },
  '0xec67005c4E498Ec7f55E092bd1d35cbC47C91892':
    { [NAME]: 'Melon Token',
      [SYMBOL]: 'MLN',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xec67005c4E498Ec7f55E092bd1d35cbC47C91892/logo.png' },
  '0x957c30aB0426e0C93CD8241E2c60392d08c6aC8e':
    { [NAME]: 'Modum Token',
      [SYMBOL]: 'MOD',
      [DECIMALS]: 0,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x957c30aB0426e0C93CD8241E2c60392d08c6aC8e/logo.png' },
  '0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206':
    { [NAME]: 'Nexo',
      [SYMBOL]: 'NEXO',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206/logo.png' },
  '0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671':
    { [NAME]: 'Numeraire',
      [SYMBOL]: 'NMR',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671/logo.png' },
  '0x4575f41308EC1483f3d399aa9a2826d74Da13Deb':
    { [NAME]: 'Orchid',
      [SYMBOL]: 'OXT',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4575f41308EC1483f3d399aa9a2826d74Da13Deb/logo.png' },
  '0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44':
    { [NAME]: 'Panvala pan',
      [SYMBOL]: 'PAN',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44/logo.png' },
  '0x8E870D67F660D95d5be530380D0eC0bd388289E1':
    { [NAME]: 'PAX',
      [SYMBOL]: 'PAX',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x8E870D67F660D95d5be530380D0eC0bd388289E1/logo.png' },
  '0x45804880De22913dAFE09f4980848ECE6EcbAf78':
    { [NAME]: 'Paxos Gold',
      [SYMBOL]: 'PAXG',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x45804880De22913dAFE09f4980848ECE6EcbAf78/logo.png' },
  '0x93ED3FBe21207Ec2E8f2d3c3de6e058Cb73Bc04d':
    { [NAME]: 'Pinakion',
      [SYMBOL]: 'PNK',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x93ED3FBe21207Ec2E8f2d3c3de6e058Cb73Bc04d/logo.png' },
  '0x6758B7d441a9739b98552B373703d8d3d14f9e62':
    { [NAME]: 'POA ERC20 on Foundation',
      [SYMBOL]: 'POA20',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6758B7d441a9739b98552B373703d8d3d14f9e62/logo.png' },
  '0x687BfC3E73f6af55F0CccA8450114D107E781a0e':
    { [NAME]: 'QChi',
      [SYMBOL]: 'QCH',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x687BfC3E73f6af55F0CccA8450114D107E781a0e/logo.png' },
  '0x99ea4dB9EE77ACD40B119BD1dC4E33e1C070b80d':
    { [NAME]: 'Quantstamp Token',
      [SYMBOL]: 'QSP',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x99ea4dB9EE77ACD40B119BD1dC4E33e1C070b80d/logo.png' },
  '0xF970b8E36e23F7fC3FD752EeA86f8Be8D83375A6':
    { [NAME]: 'Ripio Credit Network Token',
      [SYMBOL]: 'RCN',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xF970b8E36e23F7fC3FD752EeA86f8Be8D83375A6/logo.png' },
  '0x255Aa6DF07540Cb5d3d297f0D0D4D84cb52bc8e6':
    { [NAME]: 'Raiden Token',
      [SYMBOL]: 'RDN',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x255Aa6DF07540Cb5d3d297f0D0D4D84cb52bc8e6/logo.png' },
  '0x408e41876cCCDC0F92210600ef50372656052a38':
    { [NAME]: 'Republic Token',
      [SYMBOL]: 'REN',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x408e41876cCCDC0F92210600ef50372656052a38/logo.png' },
  '0x1985365e9f78359a9B6AD760e32412f4a445E862':
    { [NAME]: 'Reputation',
      [SYMBOL]: 'REP',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1985365e9f78359a9B6AD760e32412f4a445E862/logo.png' },
  '0x9469D013805bFfB7D3DEBe5E7839237e535ec483':
    { [NAME]: 'Darwinia Network Native Token',
      [SYMBOL]: 'RING',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9469D013805bFfB7D3DEBe5E7839237e535ec483/logo.png' },
  '0x607F4C5BB672230e8672085532f7e901544a7375':
    { [NAME]: 'iEx.ec Network Token',
      [SYMBOL]: 'RLC',
      [DECIMALS]: 9,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x607F4C5BB672230e8672085532f7e901544a7375/logo.png' },
  '0xB4EFd85c19999D84251304bDA99E90B92300Bd93':
    { [NAME]: 'Rocket Pool',
      [SYMBOL]: 'RPL',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB4EFd85c19999D84251304bDA99E90B92300Bd93/logo.png' },
  '0x4156D3342D5c385a87D264F90653733592000581':
    { [NAME]: 'Salt',
      [SYMBOL]: 'SALT',
      [DECIMALS]: 8,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4156D3342D5c385a87D264F90653733592000581/logo.png' },
  '0x7C5A0CE9267ED19B22F8cae653F198e3E8daf098':
    { [NAME]: 'SANtiment network token',
      [SYMBOL]: 'SAN',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7C5A0CE9267ED19B22F8cae653F198e3E8daf098/logo.png' },
  '0x5e74C9036fb86BD7eCdcb084a0673EFc32eA31cb':
    { [NAME]: 'Synth sETH',
      [SYMBOL]: 'sETH',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x5e74C9036fb86BD7eCdcb084a0673EFc32eA31cb/logo.png' },
  '0x3A9FfF453d50D4Ac52A6890647b823379ba36B9E':
    { [NAME]: 'Shuffle.Monster V3',
      [SYMBOL]: 'SHUF',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x3A9FfF453d50D4Ac52A6890647b823379ba36B9E/logo.png' },
  '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E':
    { [NAME]: 'Status Network Token',
      [SYMBOL]: 'SNT',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x744d70FDBE2Ba4CF95131626614a1763DF805B9E/logo.png' },
  '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F':
    { [NAME]: 'Synthetix Network Token',
      [SYMBOL]: 'SNX',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png' },
  '0x23B608675a2B2fB1890d3ABBd85c5775c51691d5':
    { [NAME]: 'Unisocks Edition 0',
      [SYMBOL]: 'SOCKS',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x23B608675a2B2fB1890d3ABBd85c5775c51691d5/logo.png' },
  '0x42d6622deCe394b54999Fbd73D108123806f6a18':
    { [NAME]: 'SPANK',
      [SYMBOL]: 'SPANK',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x42d6622deCe394b54999Fbd73D108123806f6a18/logo.png' },
  '0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC':
    { [NAME]: 'StorjToken',
      [SYMBOL]: 'STORJ',
      [DECIMALS]: 8,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC/logo.png' },
  '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51':
    { [NAME]: 'Synth sUSD',
      [SYMBOL]: 'sUSD',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x57Ab1ec28D129707052df4dF418D58a2D46d5f51/logo.png' },
  '0x00006100F7090010005F1bd7aE6122c3C2CF0090':
    { [NAME]: 'TrueAUD',
      [SYMBOL]: 'TAUD',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x00006100F7090010005F1bd7aE6122c3C2CF0090/logo.png' },
  '0x00000100F2A2bd000715001920eB70D229700085':
    { [NAME]: 'TrueCAD',
      [SYMBOL]: 'TCAD',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x00000100F2A2bd000715001920eB70D229700085/logo.png' },
  '0x00000000441378008EA67F4284A57932B1c000a5':
    { [NAME]: 'TrueGBP',
      [SYMBOL]: 'TGBP',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x00000000441378008EA67F4284A57932B1c000a5/logo.png' },
  '0x0000852600CEB001E08e00bC008be620d60031F2':
    { [NAME]: 'TrueHKD',
      [SYMBOL]: 'THKD',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000852600CEB001E08e00bC008be620d60031F2/logo.png' },
  '0xaAAf91D9b90dF800Df4F55c205fd6989c977E73a':
    { [NAME]: 'Monolith TKN',
      [SYMBOL]: 'TKN',
      [DECIMALS]: 8,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xaAAf91D9b90dF800Df4F55c205fd6989c977E73a/logo.png' },
  '0xCb94be6f13A1182E4A4B6140cb7bf2025d28e41B':
    { [NAME]: 'Trustcoin',
      [SYMBOL]: 'TRST',
      [DECIMALS]: 6,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xCb94be6f13A1182E4A4B6140cb7bf2025d28e41B/logo.png' },
  '0x2C537E5624e4af88A7ae4060C022609376C8D0EB':
    { [NAME]: 'BiLira',
      [SYMBOL]: 'TRYB',
      [DECIMALS]: 6,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2C537E5624e4af88A7ae4060C022609376C8D0EB/logo.png' },
  '0x0000000000085d4780B73119b644AE5ecd22b376':
    { [NAME]: 'TrueUSD',
      [SYMBOL]: 'TUSD',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000085d4780B73119b644AE5ecd22b376/logo.png' },
  '0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14':
    { [NAME]: 'Uniswap V1',
      [SYMBOL]: 'UNI-V1:SAI',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14/logo.png' },
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48':
    { [NAME]: 'USD//C',
      [SYMBOL]: 'USDC',
      [DECIMALS]: 6,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png' },
  '0xA4Bdb11dc0a2bEC88d24A3aa1E6Bb17201112eBe':
    { [NAME]: 'StableUSD',
      [SYMBOL]: 'USDS',
      [DECIMALS]: 6,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA4Bdb11dc0a2bEC88d24A3aa1E6Bb17201112eBe/logo.png' },
  '0x8f3470A7388c05eE4e7AF3d01D8C722b0FF52374':
    { [NAME]: 'Veritaseum',
      [SYMBOL]: 'VERI',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x8f3470A7388c05eE4e7AF3d01D8C722b0FF52374/logo.png' },
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599':
    { [NAME]: 'Wrapped BTC',
      [SYMBOL]: 'WBTC',
      [DECIMALS]: 8,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png' },
  '0x09fE5f0236F0Ea5D930197DCE254d77B04128075':
    { [NAME]: 'Wrapped CryptoKitties',
      [SYMBOL]: 'WCK',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x09fE5f0236F0Ea5D930197DCE254d77B04128075/logo.png' },
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2':
    { [NAME]: 'Wrapped Ether',
      [SYMBOL]: 'WETH',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png' },
  '0xB4272071eCAdd69d933AdcD19cA99fe80664fc08':
    { [NAME]: 'CryptoFranc',
      [SYMBOL]: 'XCHF',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB4272071eCAdd69d933AdcD19cA99fe80664fc08/logo.png' },
  '0x0f7F961648aE6Db43C75663aC7E5414Eb79b5704':
    { [NAME]: 'XIO Network',
      [SYMBOL]: 'XIO',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0f7F961648aE6Db43C75663aC7E5414Eb79b5704/logo.png' },
  '0xE41d2489571d322189246DaFA5ebDe1F4699F498':
    { [NAME]: '0x Protocol Token',
      [SYMBOL]: 'ZRX',
      [DECIMALS]: 18,
      [LOGO]:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xE41d2489571d322189246DaFA5ebDe1F4699F498/logo.png' },
  '0x39aa39c021dfbae8fac545936693ac917d5e7563':
    { [NAME]: 'Compound USDC',
      [SYMBOL]: 'cUSDC',
      [DECIMALS]: 8,
      [LOGO]:
      'https://assets.coingecko.com/coins/images/9442/large/Compound_USDC.png?1567581577' }
  },
  3: { 
  '0x0000000000000000000000000000000000000000':
    { [NAME]: 'Ethereum',
      [SYMBOL]: 'ETH',
      [DECIMALS]: 18,
      [LOGO]:
      'https://cdn.iconscout.com/icon/free/png-256/ethereum-3-569581.png' },
  '0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA':
    { [NAME]: 'Weenus ���',
      [SYMBOL]: 'WEENUS',
      [DECIMALS]: '18',
      [LOGO]:
      'https://assets-global.website-files.com/5cb0ac9c57054973ac1bf1e4/5cd059557473d12c2ea50768_2165.png' },
  '0x7E0480Ca9fD50EB7A3855Cf53c347A1b4d6A2FF5':
    { [NAME]: 'Xeenus ���',
      [SYMBOL]: 'XEENUS',
      [DECIMALS]: '18',
      [LOGO]:
      'https://assets-global.website-files.com/5cb0ac9c57054973ac1bf1e4/5cd059557473d12c2ea50768_2165.png' },
  '0xF6fF95D53E08c9660dC7820fD5A775484f77183A':
    { [NAME]: 'Yeenus ���',
      [SYMBOL]: 'YEENUS',
      [DECIMALS]: '8',
      [LOGO]:
      'https://assets-global.website-files.com/5cb0ac9c57054973ac1bf1e4/5cd059557473d12c2ea50768_2165.png' },
  '0xC84f8B669Ccb91C86AB2b38060362b9956f2De52':
    { [NAME]: 'Zeenus ���',
      [SYMBOL]: 'ZEENUS',
      [DECIMALS]: '0',
      [LOGO]:
      'https://assets-global.website-files.com/5cb0ac9c57054973ac1bf1e4/5cd059557473d12c2ea50768_2165.png' } }
}