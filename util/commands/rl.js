const SteamApi = require('steam-api');
const fs = require('fs');
const _ = require('underscore');
const user = new SteamApi.User(STEAM_API_KEY);
const SteamIcon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1000px-Steam_icon_logo.svg.png';
const XboxIcon = 'https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/256/XBox_360.png';
const PsIcon = 'https://cdn.discordapp.com/attachments/429036941254721547/486376807730380810/unknown.png';
const tS = "https://rocketleague.tracker.network/profile/";
const tSe = "?ref=discord";
const rls = require('../module/RocketLeagueRank.js');
const blankAvatar = `http://orig02.deviantart.net/f865/f/2012/121/4/9/transparent__blank__by_madhatter2408-d4y5rky.png`;
const firstIdFallBack = `You have not setup your first preset id!\nType ${"`!rlsetup `"} followed by the end of your steam url.\nFor example, ${"`!rlsetup mrseacow`"}`;
const helpOption = fs.readFileSync('./data/rlHelpOption.txt', 'utf8');
var Client = new rls.Client();
const st = require('../../data/rlStorage.json')

function errorHandler(errorCode, errorArray, MrRedirection, message) {
    errorArray[0].edit({
        embed: {
            color: 6234471,
            author: {
                name: errorArray[1],
                url: errorArray[2],
                icon_url: errorArray[3],
            },
            description: `Fetching user's info...`,
            timestamp: new Date()
        }
    });
    switch (errorCode) {
        case 1:
            {
                errorArray[0].edit({
                    embed: {
                        color: 16384000,
                        author: {
                            name: errorArray[1],
                            url: errorArray[2],
                            icon_url: errorArray[3],
                        },
                        fields: [{
                            name: `Error Code ${errorCode}`,
                            value: `I could not find this user in my database!`
                        }],
                        timestamp: new Date()
                    }
                });
                break;
            }
        case 2:
            {
                errorArray[0].edit({
                    embed: {
                        color: 16384000,
                        author: {
                            name: errorArray[1],
                            url: errorArray[2],
                            icon_url: errorArray[3],
                        },
                        fields: [{
                            name: `Error Code ${errorCode}`,
                            value: `This user does not have any ranked data for season ${errorArray[4]}.`,
                        }],
                        timestamp: new Date()
                    }
                });
                break;
            }
        case 3:
            {
                errorArray[0].edit({
                    embed: {
                        color: 16384000,
                        author: {
                            name: errorArray[1],
                            url: errorArray[2],
                            icon_url: errorArray[3],
                        },
                        fields: [{
                            name: `Error Code ${errorCode}`,
                            value: `Stop looking for future season!`,
                        }],
                        timestamp: new Date()
                    }
                });
                break;
            }
        case 4:
            {
                errorArray[0].edit({
                    embed: {
                        color: 16384000,
                        author: {
                            name: errorArray[1],
                            url: errorArray[2],
                            icon_url: errorArray[3],
                        },
                        fields: [{
                            name: `Error Code ${errorCode}`,
                            value: `Seems like your id was invalid.`,
                        }],
                        timestamp: new Date()
                    }
                });
                break;
            }
        default:
            {
                errorArray[0].edit({
                    embed: {
                        color: 16384000,
                        author: {
                            name: errorArray[1],
                            url: errorArray[2],
                            icon_url: errorArray[3],
                        },
                        fields: [{
                            name: `Error Code Unknown`,
                            value: `Seems like something went wrong, try again later!`
                        }],
                        timestamp: new Date()
                    }
                });
                break;
            }
    }
    require('../module/report.js').report(MrRedirection, message, Date.now());
}

function findPreset(MrRedirection, message, presetNumber, callback) {

    if (isNaN(Number(presetNumber)) || Number(presetNumber) > 10000) return callback(presetNumber);
    let b = 1;
    for (let i in MrRedirection.rlStorage) { //searches through rlStorage.json
        let input = MrRedirection.rlStorage[i]['lookup' + String(presetNumber)]; //Goes to rlStorage.json and gets the lookup2 value of i
        if (MrRedirection.rlStorage[i].sf == message.author.id) {
            if (!input) { //input = the second preset of message.author
                return message.channel.send(`It looks like your preset number ${presetNumber} does not exist.\nTo see all of your current presets, type \`!rl list\`.\nIf you still need help using this command, type \`!rl help\`.`, { code: 'yaml' });
            }
            if (input) {
                b = Object.keys(MrRedirection.rlStorage).length + 1;
                return callback(input); //Prevents the code from running any farther
            }
        }
        b++; //Another method of keeping track where the loop is
        if (Object.keys(MrRedirection.rlStorage).length === b && MrRedirection.rlStorage[i].sf == message.author.id) { //Stops this file when message.author was not found
            message.channel.send(firstIdFallBack);
            require('../module/report.js').report(MrRedirection, message, Date.now());
        }
    }
}

