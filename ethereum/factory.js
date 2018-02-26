import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x7b4161B24098195095fAb3Fdf12Cf7607613457a'
);

export default instance;