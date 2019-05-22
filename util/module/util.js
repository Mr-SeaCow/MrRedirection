module.exports.g = (title, stats) => {
    return stats.find(s => s.name === title).value
}

module.exports.capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}