function setup(MrRedirection, message, args) {
    let id = message.author.id;
    let username = message.author.username;
    if (!args[0]) return message.channel.send("You are missing your steam id!");
    switch (args[0].toUpperCase().substring(0, 3)) {
        case 'ADD':
            {
                if (!args[1]) return message.channel.send("You are missing your steam id!");
                if (!MrRedirection.rlStorage[id]) {
                    MrRedirection.rlStorage[id] = {
                        sf: id,
                        lookup1: args[1],
                        name: username
                    };
                }
                else {
                    let lookupNum = _.keys(MrRedirection.rlStorage[id]).length - 1;
                    MrRedirection.rlStorage[id][`lookup${lookupNum}`] = args[1];
                }
                fs.writeFile("../Bot/data/rlStorage.json", JSON.stringify(MrRedirection.rlStorage, null, 4), err => {
                    if (err) { throw err }
                    else message.channel.send("Information added successfully!");
                });
                break;
            }
        case 'DEL':
            {
                if (isNaN(args[1])) return message.channel.send('Please enter the preset number.');
                if (!MrRedirection.rlStorage[id]) return message.channel.send('Seems like you have nothing to delete.');
                let len = _.keys(MrRedirection.rlStorage[id]).length - 2;
                if (MrRedirection.rlStorage[id][`lookup${args[1]}`]) {
                    if (Number(args[1]) !== len) {
                        for (let i = Number(args[1]); i < len; i++) {
                            if (MrRedirection.rlStorage[id][`lookup${i + 1}`]) {
                                MrRedirection.rlStorage[id][`lookup${i}`] = MrRedirection.rlStorage[id][`lookup${i+1}`];
                            }
                        }
                    }
                    delete MrRedirection.rlStorage[id][`lookup${len}`];
                }
                fs.writeFile("../Bot/data/rlStorage.json", JSON.stringify(MrRedirection.rlStorage, null, 4), err => {
                    if (err) { throw err }
                    else message.channel.send("Information deleted successfully!");
                });
                break;
            }
        case 'LIS':
            {
                let len = _.keys(MrRedirection.rlStorage[id]).length - 2;
                let tempArray = [`"Presets for ${username}"`, '-------------------------------------------'];
                for (let i = 1; i < len + 1; i++) {
                    if (MrRedirection.rlStorage[id][`lookup${i}`]) {
                        tempArray.push(`${i}: "${MrRedirection.rlStorage[id][`lookup${i}`]}"`);
                    }
                }
                message.channel.send(tempArray.join('\n'), { code: 'json' });
                break;
            }
        case 'SET':
            {
                if (!args[1]) return message.channel.send("Please enter the preset number.");
                if (!args[2]) return message.channel.send("You are missing your steam id!");
                if (!MrRedirection.rlStorage[id]) return message.channel.send("Seems like you don't have any presets.");
                if (!MrRedirection.rlStorage[id][`lookup${args[1]}`]) return message.channel.send("That preset number does not exist.");
                MrRedirection.rlStorage[id][`lookup${args[1]}`] = args[2];
                fs.writeFile("../Bot/data/rlStorage.json", JSON.stringify(MrRedirection.rlStorage, null, 4), err => {
                    if (err) { throw err }
                    else message.channel.send("Information updated successfully!");
                });
                break;
            }
        case 'HEL':
            {
                message.channel.send(helpOption);
            }
    }
    require('../module/report.js').report(MrRedirection, message, Date.now());
}

function getSteamUrl(id, callback) {
    if (!isNaN(id)) return callback(id);
    user.ResolveVanityUrl(id).done((newId) => {
        callback(newId);
    });
}

