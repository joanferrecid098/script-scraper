const writeDialogue = require('./write.js');
const { chromium } = require('playwright');

/* Changable variables */
var mission = "Nervous_Ron";

/* Line parsing */
const parseLine = (text) => {
    const lineParts = text.split(':');
    const character = lineParts[0];

    lineParts.shift();
    const line = lineParts.join(':').substr(1);

    return {
        character,
        line
    }
}

/* Web scriping */
(async() => {

    let title = "";
    let lines = [];

    const browser = await chromium.launch({
        headless: true,
    });
    
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(`https://www.grandtheftwiki.com/${mission}/Script`)

    const getTitle = await page.evaluate(() => {
        const item = document.querySelector('.mw-page-title-main').innerHTML;

        return item;
    });

    title = getTitle.split("/")[0];

    const getLines = await page.evaluate(() => {
        let lines = [];

        const items = document.querySelectorAll('.mw-parser-output p');

        for (let item of items) {
            if (!item.innerHTML.startsWith("<i>"))
            if (!item.innerHTML.startsWith("Or:"))
            if (!item.innerHTML.startsWith("("))

            lines.push(item.innerHTML
                .replace("<b>", "")
                .replace("</b>", "")
                .replace("<i>", "")
                .replace("</i>", "")
                .replace("\n", ""));
        }

        return lines;
    });
    
    getLines.shift();
    for (let line of getLines) {
        lines.push(parseLine(line));
    }

    writeDialogue({
        title,
        lines,
    });

})();

