const TrustlessFund = artifacts.require('TrustlessFund');

contract('TrustlessFund', accounts => {
  let fund;

  beforeEach(async () => {
    // const ts = Math.round((new Date()).getTime() / 1000);
    // console.log(ts);
    fund = await TrustlessFund.deployed(1, accounts[1], accounts[0]);
  });

  it('Should work', () => {
    assert(true);
  });

  // contract('Deposits', () => {
  //   it('Should deposit correct amount of ETH', async () => {
  //     await fund.deposit(100, '0x0000000000000000000000000000000000000000')
  //               .send({from: accounts[0]});
  //     const balances = await fund.balances();
  //     console.log('balances: ', balances);
  //   });
  // });

  // it('Should deposit correct amount of ETH', async () => {
    // await fund.deposit(100, '0x0000000000000000000000000000000000000000')
    //           .send({from: accounts[0]});
    // const balances = await fund.balances();
    // console.log('balances: ', balances);
  // });
});