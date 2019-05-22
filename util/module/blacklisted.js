const badwordsRegExp = require('badwords/regexp');

module.exports = (client, message) => {
    /*
    let words = message.content.split(' ') //(/([A-Z].*?[a-z])(?=[A-Z]|$)/gm)
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(/\n/g, '').replace(' ', '');
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        let newWordArr = words[i].split(/([A-Z].*?[a-z])(?=[A-Z]|$)/gm)
        words[i] = `'${newWordArr.join(' ').toUpperCase().trim().replace(/\s\s/g, '_')}',`;
    }
    message.channel.send(words.join('\n'))
    */
    let expression = new RegExp(badwordsRegExp);
    if (message.content.match(expression)) {
        let match = message.content.match(expression);
        require('./report.js').report(client, message, Date.now(), false, match);
        return true
    }
    return false
};
