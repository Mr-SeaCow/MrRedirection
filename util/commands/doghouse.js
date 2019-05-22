let doghouse = require('../../data/texDoghouse.json');

module.exports.run = (client, message, args) => {
  if (doghouse.active == true) {
    message.channel.send('TEX HAS BEEN SET FREE!!!')
    doghouse.active = false;
    require('fs').writeFileSync('../Bot/data/texDoghouse.json', JSON.stringify(doghouse, null, 2));
  }
  else {
    doghouse.active = true;
    message.channel.send('TO THE DOGHOUSE TEX!!!!')
    require('fs').writeFileSync('../Bot/data/texDoghouse.json', JSON.stringify(doghouse, null, 2));
    let user = client.guilds.find(x => x.id === doghouse.guildID).members.find(x => x.id === doghouse.userID);
    try {
      user.setVoiceChannel(doghouse.channelID);
    }
    catch (e) {
      console.log(e);
    }
  }

  require('../module/report.js').report(client, message, Date.now());
};

module.exports.info = {
  category: 'Troll',
  name: 'doghouse',
  description: 'Put\' Tex in his doghouse!',
  authLevel: 2
};
