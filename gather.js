const Web3 = require("web3");
const fs = require("fs");
var async = require("async");
require("dotenv").config();
const { SendRawTransaction } = require("./app/SendRawTransaction");
const { constants } = require("./app/config/constants");
const ArgParams = require("./app/config/ArgParams");

var filepath = __dirname + "/AccountGroups.json";
var provider = ArgParams.WEB3_PROVIDER;
const web3 = new Web3(provider);

var nonce = [];
var targetAddress;
var transferBalance;
var addressFrom;
const gasFee = web3.utils.fromWei(
  (constants.GAS_LIMIT * constants.GAS_PRICE).toString()
);

console.log("gas fee: ", constants.GAS_LIMIT * constants.GAS_PRICE);
console.log("gas fee ether: ", gasFee);
if (process.env.NETWORK === "TESTNET") {
  targetAddress = process.env.TESTNET_STARTER;
} else {
  targetAddress = process.env.MAINNET_STARTER;
}

console.log("targetAddress", targetAddress);
if (targetAddress) {
  async.waterfall(
    [
      // ReadAccountGroups,
      // SendBulkTransactions,
      ReadGorgeousAccountGroups,
      SendBulkTransactions,
    ],
    function (err, result) {
      console.log(err);
    }
  );
} else {
  console.log("Can't find target address. Set it in env file first");
}

function ReadAccountGroups(callback) {
  var accountGroups = {};

  try {
    var jsonString = fs.readFileSync(filepath, "utf8");
    var accountGroups = JSON.parse(jsonString);
  } catch (err) {
    console.log(err);

    callback(err);
  }
  callback(null, accountGroups);
}

function ReadGorgeousAccountGroups(callback) {
  var accountGroups = {};

  var filepath = __dirname + "/GorgeousAccountGroups.json";
  try {
    var jsonString = fs.readFileSync(filepath, "utf8");
    var accountGroups = JSON.parse(jsonString);
  } catch (err) {
    console.log(err);

    callback(err);
  }
  callback(null, accountGroups);
}
function SendBulkTransactions(accountGroups, callback) {
  SendInGroup(accountGroups.group1);
  SendInGroup(accountGroups.group2);

  callback(null);
}

function SendInGroup(group) {
  for (let i = 0; i < group.length; i++) {
    web3.eth.getBalance(group[i].address, function (err, result) {
      addressFrom = group[i].address;
      console.log("addressFromInside", addressFrom);
      if (err) {
      } else {
        transferBalance = result;
        transferBalance = web3.utils.fromWei(result);
        if (transferBalance > gasFee) {
          transferBalance -= gasFee;

          web3.eth.getTransactionCount(addressFrom).then((txnCount) => {
            nonce = txnCount;
            privateKey = group[i].privateKey.slice(2);
            console.log(addressFrom, nonce, transferBalance, privateKey);
            SendRawTransaction(
              web3,
              targetAddress,
              nonce,
              transferBalance,
              privateKey
            );
            nonce++;
          });
        } else {
          console.log("Not enough balance for transfer");
        }
      }
    });
  }
}
