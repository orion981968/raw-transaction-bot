require("dotenv").config({ path: __dirname + "/../../.env" });
const { constants } = require("../config/constants");
console.log(process.env.NETWORK);
var argvInit;
//command description
if (process.env.NETWORK === "TESTNET") {
  argvInit = require("yargs/yargs")(process.argv.slice(2))
    // .default({ wc: 10, tps: 1 })
    .default({
      cn: constants.TESTNET.CHAIN_NAME,
      cid: constants.TESTNET.CHAIN_ID,
      hf: constants.TESTNET.HARDFORK,
      w3p: constants.TESTNET.WEB3_PROVIDER,
      tcb: 1,
      starter: process.env.TESTNET_STARTER,
      starterkey: process.env.TESTNET_PRIVATE_KEY,
      sdv: constants.START_DISTRIBUTE_VALUE,
      gp: constants.GAS_PRICE,
      gl: constants.GAS_LIMIT,
      coa: constants.COUNT_OF_ACCOUNT,
      dir: constants.DIRECTION,
      val: constants.VALUE,
    })
    .usage(
      "Usage: $0 --coa [int] --cn [string] --cid [int] --hf [hardfork] --w3p [web3 provider url] --tcb [int] --starter [hex] --starterkey [starter private key] --sdv [num] --gp [num] --gl [num]"
    )
    .example(
      "node ./$0 --coa 10 --cn OperaLocal --cid 93 --hf peterburg --w3p ws://192.168.112.82:7001 --tcb 1 --starter 0x8734cb972d36a740cc983d5515e160c373a4a016 --starterkey bb01e8730998826499ed790d116aa5a634a0862636880f8d69cc3900fb35fe35 --sdv 1 --gp 1000000000 --gl 21000",
      "create 10 * 2 accounts randomly and start sending transactions from starter account to first 10 accounts group"
    )
    .example(
      "npm run start -- --coa 10 --cn OperaLocal --cid 93 --hf peterburg --w3p ws://192.168.112.82:7001 --tcb 1 --starter 0x8734cb972d36a740cc983d5515e160c373a4a016 --starterkey bb01e8730998826499ed790d116aa5a634a0862636880f8d69cc3900fb35fe35 --sdv 1 --gp 1000000000 --gl 21000",
      "create 10 * 2 accounts randomly and start sending transactions from starter account to first 10 accounts group"
    )
    .demandOption([
      "starter",
      "starterkey",
      "coa",
      "cn",
      "cid",
      "w3p",
      "tcb",
      "sdv",
      "gp",
      "gl",
      "hf",
      "dir",
      "val",
    ])
    .alias("coa", "count-of-account")
    .alias("cn", "chain-name")
    .alias("cid", "chain-id")
    .alias("hf", "hardfork")
    .alias("w3p", "web3-provider")
    .alias("tcb", "transaction-confirmation-blocks")
    .alias("starter", "starter-account")
    .alias("starterkey", "starter-key-account")
    .alias("sdv", "startup-distribute-value")
    .alias("gp", "gasprice")
    .alias("gl", "gaslimit")
    .alias("dir", "direction")
    .alias("val", "value-in-ether")
    .help("h")
    .alias("h", "help")
    .epilog("copyright 2021").argv;
} else if (process.env.NETWORK === "MAINNET") {
  argvInit = require("yargs/yargs")(process.argv.slice(2))
    // .default({ wc: 10, tps: 1 })
    .default({
      cn: constants.MAINNET.CHAIN_NAME,
      cid: constants.MAINNET.CHAIN_ID,
      hf: constants.MAINNET.HARDFORK,
      w3p: constants.MAINNET.WEB3_PROVIDER,
      tcb: 1,
      starter: process.env.MAINNET_STARTER,
      starterkey: process.env.MAINNET_PRIVATE_KEY,
      sdv: constants.START_DISTRIBUTE_VALUE,
      gp: constants.GAS_PRICE,
      gl: constants.GAS_LIMIT,
      coa: constants.COUNT_OF_ACCOUNT,
      dir: constants.DIRECTION,
      val: constants.VALUE,
    })
    .usage(
      "Usage: $0 --coa [int] --cn [string] --cid [int] --hf [hardfork] --w3p [web3 provider url] --tcb [int] --starter [hex] --starterkey [starter private key] --sdv [num] --gp [num] --gl [num]"
    )
    .example(
      "node ./$0 --coa 10 --cn OperaLocal --cid 93 --hf peterburg --w3p ws://192.168.112.82:7001 --tcb 1 --starter 0x8734cb972d36a740cc983d5515e160c373a4a016 --starterkey bb01e8730998826499ed790d116aa5a634a0862636880f8d69cc3900fb35fe35 --sdv 1 --gp 1000000000 --gl 21000",
      "create 10 * 2 accounts randomly and start sending transactions from starter account to first 10 accounts group"
    )
    .example(
      "npm run start -- --coa 10 --cn OperaLocal --cid 93 --hf peterburg --w3p ws://192.168.112.82:7001 --tcb 1 --starter 0x8734cb972d36a740cc983d5515e160c373a4a016 --starterkey bb01e8730998826499ed790d116aa5a634a0862636880f8d69cc3900fb35fe35 --sdv 1 --gp 1000000000 --gl 21000",
      "create 10 * 2 accounts randomly and start sending transactions from starter account to first 10 accounts group"
    )
    .demandOption([
      "starter",
      "starterkey",
      "coa",
      "cn",
      "cid",
      "w3p",
      "tcb",
      "sdv",
      "gp",
      "gl",
      "hf",
      "dir",
      "val",
    ])
    .alias("coa", "count-of-account")
    .alias("cn", "chain-name")
    .alias("cid", "chain-id")
    .alias("hf", "hardfork")
    .alias("w3p", "web3-provider")
    .alias("tcb", "transaction-confirmation-blocks")
    .alias("starter", "starter-account")
    .alias("starterkey", "starter-key-account")
    .alias("sdv", "startup-distribute-value")
    .alias("gp", "gasprice")
    .alias("gl", "gaslimit")
    .alias("dir", "direction")
    .alias("val", "value-in-ether")
    .help("h")
    .alias("h", "help")
    .epilog("copyright 2021").argv;
} else {
  console.log("Select network on env file");
}

module.exports = { argvInit };
