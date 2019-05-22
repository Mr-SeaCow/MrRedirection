const { lifetime, weapons } = require('./data.json');
const { headerStart, headerHeight, columnStart, defaultStats } = require('./constants.js')
const { g, capitalize } = require('./util.js')
const weaponCategories = ['rifle', 'pistol', 'SMG', 'heavy', 'utility']

module.exports.run = (wb, ws, stats, bodyStyles, format) => {

    let imageRow = 6


    let cardStartingRow = headerStart + headerHeight - 1;
    let cardStartingCol = columnStart;

    for (let i = 0; i < weaponCategories.length; i++) {
        createColumn(weaponCategories[i], weapons[weaponCategories[i]], cardStartingRow, cardStartingCol)
        cardStartingCol = cardStartingCol + 5;
    }

    function createColumn(category, currentObj, startRow, startColumn) {

        ws.cell(headerStart, startColumn, headerHeight, startColumn + 3, true)
            .string(`${capitalize(category)} Stats`)
            .style(bodyStyles.header)



        let cat = (category == 'utility' ? 'utility' : 'weapon')
        let tempStartRow = cardStartingRow;
        let tempImageRow = imageRow;
        for (const a in currentObj) {
            addCard(ws, bodyStyles, tempStartRow, startColumn, currentObj[a], tempImageRow, cat);
            tempStartRow = tempStartRow + 5;
            tempImageRow = tempImageRow + 5;
        }



    }

    function addCard(ws, bodyStyles, row, column, data, tempImageRow, type) {
        ws.addImage({
            path: `./util/module/gunPictures/weapon_${data.weapon}.png`,
            type: 'picture',
            position: {
                type: 'oneCellAnchor',
                from: {
                    col: column,
                    colOff: 1530350 / 4.8,
                    row: tempImageRow,
                    rowOff: 2142490 / 4,
                },
            },
        });
        switch (type) {
            case 'utility':
                {
                    switch (data.weapon) {
                        /*
                        case 'knife': {
                            ws.cell(row, column, row + 4, column + 1, true)
                                .style(bodyStyles.empty);
                            ws.cell(row, column + 2, row, column + 3, true)
                                .style(bodyStyles.empty);
                            ws.cell(row + 3, column + 2, row + 4, column + 3, true)
                                .style(bodyStyles.empty);
                                let r = row + 1;
                                for (const d in data.searchArray) {
                                    addRow(ws, bodyStyles, column + 2, r, data.searchArray[d], '')
                                    r++;
                                }
                            break;
                        }
                        */
                        default: {
                            ws.cell(row, column, row + 4, column + 1, true)
                            .style(bodyStyles.empty);
                            ws.cell(row, column + 2, row + 1, column + 3, true)
                            .style(bodyStyles.empty);
                            ws.cell(row + 3, column + 2, row + 4, column + 3, true)
                            .style(bodyStyles.empty);
                            let r = row + 2;
                            addRow(ws, bodyStyles, column + 2, r, data.searchArray[0], '')
                            break;
                        }
                    }
                    break;
                }
            default:
                {
                    ws.cell(row, column, row + 4, column + 1, true)
                    .style(bodyStyles.empty);
                    ws.cell(row, column + 2, row, column + 3, true)
                    .style(bodyStyles.empty);
                    ws.cell(row + 4, column + 2, row + 4, column + 3, true)
                    .style(bodyStyles.empty);
                    /*
            ws.cell(row, column + 4, row + 4, column + 4, true)
                .style(bodyStyles.empty);
                */
                    let r = row + 1;
                    for (const d in defaultStats) {
                        addRow(ws, bodyStyles, column + 2, r, defaultStats[d], data.weapon)
                        r++;
                    }
                    break;
                }
        }
    }

    function addRow(ws, bodyStyles, row, column, data, weapon) {
        switch (data.type) {
            case 'Number':
                {
                    ws.cell(column, row)
                    .string(`${data.title}${format.defaultLayout}`)
                    .style(bodyStyles.left);
                    ws.cell(column, row + 1)
                    .number(g(`${data.search.one}${weapon}`, stats))
                    .style(wb.createStyle({
                        font: bodyStyles.right.font,
                        alignment: bodyStyles.right.alignment,
                        fill: bodyStyles.right.fill,
                        numberFormat: format[data.format]
                    }));
                    break;
                }
            case 'Divide':
                {
                    switch (data.title) {
                        case 'Total Kills':
                            {
                                ws.cell(column, row)
                                .string(`${data.title}${format.defaultLayout}`)
                                .style(bodyStyles.left);
                                ws.cell(column, row + 1)
                                .formula(`${g(`${data.search.one}${weapon}`, stats)}/${g(data.search.two, stats)}`)
                                .style(wb.createStyle({
                                    font: bodyStyles.right.font,
                                    alignment: bodyStyles.right.alignment,
                                    fill: bodyStyles.right.fill,
                                    numberFormat: format[data.format]
                                }));
                                break;
                            }
                        default:
                            {
                                ws.cell(column, row)
                                .string(`${data.title}${format.defaultLayout}`)
                                .style(bodyStyles.left);
                                ws.cell(column, row + 1)
                                .formula(`${g(`${data.search.one}${weapon}`, stats)}/${g(`${data.search.two}${weapon}`, stats)}`)
                                .style(wb.createStyle({
                                    font: bodyStyles.right.font,
                                    alignment: bodyStyles.right.alignment,
                                    fill: bodyStyles.right.fill,
                                    numberFormat: format[data.format]
                                }));
                                break;
                            }
                    }
                    break;
                }
        }

    }

}
