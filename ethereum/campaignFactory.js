import web3 from "./web3";
import compiledCampaignFactory from "./build/CampaignFactory.json";

export default new web3.eth.Contract(
  compiledCampaignFactory.abi,
  "ENTER CONTRACT ADDRESS HERE"
);