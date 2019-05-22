const tS = "https://rocketleague.tracker.network/profile/";
const tSe = "?ref=discord";
let emojisNew = [];
let emojisOld = [];
let ranksNew = [];
let ranksOld = [];
let emojis = [];
let ranks = [];
let STEAM_API_KEY = process.env.STEAM_API_KEY;

function Numerals(Str) {
  if (Str != undefined) {
    let SplStr = Str.split(" ");
    if (SplStr[1]) {
      switch (SplStr[1]) {
        case 'I':
          SplStr[1] = '1';
          break;
        case 'II':
          SplStr[1] = '2';
          break;
        case 'III':
          SplStr[1] = '3';
          break;
        case 'IV':
          SplStr[1] = '4';
          break;
        case 'V':
          SplStr[1] = '5';
          break;
        default:
          break;
      }
    }
    return SplStr.join(' ');
  }
  else {
    return undefined;
  }
}

function RewardsLogic(Rewards) {
  switch (Rewards) {
    case 'Unranked':
      return ranks.indexOf(Rewards);
    case 'Bronze':
      return ranks.indexOf(Rewards + ' 1');
    case 'Silver':
      return ranks.indexOf(Rewards + ' 1');
    case 'Gold':
      return ranks.indexOf(Rewards + ' 1');
    case 'Platinum':
      return ranks.indexOf(Rewards + ' 1');
    case 'Diamond':
      return ranks.indexOf(Rewards + ' 1');
    case 'Champion':
      return ranks.indexOf(Rewards + ' 1');
    case 'Grand Champion':
      return ranks.indexOf(Rewards);
    default:

  }

}

function SrchArr(Arr, KeyWord) {
  let Location;
  for (let i = 0; i < Object.keys(Arr).length; i++) {
    if (Arr[i].Title == KeyWord) {
      Location = i;
    }
  }
  return Location;
}

function emojiLogic(MrRedirection, Rank) {
  return (Rank != undefined ? ranks.indexOf(Rank) : ranks.indexOf('Unranked'));
}

