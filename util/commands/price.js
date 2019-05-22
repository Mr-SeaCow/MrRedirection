const { Rank, Reward } = require('../../data/prices.json');
const Progression = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Champion'];
const Pos = [0, 3, 6, 9, 12, 15]

function DivCheck(x, i, message, Progression, args) {
  let returnValue = null;

  switch (Progression[i]) {
    case 'Champion':
      {
        if (args[x][1] > 3) {
          message.channel.send('That division does not exist!');
          returnValue = null;
        }
        else if (args[x][1] == 3) {
          message.channel.send(`We do not currently boost to ${Progression[i]} ${args[x][1]}`);
          returnValue = null;
        }
        else {
          returnValue = [Progression[i], args[x][1], Pos[i] + Number(args[x][1])];
        }
        break;
      }
    default:
      {
        if (Number(args[x][1]) > 3) {
          message.channel.send('That division does not exist!');
          returnValue = null;
        }
        else {
          returnValue = [Progression[i], args[x][1], Pos[i] + Number(args[x][1])];
        }
        break;
      }
  }

  return returnValue;

}


module.exports.run = (client, message, args) => {
  if (args[0].toUpperCase() === args[1].toUpperCase()) return message.channel.send('Please enter two seperate values.');
  let Start = null;
  let End = null;

  if (args[0].length == 2 && args[1].length == 2) {

    for (let i = 0; i < Progression.length; i++) {
      if (args[0][0].toUpperCase() === Progression[i][0]) {
        Start = DivCheck(0, i, message, Progression, args);
      }
      if (args[1][0].toUpperCase() === Progression[i][0]) {
        End = DivCheck(1, i, message, Progression, args);
      }
    }

  }
  else {

  }

  if (Start === null || End === null) return;
  if (Start[2] > End[2]) return message.channel.send('We are a boosting service, not a deranking service.');

  let counter = 0;
  let Decider0 = false;
  let Decider1 = false;
  for (let a = 0; a < 6; a++) {
    if (Decider0 == false) {
      if (Progression[a] === Start[0]) {
        Decider0 = true;
      }
    }
    if (Decider0 == true) {
      for (let b = 1; b < 4; b++) {
        if (Decider1 == false) {
          if (b == Start[1]) {
            Decider1 = true;
          }
        }
        if (Decider1 == true) {
          counter += Rank[Progression[a]][String(b)];
          if (Progression[a] === End[0] && b == End[1]) {
            Decider0 = null;
            Decider1 = null;
          }
        }
      }
    }
  }

  counter = counter - Rank[Start[0]][String(Start[1])];

  message.channel.send(`You'll be looking at a total of $${counter}.`)

  require('../module/report.js').report(client, message, Date.now());
};

module.exports.info = {
  category: 'Rocket League Boosting',
  name: 'price',
  description: 'Determines the price of the boost you are requesting.',
  authLevel: 1
};
