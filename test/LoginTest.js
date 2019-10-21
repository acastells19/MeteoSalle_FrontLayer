const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

const badCredentials = {
    'username': 'test',
    'password': 'testPW2019'
}

const goodCredentials = {
    'username': 'userForTesting',
    'password': 'Testing01'
}

const url = '###ENTER URL HERE###';
const enLng = '?lng=en';

describe('LoginTest', () => {

    const driver = new Builder().forBrowser('chrome').build();
    
    it('should go to MeteoSalle Login page and check the title', async () => {
        await driver.get(url + enLng);
        const title = await driver.getTitle();
        expect(title).to.equal('MeteoSalle, a community to share and consult weather data');
    });

    it('should go to MeteoSalle Login page and check the logo', async () => {
        await driver.get(url + enLng);
        const logo = await driver.findElement(By.id('login-logo'));
        const src = await logo.getAttribute('src');
        expect(src).to.equal(url + '/static/media/logo_black.9226d933.png');
    });

    it('should go to MeteoSalle Login page and check the form title', async () => {
        await driver.get(url + enLng);
        const title = await driver.findElement(By.id('login-title'));
        const text = await title.getText();
        expect(text).to.equal('Login');
    });

    it('should go to MeteoSalle Login page and check the form inputs', async () => {
        await driver.get(url + enLng);
        const usernameInput = await driver.findElement(By.id('username'));
        const passwordInput = await driver.findElement(By.id('password'));
        const usernamePlaceholder = await usernameInput.getAttribute('placeholder');
        const passwordPlaceholder = await passwordInput.getAttribute('placeholder');
        expect(usernamePlaceholder).to.equal('Username');
        expect(passwordPlaceholder).to.equal('Password');
    });

    it('should go to MeteoSalle Login page and check the error message is not visible', async () => {
        await driver.get(url + enLng);
        const errorMessage = await driver.findElement(By.id('login-form-error'));
        const visibility = await errorMessage.getAttribute('className');
        expect(visibility).to.equal('hidden');
    });

    it('should go to MeteoSalle Login page and check the form buttons', async () => {
        await driver.get(url + enLng);
        const loginButton = await driver.findElement(By.id('submit-button'));
        const registerLink = await driver.findElement(By.id('link-button'));
        const loginButtonText = await loginButton.getText();
        const registerLinkText = await registerLink.getText();
        expect(loginButtonText).to.equal('Login');
        expect(registerLinkText).to.equal('Register');
    });

    it('should go to MeteoSalle Login page and perform a bad Login', async () => {
        await driver.get(url + enLng);
        await driver.findElement(By.id('username')).sendKeys(badCredentials.username);
        await driver.findElement(By.id('password')).sendKeys(badCredentials.password);
        await driver.findElement(By.id('submit-button')).click();
        await driver.wait(until.stalenessOf(driver.findElement(By.id('spinner-img'))));
        const errorMessage = await driver.findElement(By.id('login-form-error'));
        const visibility = await errorMessage.getAttribute('className');
        expect(visibility).to.equal('redText');
    });

    it('should go to MeteoSalle Login page and perform a good Login', async () => {
        await driver.get(url + enLng);
        await driver.findElement(By.id('username')).sendKeys(goodCredentials.username);
        await driver.findElement(By.id('password')).sendKeys(goodCredentials.password);
        await driver.findElement(By.id('submit-button')).click();
        await driver.wait(until.stalenessOf(driver.findElement(By.id('spinner-img'))));
        await driver.wait(until.elementLocated(By.id('user-link')));
    });

    after(async () => driver.quit());

});