function rank(oldMessage, MrRedirection, SearchType, Platform, Stats, message, season, RankObject, SteamID, User, Rewards, RewardWins, Icon) {
  let a = 0; // a way of tracking the following loop
  let b = a;
  if (Number(season) > 3) {
    for (let i in MrRedirection.rankJson) { //searches through the file ranks.json
      b = i;
      if (b == i) {
        ranksNew.push(MrRedirection.rankJson[a].name); //adds the name of ranks[a] to the array 'ranks'
        emojisNew.push(MrRedirection.emojis.get(MrRedirection.rankJson[a].id)); //adds the id of ranks[a] to the array 'emoji'
        a++;
      }
    }
    emojis = emojisNew;
    ranks = ranksNew;
  }
  else {
    for (let i in MrRedirection.rankOldJson) { //searches through the file ranks.json
      b = i;
      if (b == i) {
        ranksOld.push(MrRedirection.rankOldJson[a].name); //adds the name of ranks[a] to the array 'ranks'
        emojisOld.push(MrRedirection.emojis.get(MrRedirection.rankOldJson[a].id)); //adds the id of ranks[a] to the array 'emoji'
        a++;
      }
    }
    emojis = emojisOld;
    ranks = ranksOld;
  }
  let OnesLocation = RankObject[0];
  let TwosLocation = RankObject[1];
  let ThreesLocation = RankObject[2];
  let SThreesLocation = RankObject[3];

  let rewardEmoji = RewardsLogic(Rewards);
  //sets a base variable for the following sections which finds the current ranked season data of user
  let onesRank, onesDiv, onesMMR, onesDisplay = `Unranked`;
  let onesEmoji = emojis[0];
  if (OnesLocation) {
    let ones = OnesLocation;

    onesRank = Numerals(ones.Rank);
    if (onesRank == undefined || onesRank == '') {
      onesRank = 'Unranked';
    }
    onesDiv = (Numerals(ones.Div) === undefined ? '' : Numerals(ones.Div).replace('ision', ''));
    onesMMR = (ones.MMR == undefined ? '0' : ones.MMR);
    onesDisplay = `${onesRank} ${onesDiv} ${onesMMR}`;
    onesEmoji = emojis[emojiLogic(MrRedirection, onesRank)];
  }

  let twosRank, twosDiv, twosMMR, twosDisplay = `Unranked`;
  let twosEmoji = emojis[0];
  if (TwosLocation) {
    let twos = TwosLocation;
    twosRank = Numerals(twos.Rank);
    if (twosRank == undefined || twosRank == '') {
      twosRank = 'Unranked';
    }
    twosDiv = (Numerals(twos.Div) === undefined ? '' : Numerals(twos.Div).replace('ision', ''));
    twosMMR = (twos.MMR == undefined ? '0' : twos.MMR);
    twosDisplay = `${twosRank} ${twosDiv} ${twosMMR}`;
    twosEmoji = emojis[emojiLogic(MrRedirection, twosRank)];
  }

  let threesRank, threesDiv, threesMMR, threesDisplay = `Unranked`;
  let threesEmoji = emojis[0];
  if (ThreesLocation) {
    let threes = ThreesLocation;

    threesRank = Numerals(threes.Rank);
    if (threesRank == undefined || threesRank == '') {
      threesRank = 'Unranked';
    }
    threesDiv = (Numerals(threes.Div) === undefined ? '' : Numerals(threes.Div).replace('ision', ''));
    threesMMR = (threes.MMR == undefined ? '0' : threes.MMR);
    threesDisplay = `${threesRank} ${threesDiv} ${threesMMR}`;
    threesEmoji = emojis[emojiLogic(MrRedirection, threesRank)];
  }

  let sthreesRank, sthreesDiv, sthreesMMR, sthreesDisplay = `Unranked`;
  let sthreesEmoji = emojis[0];
  if (SThreesLocation) {
    let sthrees = SThreesLocation;

    sthreesRank = Numerals(sthrees.Rank);
    if (sthreesRank == undefined || sthreesRank == '') {
      sthreesRank = 'Unranked';
    }
    sthreesDiv = (Numerals(sthrees.Div) === undefined ? '' : Numerals(sthrees.Div).replace('ision', ''));
    sthreesMMR = (sthrees.MMR == undefined ? '0' : sthrees.MMR);
    sthreesDisplay = `${sthreesRank} ${sthreesDiv} ${sthreesMMR}`;
    sthreesEmoji = emojis[emojiLogic(MrRedirection, sthreesRank)];
  }

  let hoopsRank, hoopsDiv, hoopsMMR, hoopsDisplay, hoopsEmoji, rumbleRank, rumbleDiv, rumbleMMR, rumbleDisplay, rumbleEmoji = null;
  let dropshotRank, dropshotDiv, dropshotMMR, dropshotDisplay, dropshotEmoji, snowdayRank, snowdayDiv, snowdayMMR, snowdayDisplay, snowdayEmoji = null;

  if (season >= 9 && SearchType != 'MIN') {
    let HoopsLocation = RankObject[4];
    let RumbleLocation = RankObject[5];
    let DropshotLocation = RankObject[6];
    let SnowdayLocation = RankObject[7];

    hoopsRank, hoopsDiv, hoopsMMR, hoopsDisplay = `Unranked`;
    hoopsEmoji = emojis[0];
    if (HoopsLocation) {
      let hoops = HoopsLocation;

      hoopsRank = Numerals(hoops.Rank);
      if (hoopsRank == undefined || hoopsRank == '') {
        hoopsRank = 'Unranked';
      }
      hoopsDiv = (Numerals(hoops.Div) === undefined ? '' : Numerals(hoops.Div).replace('ision', ''));
      hoopsMMR = (hoops.MMR == undefined ? '0' : hoops.MMR);
      hoopsDisplay = `${hoopsRank} ${hoopsDiv} ${hoopsMMR}`;
      hoopsEmoji = emojis[emojiLogic(MrRedirection, hoopsRank)];
    }

    rumbleRank, rumbleDiv, rumbleMMR, rumbleDisplay = `Unranked`;
    rumbleEmoji = emojis[0];
    if (RumbleLocation) {
      let rumble = RumbleLocation;
      rumbleRank = Numerals(rumble.Rank);
      if (rumbleRank == undefined || rumbleRank == '') {
        rumbleRank = 'Unranked';
      }
      rumbleDiv = (Numerals(rumble.Div) === undefined ? '' : Numerals(rumble.Div).replace('ision', ''));
      rumbleMMR = (rumble.MMR == undefined ? '0' : rumble.MMR);
      rumbleDisplay = `${rumbleRank} ${rumbleDiv} ${rumbleMMR}`;
      rumbleEmoji = emojis[emojiLogic(MrRedirection, rumbleRank)];
    }

    dropshotRank, dropshotDiv, dropshotMMR, dropshotDisplay = `Unranked`;
    dropshotEmoji = emojis[0];
    if (DropshotLocation) {
      let dropshot = DropshotLocation;

      dropshotRank = Numerals(dropshot.Rank);
      if (dropshotRank == undefined || dropshotRank == '') {
        dropshotRank = 'Unranked';
      }
      dropshotDiv = (Numerals(dropshot.Div) === undefined ? '' : Numerals(dropshot.Div).replace('ision', ''));
      dropshotMMR = (dropshot.MMR == undefined ? '0' : dropshot.MMR);
      dropshotDisplay = `${dropshotRank} ${dropshotDiv} ${dropshotMMR}`;
      dropshotEmoji = emojis[emojiLogic(MrRedirection, dropshotRank)];
    }

    snowdayRank, snowdayDiv, snowdayMMR, snowdayDisplay = `Unranked`;
    snowdayEmoji = emojis[0];
    if (SnowdayLocation) {
      let snowday = SnowdayLocation;

      snowdayRank = Numerals(snowday.Rank);
      if (snowdayRank == undefined || snowdayRank == '') {
        snowdayRank = 'Unranked';
      }
      snowdayDiv = (Numerals(snowday.Div) === undefined ? '' : Numerals(snowday.Div).replace('ision', ''));
      snowdayMMR = (snowday.MMR == undefined ? '0' : snowday.MMR);
      snowdayDisplay = `${snowdayRank} ${snowdayDiv} ${snowdayMMR}`;
      snowdayEmoji = emojis[emojiLogic(MrRedirection, snowdayRank)];
    }
  }


  let urls = String(`${tS}${Platform}/${SteamID}${tSe}`); //Sets the url for the embed
  let description = `This users Rocket League ranks for season ${season.replace(',','')}.`;
  let footer = `[Click here for more info.](${tS}${Platform}/${SteamID}${tSe})`;
  switch (Number(season)) {
    case MrRedirection.seasonRL:
      let RewardBool = (RewardWins !== undefined ? (emojis[rewardEmoji] !== undefined ? true : false) : false);
      let RewardPhrase = (RewardBool == true ? (rewardEmoji == 19 ? `**SEASON REWARDS:** ${emojis[rewardEmoji]}` : `**SEASON REWARDS:** ${emojis[rewardEmoji]}  **- ${RewardWins} Wins**`) : ` **SEASON REWARDS:** Not Found`);
      switch (SearchType) {
        case 'MIN':
          {
            message.edit({
              embed: {
                color: 6234471,
                author: {
                  name: `${User.Name}`,
                  url: urls,
                  icon: 'https://cdn.discordapp.com/attachments/426906611211042818/427354857771630592/580b57fcd9996e24bc43c540.png',
                  icon_url: Icon
                },
                description,
                thumbnail: {
                  url: User.Avatar
                },
                fields: [{
                  name: `―――――――――――――――――――`,
                  value: RewardPhrase,
                  inline: false
                }, {
                  name: `―――――――――――――――――――`,
                  value: ' **RANKS** ',
                  inline: false
                }, {
                  name: `Solo Duels${onesEmoji}`,
                  value: onesDisplay,
                  inline: true
                }, {
                  name: `Doubles${twosEmoji}`,
                  value: twosDisplay,
                  inline: true
                }, {
                  name: `Standards${threesEmoji}`,
                  value: `${threesDisplay}`,
                  inline: true
                }, {
                  name: `Solo Standards${sthreesEmoji}`,
                  value: sthreesDisplay,
                  inline: true
                }, {
                  name: `―――――――――――――――――――`,
                  value: `**${footer}**`,
                  inline: false
                }],
                timestamp: new Date()
              }
            });
            break;
          }
        case 'NORM':
          {
            message.edit({
              embed: {
                color: 6234471,
                author: {
                  name: `${User.Name}`,
                  url: urls,
                  icon: 'https://cdn.discordapp.com/attachments/426906611211042818/427354857771630592/580b57fcd9996e24bc43c540.png',
                  icon_url: Icon
                },
                description,
                thumbnail: {
                  url: User.Avatar
                },
                fields: [{
                  name: `―――――――――――――――――――`,
                  value: RewardPhrase,
                  inline: false
                }, {
                  name: `―――――――――――――――――――`,
                  value: ' **RANKS** ',
                  inline: false
                }, {
                  name: `Solo Duels${onesEmoji}`,
                  value: onesDisplay,
                  inline: true
                }, {
                  name: `Doubles${twosEmoji}`,
                  value: twosDisplay,
                  inline: true
                }, {
                  name: `Standards${threesEmoji}`,
                  value: `${threesDisplay}`,
                  inline: true
                }, {
                  name: `Solo Standards${sthreesEmoji}`,
                  value: sthreesDisplay,
                  inline: true
                }, {
                  name: `―――――――――――――――――――`,
                  value: ' **OTHER RANKS** ',
                  inline: false
                }, {
                  name: `Hoops${hoopsEmoji}`,
                  value: hoopsDisplay,
                  inline: true
                }, {
                  name: `Rumble${rumbleEmoji}`,
                  value: rumbleDisplay,
                  inline: true
                }, {
                  name: `Dropshot${dropshotEmoji}`,
                  value: `${dropshotDisplay}`,
                  inline: true
                }, {
                  name: `Snow Day${snowdayEmoji}`,
                  value: snowdayDisplay,
                  inline: true
                }, {
                  name: `―――――――――――――――――――`,
                  value: `**${footer}**`,
                  inline: false
                }],
                timestamp: new Date()
              }
            });
            break;
          }
        case 'FULL':
          {
            message.edit({
              embed: {
                color: 6234471,
                author: {
                  name: `${User.Name}`,
                  url: urls,
                  icon: 'https://cdn.discordapp.com/attachments/426906611211042818/427354857771630592/580b57fcd9996e24bc43c540.png',
                  icon_url: Icon
                },
                description,
                thumbnail: {
                  url: User.Avatar
                },
                fields: [{
                    name: `―――――――――――――――――――`,
                    value: RewardPhrase,
                    inline: false
                  }, {
                    name: `―――――――――――――――――――`,
                    value: ' **RANKS** ',
                    inline: false
                  }, {
                    name: `Solo Duels${onesEmoji}`,
                    value: onesDisplay,
                    inline: true
                  }, {
                    name: `Doubles${twosEmoji}`,
                    value: twosDisplay,
                    inline: true
                  }, {
                    name: `Standards${threesEmoji}`,
                    value: `${threesDisplay}`,
                    inline: true
                  }, {
                    name: `Solo Standards${sthreesEmoji}`,
                    value: sthreesDisplay,
                    inline: true
                  }, {
                    name: `―――――――――――――――――――`,
                    value: ' **OTHER RANKS** ',
                    inline: false
                  }, {
                    name: `Hoops${hoopsEmoji}`,
                    value: hoopsDisplay,
                    inline: true
                  }, {
                    name: `Rumble${rumbleEmoji}`,
                    value: rumbleDisplay,
                    inline: true
                  }, {
                    name: `Dropshot${dropshotEmoji}`,
                    value: `${dropshotDisplay}`,
                    inline: true
                  }, {
                    name: `Snow Day${snowdayEmoji}`,
                    value: snowdayDisplay,
                    inline: true
                  }, {
                    name: `―――――――――――――――――――`,
                    value: ' **STATS** \n',
                    inline: false
                  },
                  {
                    name: `Wins:`,
                    value: Stats.Wins,
                    inline: true
                  },
                  {
                    name: 'Goals:',
                    value: Stats.Goals,
                    inline: true
                  }, {
                    name: `MVPs:`,
                    value: Stats.MVPs,
                    inline: true
                  },
                  {
                    name: 'Saves:',
                    value: Stats.Saves,
                    inline: true
                  }, {
                    name: `Shots:`,
                    value: Stats.Shots,
                    inline: true
                  },
                  {
                    name: 'Assists:',
                    value: Stats.Assists,
                    inline: true
                  }, {
                    name: `Shot %:`,
                    value: `${Stats.GoalShotRatio}%`,
                    inline: true
                  }, {
                    name: `MVP %:`,
                    value: `${Stats.MvpWinRation}%`,
                    inline: true
                  }, {
                    name: `―――――――――――――――――――`,
                    value: `**${footer}**`,
                    inline: false
                  }
                ],
                timestamp: new Date()
              }
            });
            break;
          }

        case 'STATS':
          {
            message.edit({
              embed: {
                color: 6234471,
                author: {
                  name: `${User.Name}`,
                  url: urls,
                  icon: 'https://cdn.discordapp.com/attachments/426906611211042818/427354857771630592/580b57fcd9996e24bc43c540.png',
                  icon_url: Icon
                },
                description,
                thumbnail: {
                  url: User.Avatar
                },
                fields: [{
                    name: `―――――――――――――――――――`,
                    value: RewardPhrase,
                    inline: false
                  }, {
                    name: `―――――――――――――――――――`,
                    value: ' **RANKS** ',
                    inline: false
                  }, {
                    name: `Solo Duels${onesEmoji}`,
                    value: onesDisplay,
                    inline: true
                  }, {
                    name: `Doubles${twosEmoji}`,
                    value: twosDisplay,
                    inline: true
                  }, {
                    name: `Standards${threesEmoji}`,
                    value: `${threesDisplay}`,
                    inline: true
                  }, {
                    name: `Solo Standards${sthreesEmoji}`,
                    value: sthreesDisplay,
                    inline: true
                  }, {
                    name: `―――――――――――――――――――`,
                    value: ' **OTHER RANKS** ',
                    inline: false
                  }, {
                    name: `Hoops${hoopsEmoji}`,
                    value: hoopsDisplay,
                    inline: true
                  }, {
                    name: `Rumble${rumbleEmoji}`,
                    value: rumbleDisplay,
                    inline: true
                  }, {
                    name: `Dropshot${dropshotEmoji}`,
                    value: `${dropshotDisplay}`,
                    inline: true
                  }, {
                    name: `Snow Day${snowdayEmoji}`,
                    value: snowdayDisplay,
                    inline: true
                  }, {
                    name: `―――――――――――――――――――`,
                    value: ' **STATS** \n',
                    inline: false
                  },
                  {
                    name: `Wins:`,
                    value: Stats.Wins,
                    inline: true
                  },
                  {
                    name: 'Goals:',
                    value: Stats.Goals,
                    inline: true
                  }, {
                    name: `MVPs:`,
                    value: Stats.MVPs,
                    inline: true
                  },
                  {
                    name: 'Saves:',
                    value: Stats.Saves,
                    inline: true
                  }, {
                    name: `Shots:`,
                    value: Stats.Shots,
                    inline: true
                  },
                  {
                    name: 'Assists:',
                    value: Stats.Assists,
                    inline: true
                  }, {
                    name: `Shot %:`,
                    value: `${Stats.GoalShotRatio}%`,
                    inline: true
                  }, {
                    name: `MVP %:`,
                    value: `${Stats.MvpWinRation}%`,
                    inline: true
                  }, {
                    name: `―――――――――――――――――――`,
                    value: `**${footer}**`,
                    inline: false
                  }
                ],
                timestamp: new Date()
              }
            });
            break;
          }
      }
      message.channel.stopTyping(true);
      //console.log(`{"Username": ${User.Name}, "1v1": ${onesDisplay}, '2v2':  ${twosDisplay}, '3v3 (Solo)': ${sthreesDisplay}, '3v3':  ${sthreesDisplay},'URL': ${SteamID}}`);
      break;
    default:
      switch (SearchType) {
        case 'NORM':
          {
            message.edit({
              embed: {
                color: 6234471,
                author: {
                  name: `${User.Name}`,
                  url: urls,
                  icon: 'https://cdn.discordapp.com/attachments/426906611211042818/427354857771630592/580b57fcd9996e24bc43c540.png',
                  icon_url: Icon
                },
                description,
                thumbnail: {
                  url: User.Avatar
                },
                fields: [{
                  name: `―――――――――――――――――――`,
                  value: ' **RANKS** ',
                  inline: false
                }, {
                  name: `Solo Duels${onesEmoji}`,
                  value: onesDisplay,
                  inline: true
                }, {
                  name: `Doubles${twosEmoji}`,
                  value: twosDisplay,
                  inline: true
                }, {
                  name: `Standards${threesEmoji}`,
                  value: `${threesDisplay}`,
                  inline: true
                }, {
                  name: `Solo Standards${sthreesEmoji}`,
                  value: sthreesDisplay,
                  inline: true
                }, {
                  name: `―――――――――――――――――――`,
                  value: `**${footer}**`,
                  inline: false
                }],
                timestamp: new Date()
              }
            });
            break;
          }
        case 'MIN':
          {
            message.edit({
              embed: {
                color: 6234471,
                author: {
                  name: `${User.Name}`,
                  url: urls,
                  icon: 'https://cdn.discordapp.com/attachments/426906611211042818/427354857771630592/580b57fcd9996e24bc43c540.png',
                  icon_url: Icon
                },
                description,
                thumbnail: {
                  url: User.Avatar
                },
                fields: [{
                  name: `―――――――――――――――――――`,
                  value: ' **RANKS** ',
                  inline: false
                }, {
                  name: `Solo Duels${onesEmoji}`,
                  value: onesDisplay,
                  inline: true
                }, {
                  name: `Doubles${twosEmoji}`,
                  value: twosDisplay,
                  inline: true
                }, {
                  name: `Standards${threesEmoji}`,
                  value: `${threesDisplay}`,
                  inline: true
                }, {
                  name: `Solo Standards${sthreesEmoji}`,
                  value: sthreesDisplay,
                  inline: true
                }, {
                  name: `―――――――――――――――――――`,
                  value: `**${footer}**`,
                  inline: false
                }],
                timestamp: new Date()
              }
            });
            break;
          }
        case 'STAT':
          {
            message.edit({
              embed: {
                color: 6234471,
                author: {
                  name: `${User.Name}`,
                  url: urls,
                  icon: 'https://cdn.discordapp.com/attachments/426906611211042818/427354857771630592/580b57fcd9996e24bc43c540.png',
                  icon_url: Icon
                },
                description,
                thumbnail: {
                  url: User.Avatar
                },
                fields: [{
                    name: `―――――――――――――――――――`,
                    value: ' **RANKS** ',
                    inline: false
                  }, {
                    name: `Solo Duels${onesEmoji}`,
                    value: onesDisplay,
                    inline: true
                  }, {
                    name: `Doubles${twosEmoji}`,
                    value: twosDisplay,
                    inline: true
                  }, {
                    name: `Standards${threesEmoji}`,
                    value: `${threesDisplay}`,
                    inline: true
                  }, {
                    name: `Solo Standards${sthreesEmoji}`,
                    value: sthreesDisplay,
                    inline: true
                  }, {
                    name: `―――――――――――――――――――`,
                    value: ' **STATS** \n',
                    inline: false
                  },
                  {
                    name: `Wins:`,
                    value: Stats.Wins,
                    inline: true
                  },
                  {
                    name: 'Goals:',
                    value: Stats.Goals,
                    inline: true
                  }, {
                    name: `MVPs:`,
                    value: Stats.MVPs,
                    inline: true
                  },
                  {
                    name: 'Saves:',
                    value: Stats.Saves,
                    inline: true
                  }, {
                    name: `Shots:`,
                    value: Stats.Shots,
                    inline: true
                  },
                  {
                    name: 'Assists:',
                    value: Stats.Assists,
                    inline: true
                  }, {
                    name: `Shot Percentage:`,
                    value: `${Stats.GSRatio}%`,
                    inline: true
                  }, {
                    name: `MVP Percentage:`,
                    value: `${Stats.MVPRatio}%`,
                    inline: true
                  }, {
                    name: `―――――――――――――――――――`,
                    value: `**${footer}**`,
                    inline: false
                  }
                ],
                timestamp: new Date()
              }
            });
            break;
          }
        case 'FULL':
          {
            message.edit({
              embed: {
                color: 6234471,
                author: {
                  name: `${User.Name}`,
                  url: urls,
                  icon: 'https://cdn.discordapp.com/attachments/426906611211042818/427354857771630592/580b57fcd9996e24bc43c540.png',
                  icon_url: Icon
                },
                description,
                thumbnail: {
                  url: User.Avatar
                },
                fields: [{
                    name: `―――――――――――――――――――`,
                    value: ' **RANKS** ',
                    inline: false
                  }, {
                    name: `Solo Duels${onesEmoji}`,
                    value: onesDisplay,
                    inline: true
                  }, {
                    name: `Doubles${twosEmoji}`,
                    value: twosDisplay,
                    inline: true
                  }, {
                    name: `Standards${threesEmoji}`,
                    value: `${threesDisplay}`,
                    inline: true
                  }, {
                    name: `Solo Standards${sthreesEmoji}`,
                    value: sthreesDisplay,
                    inline: true
                  }, {
                    name: `―――――――――――――――――――`,
                    value: ' **STATS** \n',
                    inline: false
                  },
                  {
                    name: `Wins:`,
                    value: Stats.Wins,
                    inline: true
                  },
                  {
                    name: 'Goals:',
                    value: Stats.Goals,
                    inline: true
                  }, {
                    name: `MVPs:`,
                    value: Stats.MVPs,
                    inline: true
                  },
                  {
                    name: 'Saves:',
                    value: Stats.Saves,
                    inline: true
                  }, {
                    name: `Shots:`,
                    value: Stats.Shots,
                    inline: true
                  },
                  {
                    name: 'Assists:',
                    value: Stats.Assists,
                    inline: true
                  }, {
                    name: `Shot Percentage:`,
                    value: `${Stats.GSRatio}%`,
                    inline: true
                  }, {
                    name: `MVP Percentage:`,
                    value: `${Stats.MVPRatio}%`,
                    inline: true
                  }, {
                    name: `―――――――――――――――――――`,
                    value: `**${footer}**`,
                    inline: false
                  }
                ],
                timestamp: new Date()
              }
            });
            break;
          }
      }
      message.channel.stopTyping(true);
      require('../module/report.js').report(MrRedirection, oldMessage, Date.now());
      //console.log(`{"Username": ${User.Name}, "1v1": ${onesDisplay}, '2v2':  ${twosDisplay}, '3v3 (Solo)': ${sthreesDisplay}, '3v3':  ${sthreesDisplay},'URL': ${SteamID}}`);
  }
}

