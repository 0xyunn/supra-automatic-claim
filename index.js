const puppeteer = require('puppeteer')
const { performClickActions } = require('./chrome_advanced_puppeteer')
const { browserSettings, url, clickActions, emails} = require('./frontend')
const {printCurrentStatus} = require("./monitor");

async function startMultipleBrowsers(browserSettings) {
    let browsers
    try {
        browsers = await Promise.all(browserSettings.map(async (browserSetting) => {
            return await puppeteer.launch({
                userDataDir: browserSetting.userDataDir,
            });
        }))
        const pages = await Promise.all(browsers.map(async (browser, index) => {
            const page = await browser.newPage();
            await page.goto(url, {waitUntil: 'networkidle2'})
            console.log(`start to perform action on window ${index + 1}`);
            return page
        }))
        await Promise.all(pages.map(async (page, index) => {
            await performClickActions(page, clickActions(emails[index]))
            console.log(`finished to perform action on window ${index + 1}`);
        }))
    } catch (error) {
        console.error(`Error:`, error)
    } finally {
        (browsers.map(browser => {
            if (browser) {
                browser.quit()
            }
        }))
    }
}

setInterval(() => {
    printCurrentStatus()
}, 5000)

startMultipleBrowsers(browserSettings)
    .then(() => console.log(`All action completed`))
    .catch((error) => console.error(`Error occurred:`, error))