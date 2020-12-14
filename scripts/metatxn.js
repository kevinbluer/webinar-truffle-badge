const { RelayProvider, resolveConfigurationGSN } = require('@opengsn/gsn');
// const Web3HttpProvider = require( 'web3-providers-http')

const TruffleBadge = artifacts.require("TruffleBadge");

const main = async (cb) => {
  try {
    const accounts = await web3.eth.getAccounts();

    // claim with gas from the default account (using the default provider)

    // x = await TruffleBadge.deployed();
    // x.claimBadgeNoGas();



    // update provider and claim gaslessly

    const configuration = await resolveConfigurationGSN(web3.currentProvider, { paymasterAddress: '0x038c2778a96C910f73c52abaE6482548934A7354' });
    const provider = new RelayProvider(web3.currentProvider, configuration);
    provider.init();
    web3.setProvider(provider);
    TruffleBadge.setProvider(web3.currentProvider);

    const metaBadge = new web3.eth.Contract(TruffleBadge.abi, TruffleBadge.address);
    await metaBadge.methods.claimBadgeNoGas().send({ from: accounts[0] });

  } catch(err) {
    console.log('oops', err.message);
  }
  cb();
}

module.exports = main;