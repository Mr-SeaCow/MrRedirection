'use strict';
const http = require('follow-redirects').https;
const smallStyle = '<small style="display:block; font-size:10px; color:gray">';
const rewardObjectBlank = { Level: undefined, Wins: undefined };
const statStyle = '<div class="value" data-stat="';
const statTitles = ['GoalShotRatio', 'Wins', 'Goals', 'Saves', 'Shots', 'MVPs', 'Assists', ''];

function r(Str, Punc) {
    return Str.replace(Punc, '');
}

function Client() {
    let self = this;

    self._call = function(user, callOptions, callback, callbackError) {
        let type = callOptions.type;
        let season = callOptions.season;
        let currentSeason = callOptions.currentSeason;
        let options = {
            host: 'rocketleague.tracker.network',
            path: `/profile/${r(user.plat, ',')}/${r(user.id, ',')}`
        };
        let req = http.get(options, function(res) {
            let bodyChunks = [];
            res.on('data', function(chunk) {
                bodyChunks.push(chunk);
            }).on('end', function() {
                let body = Buffer.concat(bodyChunks);
                const decodedBody = body.toString('ascii').replace(/\n /g, '\n');
                if (season > currentSeason) return callbackError(3);
                if (decodedBody.search('We could not find') > 100 && decodedBody.search('Error updating your stats') > 100) return callbackError(1);
                if (decodedBody.search(`id="season-${season}`) < 100) return callbackError(2);
                const CurSsn = decodedBody.split(`id="season-${season}`)[1];
                let rankInfo = [];
                let rewardsTitle = (season != currentSeason ? undefined : String(CurSsn).split(`Reward Level\n${smallStyle}`));
                let rewards = (season != currentSeason ? rewardObjectBlank : (rewardsTitle[1] == undefined ? rewardObjectBlank : self._rewards(rewardsTitle)));
                rankInfo.push(self._rank(CurSsn, 'Ranked Duel 1v1', season));
                rankInfo.push(self._rank(CurSsn, 'Ranked Doubles 2v2', season));
                rankInfo.push(self._rank(CurSsn, 'Ranked Standard 3v3', season));
                rankInfo.push(self._rank(CurSsn, 'Ranked Solo Standard 3v3', season));
                if (season >= 9 && type != 'MIN') {
                    rankInfo.push(self._rank(CurSsn, 'Hoops', season));
                    rankInfo.push(self._rank(CurSsn, 'Rumble', season));
                    rankInfo.push(self._rank(CurSsn, 'Dropshot', season));
                    rankInfo.push(self._rank(CurSsn, 'Snowday', season));
                }
                if (type === 'STATS') {
                    let info = {
                        Rewards: rewards,
                        Ranks: rankInfo,
                        Stats: self._stats(CurSsn)
                    };
                    callback(info);
                }
                else {
                    let info = {
                        Rewards: rewards,
                        Ranks: rankInfo
                    };
                    callback(info);
                }
            });
            req.on('error', function(e) {
                console.log('ERROR: ' + e.message);
            });
        });
    };

    self._rewards = function(title) {
        return {
            Level: title[1].split('\n')[1],
            Wins: title[1].split('\n')[5]
        };
    };

    self._rank = function(body, playlist, season) {
        // body = web page
        // Type = Ranked Solo Standard 3v3
        let title = body.split(playlist + '\n' + smallStyle)[1] || undefined;
        if (season >= 9) {
            let finalType = playlist.replace('Ranked ', '').substring(0, playlist.length - 3);
            if (title != undefined) {
                title = title.replace(/ \n/gi, '\n').replace(/\n /gi, '\n');
                let rank = String(title.substring(title.search(`Division`), 0)).trim();
                let div = String(title.substring(title.search(`</small>`), title.search(`Division`))).trim();
                let mmrHeader = title.split(`</td>\n<td style="text-align:center;">`)[2];
                //console.log(playlist)
                //console.log(title.split(`</td>\n<td style="text-align:center;">`))
                let searchMMR;
                let searchMMR2;
                try {
                    searchMMR = Number(String(mmrHeader.substring(mmrHeader.search(`\n<div`), 0)).trim().replace(',', ''));
                    searchMMR2 = Number(String(mmrHeader.replace('\n', ' ').substring(mmrHeader.search(`<div`), 0).trim()).replace(',', ''));
                }
                catch (e) {
                    searchMMR = 0;
                    searchMMR2 = 0;
                }
                //console.log(`${playlist} 2: ${searchMMR2}`)
                let mmr = (searchMMR != 0 ? searchMMR : (searchMMR2 != 0 ? searchMMR2 : 0));


                if (rank == 'Unranked' || div == '0' || rank == 'Grand Champion') {
                    div = '';
                }
                if (div.search(`\n<a href`) != -1) {
                    div = String(div.substring(div.search(`\n<a href`), 0)).trim();
                }
                if (mmr != '') {
                    mmr = `(${mmr})`;
                }
                let UnrankedPoss = String(rank) + String(div) + String(mmr);

                if (UnrankedPoss.indexOf('Unranked') > -1) {
                    if (mmr == 0) {
                        return { 'Title': finalType, 'Rank': 'Unranked', 'Div': '', 'MMR': '' };
                    }
                    else {
                        return { 'Title': finalType, 'Rank': 'Unranked', 'Div': '', 'MMR': String(mmr) };
                    }
                }

                return { 'Title': finalType, 'Rank': String(rank), 'Div': String(div), 'MMR': String(mmr) };
            }
            else {
                return { 'Title': finalType, 'Rank': 'Unranked', 'Div': '', 'MMR': '' };
            }
        }
        else {
            let finalType = playlist.replace('Ranked ', '').substring(0, playlist.length - 3);
            if (title != undefined) {
                title = title.replace(/\n /gi, '\n');
                let rankAndDiv = self._oldRankLogic(title);
                let rank = rankAndDiv[0];
                let div = rankAndDiv[1];
                let mmrHeader = title.split(`\n</small>\n</td>\n<td>\n`)[1];
                let searchMMR = Number(String(mmrHeader.substring(mmrHeader.search(`</td`), 0)).trim().replace(',', ''));
                let searchMMR2 = Number(String(mmrHeader.substring(mmrHeader.search(`\n`), 0).trim()).replace(',', ''));
                let mmr = (searchMMR != 0 ? searchMMR : searchMMR2);
                if (rank == 'Unranked' || div == '0' || rank == 'Grand Champion') {
                    div = '';
                }
                if (div.search(`\n<a href`) != -1) {
                    div = String(div.substring(div.search(`\n<a href`), 0)).trim();
                }
                if (mmr != '') {
                    mmr = `(${mmr})`;
                }

                return { 'Title': finalType, 'Rank': String(rank), 'Div': String(div), 'MMR': String(mmr) };
            }
            else {
                return { 'Title': finalType, 'Rank': 'Unranked', 'Div': '', 'MMR': '' };
            }
        }
    };

    self._oldRankLogic = function(title) {
        let divLocation = title.split('Div')[1];
        if (divLocation.search('ision V') != -1) {
            return [String(divLocation.substring(7, divLocation.search(`</small>`))).trim(), 'Division V'];
        }
        else if (divLocation.search('ision IV') != -1) {
            return [String(divLocation.substring(8, divLocation.search(`</small>`))).trim(), 'Division IV'];
        }
        else if (divLocation.search('ision III') != -1) {
            return [String(divLocation.substring(9, divLocation.search(`</small>`))).trim(), 'Division III'];
        }
        else if (divLocation.search('ision II') != -1) {
            return [String(divLocation.substring(8, divLocation.search(`</small>`))).trim(), 'Division II'];
        }
        else if (divLocation.search('ision I') != -1) {
            return [String(divLocation.substring(7, divLocation.search(`</small>`))).trim(), 'Division I'];
        }
        else {
            return [undefined, ''];
        }
    };

    self._stats = function(body) {
        let returnObj = {};
        for (let i = 0; i < statTitles.length; i++) {
            let statTitle = String(body).split(statStyle + statTitles[i] + '">')[1]; // ${statTitles[i]}
            let value = Number(r(String(statTitle).substring(0, String(statTitle).search('<')).trim(), ','));
            if (statTitles[i] != '') {
                returnObj[`${statTitles[i]}`] = value;
            }
            else {
                returnObj[`MvpWinRation`] = value;
            }
        }
        return returnObj;
    };

    self.getPlayer = function(user, callOptions, callback, callbackError) {
        self._call(user, callOptions, callback, callbackError);
    };

    return self;
}




module.exports.Client = Client;
