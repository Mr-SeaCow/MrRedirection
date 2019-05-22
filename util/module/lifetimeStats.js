const { lifetime } = require('./data.json');
const { headerStart, headerHeight, columnStart } = require('./constants.js')
const { g } = require('./util.js')

const belowHeader = headerHeight + 1;

module.exports.run = (wb, ws, stats, bodyStyles, format) => {
    let dataRightColCount = belowHeader + 1
    let rightColStart = columnStart + 4
    let dataLeftColCount = belowHeader + 1
    let leftColStart = columnStart + 1
    ws.cell(headerStart, columnStart, headerHeight, columnStart + 6, true)
        .string('Lifetime Stats')
        .style(bodyStyles.header)

    ws.column(leftColStart).setWidth(17)
    ws.column(rightColStart).setWidth(17)

    for (const data of lifetime.left) {
        addRow(ws, bodyStyles, leftColStart, dataLeftColCount, data)
        dataLeftColCount++
    }
    for (const data of lifetime.right) {
        addRow(ws, bodyStyles, rightColStart, dataRightColCount, data)
        dataRightColCount++
    }

    function addRow(ws, bodyStyles, row, column, data) {
        switch (data.type) {
            case 'Number':
                {
                    ws.cell(column, row)
                    .string(`${data.title}${format.defaultLayout}`)
                    .style(bodyStyles.left);
                    ws.cell(column, row + 1)
                    .number(g(data.search.one, stats))
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
                    ws.cell(column, row)
                    .string(`${data.title}${format.defaultLayout}`)
                    .style(bodyStyles.left);
                    ws.cell(column, row + 1)
                    .formula(`${g(data.search.one, stats)}/${g(data.search.two, stats)}`)
                    .style(wb.createStyle({
                        font: bodyStyles.right.font,
                        alignment: bodyStyles.right.alignment,
                        fill: bodyStyles.right.fill,
                        numberFormat: format[data.format]
                    }));
                    break;
                }
        }

    }

    const dataHeight = (dataRightColCount > dataLeftColCount ? dataRightColCount : dataLeftColCount)

    ws.cell(belowHeader, columnStart, belowHeader, columnStart + 6, true)
        .style(bodyStyles.empty);
    ws.cell(belowHeader + 1, columnStart, dataHeight - 1, columnStart, true)
        .style(bodyStyles.empty);
    ws.cell(belowHeader + 1, columnStart + 3, dataHeight - 1, columnStart + 3, true)
        .style(bodyStyles.empty);
    ws.cell(belowHeader + 1, columnStart + 6, dataHeight - 1, columnStart + 6, true)
        .style(bodyStyles.empty);
    ws.cell(dataHeight, columnStart, dataHeight, columnStart + 6, true)
        .style(bodyStyles.empty);
    if (dataRightColCount > dataLeftColCount) {
        ws.cell(dataHeight - (dataRightColCount - dataLeftColCount), leftColStart, dataHeight - 1, leftColStart + 1, true)
            .style(bodyStyles.empty);
    }
    else if (dataRightColCount < dataLeftColCount) {
        ws.cell(dataHeight - (dataLeftColCount - dataRightColCount), rightColStart, dataHeight - 1, rightColStart + 1, true)
            .style(bodyStyles.empty);
    }
}
