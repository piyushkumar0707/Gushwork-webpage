const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname)));

const server = app.listen(3000, async () => {
    console.log('Server started on port 3000');
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle2' });
    
    // Scroll down past the hero to trigger sticky bar
    await page.evaluate(() => {
        window.scrollTo(0, 1500);
    });
    
    // Wait for animation
    await new Promise(r => setTimeout(r, 600));
    
    // Screenshot only the viewport to see the sticky nav
    await page.screenshot({ path: 'local-screenshot-scrolled.png', fullPage: false });
    console.log('Screenshot saved to local-screenshot-scrolled.png');
    
    await browser.close();
    server.close();
});
