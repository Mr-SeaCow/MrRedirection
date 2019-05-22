const fs = require('fs');
const { active, guildID, channelID, userID } = require('../../data/texDoghouse.json');
module.exports = (client, oldMember, newMember, botSettings) => {
  if (active === false) return;
  if (newMember.id !== userID) return;
  if (newMember.voiceChannelID === false) return;
  if (newMember.voiceChannelID !== channelID) return;
  newMember.setVoiceChannel(channelID);
  fs.writeFileSync('../Bot/config/botsettings.json', JSON.stringify(botSettings, null, 4));
};