module.exports.run = (MrRedirection, arr, SearchType) => {
  // Maps
  // USER
  let user = arr.User;
  let msg = user.Channel;
  let Icon = user.Icon;
  let season = user.Season;
  let SteamID = user.SteamID;
  let Platform = user.Platform;
  let User = user.UserInfo;
  let oldMessage = user.OldMessage;
  // REWARDS
  let rHead = arr.Rewards;
  let reward = rHead.Level;
  let rewardWins = rHead.Wins;
  // STATS
  let Stats = arr.Stats;
  // Ranks
  let RankObject = arr.Ranks;
  require('../module/report.js').report(MrRedirection, oldMessage, Date.now());
  try {
    rank(oldMessage, MrRedirection, SearchType, Platform, Stats, msg, String(season).replace(',', ''), RankObject, String(SteamID).replace(',', ''), User, String(reward).replace(',', ''), String(rewardWins).replace(',', ''), Icon); //'Trys' the function 'rank' which gets the rank of the player mentioned
  }
  catch (error) {
    msg.channel.stopTyping(true);
    console.log(error); //Prevents the bot from crashing due to an error
  }
};

module.exports.info = {
  category: 'hidden',
  name: 'rlmaster',
  description: 'ONLY FOR MR. REDIRECTION',
  authLevel: 5
};
