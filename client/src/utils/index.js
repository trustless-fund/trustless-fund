import getWeb3 from "../getWeb3";

export async function web3Connect() { 
  const web3 = await getWeb3();
  return web3;
}