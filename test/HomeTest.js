const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

const credentials = {
    'username': 'userForTesting',
    'password': 'Testing01'
}


const url = '###ENTER URL HERE###';
const enLng = '?lng=en';

describe('HomeTest', () => {

    const driver = new Builder().forBrowser('chrome').build();

    it('should go to MeteoSalle Home page and check the title', async () => {
        await driver.get(url + enLng);
        await driver.findElement(By.id('username')).sendKeys(credentials.username);
        await driver.findElement(By.id('password')).sendKeys(credentials.password);
        await driver.findElement(By.id('submit-button')).click();
        await driver.wait(until.stalenessOf(driver.findElement(By.id('spinner-img'))));
        await driver.findElement(By.id('main'));
        const title = await driver.getTitle();
        expect(title).to.equal('MeteoSalle, a community to share and consult weather data');
    });

    it('should go to MeteoSalle Home page and check the header logo', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const logo = await driver.findElement(By.id('header-logo'));
        const src = await logo.getAttribute('src');
        expect(src).to.equal(url + '/static/media/logo_white.7daafb0f.png');
    });

    it('should go to MeteoSalle Home page and check the header username', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.stalenessOf(driver.findElement(By.id('spinner-img'))));
        await driver.wait(until.elementLocated(By.id('user-link')));
    });

    it('should go to MeteoSalle Home page and check the map', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.stalenessOf(driver.findElement(By.id('spinner-img'))));
        await driver.findElement(By.id('main-map'));
    });

    it('should go to MeteoSalle Home page and check the list header', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.stalenessOf(driver.findElement(By.id('spinner-img'))));
        await driver.findElement(By.id('main-list'));
        await driver.findElement(By.id('main-stations-list-header'));
    });

    it('should go to MeteoSalle Home page and check the list', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.stalenessOf(driver.findElement(By.id('spinner-img'))));
        await driver.findElement(By.id('main-stations-list-header'));
        await driver.findElement(By.id('list-wrapper'));
    });

    it('should go to MeteoSalle Home page and check the footer links', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.stalenessOf(driver.findElement(By.id('spinner-img'))));
        await driver.findElement(By.id('footer'));
        const laSalleLinks = await driver.findElements(By.className('footer-link'));
        expect(laSalleLinks.length).to.equal(4);
    });

    after(async () => driver.quit());

});