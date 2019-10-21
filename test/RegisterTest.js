const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

const badCredentials = {
    'username': 'testBad',
    'password': 'testPW2019',
    'passwordAgain': 'tetsPW2019'
}

function makeUsername(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const goodCredentials = {
    'username': makeUsername(7),
    'password': 'testPW2019',
    'passwordAgain': 'testPW2019'
}

const url = '###ENTER URL HERE###';
const enLng = '?lng=en';

describe('RegisterTest', () => {

    const driver = new Builder().forBrowser('chrome').build();

    it('should go to MeteoSalle Register page and check the title', async () => {
        await driver.get(url + enLng);
        await driver.findElement(By.id('link-button')).click();
        const title = await driver.getTitle();
        expect(title).to.equal('MeteoSalle, a community to share and consult weather data');
    });

    it('should go to MeteoSalle Register page and check the logo', async () => {
        await driver.get(url + enLng);
        await driver.findElement(By.id('link-button')).click();
        const logo = await driver.findElement(By.id('register-logo'));
        const src = await logo.getAttribute('src');
        expect(src).to.equal(url + '/static/media/logo_black.9226d933.png');
    });

    it('should go to MeteoSalle Register page and check the form title', async () => {
        await driver.get(url + enLng);
        await driver.findElement(By.id('link-button')).click();
        const title = await driver.findElement(By.id('register-title'));
        const text = await title.getText();
        expect(text).to.equal('Register');
    });

    it('should go to MeteoSalle Register page and check the form inputs', async () => {
        await driver.get(url + enLng);
        await driver.findElement(By.id('link-button')).click();
        const usernameInput = await driver.findElement(By.id('username'));
        const passwordInput = await driver.findElement(By.id('password'));
        const passwordAgainInput = await driver.findElement(By.id('password-again'));
        const usernamePlaceholder = await usernameInput.getAttribute('placeholder');
        const passwordPlaceholder = await passwordInput.getAttribute('placeholder');
        const passwordAgainPlaceholder = await passwordAgainInput.getAttribute('placeholder');
        expect(usernamePlaceholder).to.equal('Username');
        expect(passwordPlaceholder).to.equal('Password');
        expect(passwordAgainPlaceholder).to.equal('Password again');
    });

    it('should go to MeteoSalle Register page and check the error message is not visible', async () => {
        await driver.get(url + enLng);
        await driver.findElement(By.id('link-button')).click();
        const errorMessage = await driver.findElement(By.id('register-form-error'));
        const visibility = await errorMessage.getAttribute('className');
        expect(visibility).to.equal('hidden');
    });

    it('should go to MeteoSalle Register page and check the form buttons', async () => {
        await driver.get(url + enLng);
        await driver.findElement(By.id('link-button')).click();
        const registerButton = await driver.findElement(By.id('submit-button'));
        const loginLink = await driver.findElement(By.id('link-button'));
        const registerButtonText = await registerButton.getText();
        const loginLinkText = await loginLink.getText();
        expect(registerButtonText).to.equal('Register');
        expect(loginLinkText).to.equal('Login');
    });

    it('should go to MeteoSalle Register page and perform a bad Register', async () => {
        await driver.get(url + enLng);
        await driver.findElement(By.id('link-button')).click();
        await driver.findElement(By.id('username')).sendKeys(badCredentials.username);
        await driver.findElement(By.id('password')).sendKeys(badCredentials.password);
        await driver.findElement(By.id('password-again')).sendKeys(badCredentials.passwordAgain);
        await driver.findElement(By.id('submit-button')).click();
        const errorMessage = await driver.findElement(By.id('register-form-error'));
        const visibility = await errorMessage.getAttribute('className');
        expect(visibility).to.equal('redText');
    });

    it('should go to MeteoSalle Register page and perform a good Register', async () => {
        await driver.get(url + enLng);
        await driver.findElement(By.id('link-button')).click();
        await driver.findElement(By.id('username')).sendKeys(goodCredentials.username);
        await driver.findElement(By.id('password')).sendKeys(goodCredentials.password);
        await driver.findElement(By.id('password-again')).sendKeys(goodCredentials.passwordAgain);
        await driver.findElement(By.id('submit-button')).click();
        await driver.wait(until.stalenessOf(driver.findElement(By.id('spinner-img'))));
        const errorMessage = await driver.findElement(By.id('login-form-error'));
        const visibility = await errorMessage.getAttribute('className');
        expect(visibility).to.equal('greenText');
    });

    after(async () => driver.quit());

});