const Table = require('cli-table3')
const table = new Table({
    head:['Page', 'Status'],
    colWidths:[10, 50],
    style:{ head: ['cyan']}
})
const pageStatus = new Map();
function updatePageStatus(pageIndex, currentState) {
    const currentPageStatus = pageStatus.get(pageIndex) || []
    currentPageStatus.push(currentState)
    pageStatus.set(pageIndex, currentPageStatus)
}

function printCurrentStatus() {

    console.log('\n---------------------------------------------------------------------------------------------------')
    console.log('Current Page Status:')
    table.length = 0
    pageStatus.forEach((pageStatus, pageIndex) => {
        const statusString = pageStatus.join('->')
        table.push([`Page ${pageIndex +1}`, statusString])
    })
    console.log(table.toString())
}

module.exports = {
    updatePageStatus,
    printCurrentStatus
}