module.exports.run = (MrRedirection, message, args) => {
    var canContinue = true;
    let setupCase = ['ADD', 'DEL', 'SET', 'LIS', 'HEL'];
    if (args[0] == undefined) { args[0] = 'HELP'; }
    for (let i = 0; i < 5; i++) {
        if (args[0].toUpperCase().substring(0, 3) == setupCase[i]) {
            canContinue = false;
        }
    }

    if (canContinue == true) {
        let platform = 'Steam';
        let icon = SteamIcon;
        let TempArgs = [];
        let searchType = 'NORM';
        if (args[1]) {
            for (let i = 0; i < args.length; i++) {
                if (args[i].startsWith('-')) {
                    let Str = args[i].slice(1).toUpperCase();
                    switch (Str) {
                        case 'XBOX':
                            delete args[i];
                            for (let j = 0; j < args.length; j++) {
                                if (args[j]) TempArgs.push(args[j]);
                            }
                            args = TempArgs;
                            platform = 'XBOX';
                            icon = XboxIcon;
                            break;
                        case 'PS4':
                            delete args[i];
                            for (let j = 0; j < args.length; j++) {
                                if (args[j]) TempArgs.push(args[j]);
                            }
                            args = TempArgs;
                            platform = 'PS';
                            icon = PsIcon;
                            break;
                        case 'PS':
                            delete args[i];
                            for (let j = 0; j < args.length; j++) {
                                if (args[j]) TempArgs.push(args[j]);
                            }
                            args = TempArgs;
                            platform = 'PS';
                            icon = PsIcon;
                            break;
                        case 'STEAM':
                            delete args[i];
                            for (let j = 0; j < args.length; j++) {
                                if (args[j]) TempArgs.push(args[j]);
                            }
                            args = TempArgs;
                            platform = 'Steam';
                            icon = SteamIcon;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        if (args[1]) {
            for (let i = 0; i < args.length; i++) {

                let Str = args[i].toUpperCase();
                switch (Str) {
                    case 'MIN':
                        delete args[i];
                        for (let j = 0; j < args.length; j++) {
                            if (args[j]) TempArgs.push(args[j]);
                        }
                        searchType = 'MIN';
                        break;
                    case 'FULL':
                        delete args[i];
                        for (let j = 0; j < args.length; j++) {
                            if (args[j]) TempArgs.push(args[j]);
                        }
                        searchType = 'STATS';
                        break;
                    case 'STAT':
                        delete args[i];
                        for (let j = 0; j < args.length; j++) {
                            if (args[j]) TempArgs.push(args[j]);
                        }
                        searchType = 'STATS';
                        break;
                    case 'STATS':
                        delete args[i];
                        for (let j = 0; j < args.length; j++) {
                            if (args[j]) TempArgs.push(args[j]);
                        }
                        searchType = 'STATS';
                        break;
                    default:
                        break;

                }
            }
        }
        if (args[0] == undefined && args.length === 2) {
            args[0] = args[1];
            delete args[1];
        }
        findPreset(MrRedirection, message, args[0], (results) => {
            if (results.length > 40) return;
            var season;
            if (args.length > 1 && platform !== 'Steam') {
                let Regex = /^-\d/gm;
                for (let i = 0; i < args.length; i++) {
                    if (args[i].match(Regex)) {
                        season = args[i].substr(1)
                    }
                    else {
                        if (i !== 0) {
                            results = results + '-' + args[i]
                        }
                    }

                }
                Regex = null;
            }
            else {
                season = args[1] || MrRedirection.seasonRL;
            }
            if (!season) { season = MrRedirection.seasonRL }
            let RLTrackerURL = `${tS}${platform.replace(',','')}/${results.replace(',','')}${tSe}`;
            message.channel.send({
                embed: {
                    color: 6234471,
                    author: {
                        name: `${results}`,
                        url: RLTrackerURL,
                        icon_url: icon,
                    },
                    description: `Fetching user's info...`,
                    timestamp: new Date()
                }
            }).then((newMessage) => {
                try {

                    let cmd = MrRedirection.commands.get('rlmaster');
                    if (platform == 'Steam') {
                        //user.ResolveVanityUrl(results).done(function(SteamID) {
                        getSteamUrl(results, (SteamID) => {

                            console.log(results)
                            let id = (SteamID != undefined ? SteamID : results);
                            var BackDoorApi = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=`;
                            require('http').get(BackDoorApi + SteamID, res2 => {
                                res2.setEncoding("utf8");
                                let body = "";
                                res2.on("data", data => {
                                    body += data;
                                });
                                res2.on("end", () => {
                                    body = JSON.parse(body);

                                    if (body.response.players[0] == undefined) return errorHandler(4, [newMessage, results, RLTrackerURL, icon, season], MrRedirection, message);
                                    let name = body.response.players[0].personaname;
                                    let avatar = body.response.players[0].avatarfull;
                                    Client.getPlayer({ plat: platform, id }, { type: searchType, season, currentSeason: MrRedirection.seasonRL }, (result) => {
                                        result['User'] = {
                                            Channel: newMessage,
                                            Icon: icon,
                                            Season: season,
                                            SteamID: id,
                                            Platform: platform,
                                            OldMessage: message,
                                            UserInfo: {
                                                Name: name,
                                                Avatar: avatar
                                            }
                                        };
                                        if (cmd) cmd.run(MrRedirection, result, searchType);
                                    }, (error) => {
                                        errorHandler(error, [newMessage, results, RLTrackerURL, icon, season], MrRedirection, message);
                                    });
                                });
                            });
                        });
                    }
                    else {
                        Client.getPlayer({ plat: platform, id: results }, { type: searchType, season, currentSeason: MrRedirection.seasonRL }, (result) => {
                            result['User'] = {
                                Channel: newMessage,
                                Icon: icon,
                                Command: 0,
                                Season: season,
                                SteamID: results,
                                Platform: platform,
                                OldMessage: message,
                                UserInfo: {
                                    Name: results,
                                    Avatar: blankAvatar
                                }
                            };
                            if (cmd) cmd.run(MrRedirection, result, searchType);
                        }, (error) => {
                            errorHandler(error, [newMessage, results, RLTrackerURL, icon, season], MrRedirection, message);
                        });
                    }
                }
                catch (error) {

                }
            });
        });

    }
    else {
        setup(MrRedirection, message, args);
    }
};

module.exports.info = {
    category: 'Rocket League',
    name: 'rl',
    description: 'Gives the rank of a player in Rocket League.',
    authLevel: 1
};
