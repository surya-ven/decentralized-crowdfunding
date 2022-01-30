// deploy code will go here
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledCampaignFactory = require("../ethereum/build/CampaignFactory.json");

const provider = new HDWalletProvider(
  process.env.PNEUMONIC,
  process.env.INFURA_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const factory = await new web3.eth.Contract(compiledCampaignFactory.abi)
    .deploy({ data: compiledCampaignFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "2000000" });

  console.log("Contract deployed to", factory.options.address);

  provider.engine.stop();
};

deploy();
