const botSettings = require('./config/botsettings.json');
const discord = require('discord.js');
const token = botSettings.token.mrRedirection2;
const mrRedirection = new discord.Client({
    disabledEvents: [
        'CHANNEL_PINS_UPDATE',
        'CLIENT_USER_GUILD_SETTINGS_UPDATE', 'CLIENT_USER_SETTINGS_UPDATE',
        'DEBUG', 'DISCONNECT',
        'EMOJI_CREATE', 'EMOJI_DELETE',
        'EMOJI_UPDATE', 'WARN',
        'MESSAGE_DELETE', 'MESSAGE_DELETE_BULK',
        'MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE',
        'MESSAGE_REACTION_REMOVE_ALL', 'MESSAGE_UPDATE', 'RATE_LIMIT',
        'RECONNECTING', 'RESUME',
        'ROLE_CREATE', 'ROLE_DELETE',
        'ROLE_UPDATE', 'TYPING_START',
        'TYPING_STOP'
    ]
});

require('./util/eventHandler.js')(mrRedirection, botSettings);

mrRedirection.login(token);
