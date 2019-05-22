module.exports.headerStart = 2;

module.exports.headerHeight = 4;

module.exports.columnStart = 2;

module.exports.format = {
    comma: '###,###,###',
    decimal: '#.##',
    percentage: '#0.0%',
    defaultLayout: ' :'
};


module.exports.defaultStats = [
    {
        "title": "Kills",
        "type": "Number",
        "search": {
            "one": "total_kills_"//${weapon}
        },
        "format": "comma"
    },
    {
        "title": "Accuracy",
        "type": "Divide",
        "search": {
            "one": "total_hits_",//${weapon}
            "two": "total_shots_"//${weapon}
        },
        "format": "percentage"
    },
    {
        "title": "Total Kills",
        "type": "Divide",
        "search": {
            "one": "total_kills_",//${weapon}
            "two": "total_kills"
        },
        "format": "percentage"
    }
];


module.exports.getBodyStyles = (wb) => {
    const styles = {
        header: wb.createStyle({
            font: {
                color: 'FFFFFF',
                size: 28,
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center'
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '30549f'
            }
        }),
        left: wb.createStyle({
            font: {
                size: 14,
            },
            alignment: {
                horizontal: 'right',
                vertical: 'center'
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: 'BFBFBF'
            }
        }),
        right: {
            font: {
                size: 14,
            },
            alignment: {
                horizontal: 'left',
                vertical: 'center'
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: 'BFBFBF'
            }
        },
        empty: wb.createStyle({
            font: {
                size: 14,
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: 'BFBFBF'
            }
        })
    };
    return styles;
};