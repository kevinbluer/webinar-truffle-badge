const { RelayProvider, resolveConfigurationGSN } = require('@opengsn/gsn');
// const Web3HttpProvider = require( 'web3-providers-http')

const TruffleBadge = artifacts.require("TruffleBadge");

const main = async (cb) => {
  try {
    const accounts = await web3.eth.getAccounts();

    // claim gasfully

    // x = await TruffleBadge.deployed();
    // x.claimBadgeNoGas();



    // claim gaslessly via updated provider

    const configuration = await resolveConfigurationGSN(web3.currentProvider, { paymasterAddress: '0xbA12556B4bc8423A7D680572B2D47b86b02De049' });
    const provider = new RelayProvider(web3.currentProvider, configuration);
    provider.init();
    web3.setProvider(provider);
    TruffleBadge.setProvider(web3.currentProvider);

    const metaBadge = new web3.eth.Contract(TruffleBadge.abi, TruffleBadge.address);
    await metaBadge.methods.claimBadgeNoGas().send({ from: accounts[0] });

    // const metaBadge = new web3.eth.Contract(TruffleBadge.abi, TruffleBadge.address);
    // const encoded = metaBadge.methods.claimBadgeNoGas().encodeABI();
    // let newAccount = web3.eth.accounts.create();

    // var tx = {
    //     to : TruffleBadge.address,
    //     data : encoded,
    //     gas: 4712388,
    //     gasPrice: 100000000000
    // }

    // const signedTx = await web3.eth.accounts.signTransaction(tx, newAccount.privateKey);
    // console.log(await web3.eth.sendSignedTransaction(signedTx.rawTransaction));

  } catch(err) {
    console.log('oops', err.message);
  }
  cb();
}

module.exports = main;