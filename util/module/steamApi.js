const SteamApi = require('steam-api');
const user = new SteamApi.User(process.env.STEAM_API_KEY);
const apiLink = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?key=${process.env.STEAM_API_KEY}&appid=730&steamid=`

function getSteamUrl(id, callback) {
    if (!isNaN(id)) return callback(id);
    user.ResolveVanityUrl(id).done((newId) => {
        callback(newId);
    });
}

module.exports.run = (id, callback) => {

    getSteamUrl(id, (steamID) => {
        let id = (steamID != undefined ? steamID : results)
        require('http').get(apiLink + steamID, res2 => {
            res2.setEncoding("utf8");
            let body = "";
            res2.on("data", data => {
                body += data;
            });
            res2.on("end", () => {
                if (!body.startsWith("<html>")) {
                    body = JSON.parse(body);
                    callback(body)
                }
                else {
                    callback('private')
                }

            });
        });

    })
}
