const Discord = require('discord.js');
const cmdStrLoc = '../../data/commandStorage.json';
const RLS = require('../module/RocketLeagueRank.js');
const twitchApi = require('twitch-api-v5');
//const RLSClient = new RLS.Client();
const twitchDatabase = {
  users: {
    'mr_seacow': {
      id: '196126547',
      name: 'mr_seacow'
    },
    'chibbzee': {
      id: '74453260',
      name: 'chibbzee'
    },
    'iimrexclusive': {
      id: '168659359',
      name: 'iimrexclusive'
    }
  }
};

let request = require("request");

let options = (id) => {
  return {
    method: 'GET',
    url: `https://api.twitch.tv/kraken/channels/${id}`,
    headers: {
      'Postman-Token': 'bce38567-2390-4b75-ae90-c71e5cdf5131',
      'cache-control': 'no-cache',
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'd9iksk9iywwt33pf04hl3s7sjvgdit'
    }
  };
}

module.exports = (client, botSettings) => {
  twitchApi.clientID = botSettings.twitch.clientID;
  twitchApi.clientSecret = botSettings.twitch.clientSecret
  //let MrSeaCow = client.users.find(x => x.id === '176532282935345153')
  switch (client.user.id) {
    case "505867658386997268":
      {

        client
        .generateInvite(["ADMINISTRATOR"])
        .then(link => {
          console.log(`${client.user.username}: ${link}`);
        });

        client.servers = botSettings.servers;
        client.commandStorage = require(cmdStrLoc);
        client.commands = new Discord.Collection();
        client.user.setActivity('commands - !help', { type: "LISTENING" });
        client.rankJson = require('../../data/ranks.json');
        client.rankOldJson = require('../../data/ranksOld.json');
        client.rlStorage = require('../../data/rlStorage.json');
        client.seasonRL = botSettings.rlSeason;

        require('../commandHandler.js')(client);
        /*
        request(options('74453260'), function(error, response, body) {
          if (error) throw new Error(error);
          console.log(body);
        });
        */
        /*
        twitchApi.channels.channel({ channelID: '196126547' }, (err, res) => {
          console.log('ta')
          if (err) {
            console.log(err)
          }
          else {
            console.log(res)
          }
        });
        */
      }
  }

  /*
  client.setInterval(() => {
    RLSClient.getPlayer({ plat: 'Steam', id: 'MrSeaCow' }, { type: 'MIN', season: '9', currentSeason: '9' }, (result) => {
      let MMR = Number(result.Ranks[1].MMR.replace('(', '').replace(')', ''));
      if (!client.MMR) {
        client.MMR = '0';
      }
      else {
        if (MMR != 0) {
          if (client.MMR > MMR) {
            MrSeaCow.send(`You lost **${Number(client.MMR) - MMR}** MMR, you are now at **${MMR}**.`);
            client.MMR = `${MMR}`;
          }
          else if (client.MMR < MMR) {
            MrSeaCow.send(`You gained **${MMR - Number(client.MMR)}** MMR, you are now at **${MMR}**.`);
            client.MMR = `${MMR}`;
          }
        }
      }
    }, (error) => { console.log(error) });
  }, 5000);
  */

};
