export const getUsdValue = async (tokenAddress, balance) => {
  if(tokenAddress === '0x0000000000000000000000000000000000000000') {
    let usdValue;
    await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      .then((res) => {
        return res.json();
      }).then((res) => {
        usdValue = (res.ethereum.usd * balance).toFixed(2);
      });
    return usdValue;
  } else {
    let usdValue;
    await fetch(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddress}&vs_currencies=usd`)
      .then((res) => {
        return res.json();
      }).then((res) => {
        if(isEmpty(res)) {
          return 0;
        }
        const token = tokenAddress.toLowerCase();
        usdValue = (res[token].usd * balance).toFixed(2);
      });
    if(usdValue) {
      return usdValue;
    }
    return 0;
  }
}

export const isEmpty = (obj) => {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

export const resolveENSAddress = async (ENS, web3) => {
  try {
    const address = 
      await web3.eth.ens.getAddress(ENS);

    console.log(address)

    if(address === '0x0000000000000000000000000000000000000000') {
      return false;
    }

    if(web3.utils.isAddress(address)) {
      return address;
    }
  } catch {
    return false;
  }
}

export const isZeroAddress = (address) => {
  if(address === '0x0000000000000000000000000000000000000000') {
    return true;
  }
}