const BUSDABI = require('./abi/BUSD_abi.json');
const BUSDAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

const PRESALEABI = require('./abi/PRESALE_abi.json');
const PRESALEAddress = "0x4248bb40669fbb7d17cf642c1dfd339cc8389591";

const LINGOABI = require('./abi/LINGO_abi.json')
const LINGOAddress = "0x8027c3213070545F5a98f150776d3e17835f4540"


const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3('https://bsc-dataseed.binance.org/');

export const BUSD = new web3.eth.Contract(BUSDABI, BUSDAddress);
export const PRESALE = new web3.eth.Contract(PRESALEABI, PRESALEAddress);
export const LINGO = new web3.eth.Contract(LINGOABI, LINGOAddress);