const SteamApi = require('steam-api');
const STEAM_API_KEY = process.env.STEAM_API_KEY;
const _ = require('underscore');


const user = new SteamApi.User(process.env.STEAM_API_KEY);

const player = new SteamApi.Player(process.env.STEAM_API_KEY);

module.exports.run = (MrRedirection, message, args, servers, pics, twitchApi) => {
    let id = [];
    let u = message.mentions.users.first() || message.author;
    let userId = u.id;
    let len = _.keys(MrRedirection.rlStorage[userId]).length - 2;
    for (let i = 1; i < len + 1; i++) {
        if (MrRedirection.rlStorage[userId][`lookup${i}`]) {
            id.push(MrRedirection.rlStorage[userId][`lookup${i}`]);
        }
    }

    let obj = [];
    let finished = 0;

    const report = {
        correctNumber: () => {
            if (finished >= id.length) return sendReport();
        }
    };

    for (let a = 0; a < id.length; a++) {
        user.ResolveVanityUrl(id[a]).done(function(result) {
            if (result != undefined) {
                player.GetOwnedGames(result, true, false, [252950])
                    .done(function(result2) {

                        const RL = call(result2.find(o => o.appId === 252950), a, (res) => {
                            obj[a] = res;
                            finished++;
                            report.correctNumber();
                        });
                        //let q = http.get(BackDoorApi + result
                    });

            }
        });
    }

    function sendReport() {
        let longStr = 'Steam ID';
        let longNum = 'Hours';
        obj.sort((a, b) => {
            if (longStr.length < a.id.length) {
                longStr = a.id;
            }
            else if (longStr.length < b.id.length) {
                longStr = b.id;
            }
            return parseFloat(b.hours) - parseFloat(a.hours);
        });
        let totalLen = longStr.length + String(longNum).length + 5;
        let tempVal = [
            `${' '.repeat((totalLen)/2 - `"${message.author.username}"`.length/2)}"${message.author.username}"`,
            `${'_'.repeat(totalLen)}`,
            `⎸${' '.repeat(Math.floor((longStr.length - 4)/2 - 1))}Steam ID ${' '.repeat(Math.ceil((longStr.length - 4)/2 - 2))}|Hours⎹`
        ];
        let tempHour = 0;
        for (let i = 0; i < obj.length; i++) {
            if (obj[i] !== undefined) {
                if (obj[i].hours != 0) {
                    tempVal.push(`⎸${' '.repeat(Math.abs(longStr.length - obj[i].id.length))}"${obj[i].id}"|${' '.repeat(String(longNum).length - String(obj[i].hours).length)}${obj[i].hours}⎹`);
                    if (!isNaN(obj[i].hours)) {
                        tempHour += Number(obj[i].hours);
                    }
                }
            }
        }
        tempVal.push(`${'‾'.repeat(totalLen)}`);
        tempVal.push(`${' '.repeat((totalLen)/2 - `"${tempHour} Hours"`.length/2)}"${tempHour} Hours"`);
        message.channel.send(tempVal.join('\n'), { code: 'json' }).then(() => {
            require('../module/report.js').report(MrRedirection, message, Date.now());
        })

    }

    function call(RL, count, callback) {
        let RLPlayTime;
        if (RL) { RLPlayTime = Math.round(RL.playtimeForever / 60) }
        else { RLPlayTime = '0' }
        callback({ id: id[count], hours: RLPlayTime });
    }

};

module.exports.info = {
    category: 'Rocket League',
    name: 'hours',
    description: 'Gives the hours that you currently have in Rocket League.',
    authLevel: 1
};
