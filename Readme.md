# Description

Bulk raw txn maker.

Init accounts is expected never be done once after created bot accounts.
After you have `GorgeousAccoutGroups.json` file copy it in the project directory and run below cmds.

```
npm run start-gorgeous
```

After this is finished, run this cmd.

```
npm run start-gorgeous -- --dir 21
```

Repeat these cmds as much as you want.

## Types

There are two types of accounts and txns in this app.

- Normal
  Normal bot accounts and txns means that they are responsible to increase the number of txns.
  Those txn value is estimated as 0 or near 0.
- Gorgeous
  Gorgeous bot accounts and txns means that they are responsible to pretend to be a real txns. Like their value should be bigger than 100.

To use this app(create accounts or start txns) you will have to set the chain fist.

Set `NETWORK` param as TESTNET or MAINNET

# Normal bot accounts and txns

## Create bot accounts

_Note: All created accounts will be saved in `AccountGroups.json` file._

- Set starter accout and private key
  A starter accout is a simply an accout that holds ZNX for testnet or mainnet.
  You have to set its address and private key to occur bot txns in the `.env` file.
  See .env.example for keys.

- Create accounts and fund them with certain amount.

Below cmd will create new 10 accounts and fund all accounts in `AccountGroups.json` with 0.1 ZNX each.

```
npm run init -- --coa 10 --sdv 0.1
```

Below will not create any new accounts, just will fund them with 0.01 ZNX each.

```
npm run init
```

- Start txns between groups

```
npm run start
```

## Start txns between bot accounts

There are two groups in `AccounGroups.json` file - group1 and group2.
Its designed to have same number of accounts in each group and each accounts have address field and private key field.
By default, if you run `npm run start` it will make txn from `n`th account in group1 to `n`th account in group2 with default value 0.

- To set the direction from group2 to group1, you will do like this.

```
npm run start -- --dir 21
```

- To change the value of each txn.

```
npm run start -- --val 0.01
```

## Example

- Init 5 accounts with 0.1 ZNX.

```
npm run init -- --coa 5 --sdv 0.1
```

- Start txns from group2 to group 1 with value 0.01

```
npm run start -- --dir 21 --val 0.01
```

# Gorgeous bot accounts and txns

## Create bot accounts

_Note: All created accounts will be saved in `GorgeousAccountGroups.json` file._

- Set starter accout and private key
  A starter accout is a simply an accout that holds ZNX for testnet or mainnet.
  You have to set its address and private key to occur bot txns.
  You have to set the _starter_ and _starterkey_ in `app/utils/ArgParser.js`.

- Create accounts and fund them with certain amount.

Below cmd will create new 10 accounts and fund all accounts in `GorgeousAccountGroups.json` with 500 ZNX each.

```
npm run init-gorgeous -- --coa 10 --sdv 500
```

Below will not create any new accounts, just will fund them with 1000 ZNX each.

```
npm run init-gorgeous
```

- Start txns between groups

```
npm run start
```

## Start txns between bot accounts

There are two groups in `GorgeousAccountGroups.json` file - group1 and group2.
Its designed to have same number of accounts in each group and each accounts have address field and private key field.
By default, if you run `npm run start` it will make txn from `n`th account in group1 to `n`th account in group2 with default value 100.

- To set the direction from group2 to group1, you will do like this.

```
npm run start -- --dir 21
```

- To change the value of each txn.

```
npm run start -- --val 10
```

## Example

- Init 5 gorgeous accounts on testnet with 500 ZNX.

```
npm run init-gorgeous -- --coa 5 --sdv 500 --cn "Zilionixx Testnet" --cid 93 --w3p wss://testznx-ws.znxscan.com
```

- Start gorgeous txns from group2 to group 1 with value 10

```
npm run start-gorgeous -- --dir 21 --val 10
```

# Gathering all balance

We also need to gather all balance scattered to the bot accounts.

```
npm run gather
```

# Other

## Bugs

Any account that don't have enough balance will fail to make txns with _Error: Returned error: insufficient funds for gas _ price + value\*

## Chain infos

### Mainnet

    cn: "Zilionixx Mainnet",
    cid: 90,
    w3p: wss://znx-ws.znxscan.com,

### Testnet

    cn: "Zilionixx Testnet",
    cid: 93,
    w3p: wss://testznx-ws.znxscan.com,
