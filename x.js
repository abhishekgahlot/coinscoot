const ethers = require('ethers');
const Wallet = ethers.Wallet;
const utils = ethers.utils;
const providers = ethers.providers;
var provider = providers.getDefaultProvider();


var privateKey = "0x0123456789012345678901234567890123456789012345678901234567890123";
var wallet = new Wallet(privateKey);

console.log("Address: " + wallet.address);

// // const lehsun = Wallet.createRandom();

// // console.log(JSON.stringify(lehsun));

// /**
//  * {"privateKey":"0x399cc01543bb47fcfa66fa4b82a98a695eac0cff8b127d347658195f19026b2e","defaultGasLimit":1500000,"address":"0xAFF9a60393F3Cda7C84C3cB2EeCFf27e0589BaB7","mnemonic":"tobacco possible museum forward abstract borrow modify charge fall word summer vintage","path":"m/44'/60'/0'/0/0"}
//  */


// var privateKey = "0x399cc01543bb47fcfa66fa4b82a98a695eac0cff8b127d347658195f19026b2e";
// var wallet = new Wallet(privateKey);

// console.log('Address: ' + wallet.address);
// // "Address: 0x14791697260E4c9A71f18484C9f997B308e59325".

// var transaction = {
//     nonce: 0,
//     gasLimit: 21000,
//     gasPrice: utils.bigNumberify("40000000000"),

//     to: "0x0Ae2F13f8E0C1Aa44D978bFEb26c2ca789FAA356",

//     value: utils.parseEther("0.009"),
//     data: "0x",

//     // This ensures the transaction cannot be replayed on different networks
//     chainId: providers.Provider.chainId.homestead
// };

// var signedTransaction = wallet.sign(transaction);

// console.log(signedTransaction);
// // "0xf86c808504a817c8008252089488a5c2d9919e46f883eb62f7b8dd9d0cc45bc2" +
// //   "90880de0b6b3a7640000801ca0d7b10eee694f7fd9acaa0baf51e91da5c3d324" +
// //   "f67ad827fbe4410a32967cbc32a06ffb0b4ac0855f146ff82bef010f6f2729b4" +
// //   "24c57b3be967e2074220fca13e79"

// // This can now be sent to the Ethereum network
// provider.sendTransaction(signedTransaction).then(function(hash) {
//     console.log('Hash: ' + hash);
//     // Hash:
// });