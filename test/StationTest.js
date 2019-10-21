const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

const credentials = {
    'username': 'userForTesting',
    'password': 'Testing01'
}

const stationEdited = [
    'Location: Tarragona',
    'State: Barcelona',
    'Latitude: 41.2192764',
    'Longitude: 1.6937269'
]

const stationInfo = [
    'Location: Barcelona',
    'State: Barcelona',
    'Latitude: 41.2192764',
    'Longitude: 1.6937269'
]

const stationEdit = {
    'location': 'Tarragona'
}

const url = '###ENTER URL HERE###';
const enLng = '?lng=en';

describe('StationTest', () => {

    const driver = new Builder().forBrowser('chrome').build();

    it('should go to MeteoSalle Login page and check the title', async () => {
        await driver.get(url + enLng);
        await driver.findElement(By.id('username')).sendKeys(credentials.username);
        await driver.findElement(By.id('password')).sendKeys(credentials.password);
        await driver.findElement(By.id('submit-button')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const stations = await driver.findElements(By.className('station-link'));
        stations[0].click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('station-main'));
        const title = await driver.getTitle();
        expect(title).to.equal('MeteoSalle, a community to share and consult weather data');
    });

    it('should go to MeteoSalle Login page and check the info area', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const stations = await driver.findElements(By.className('station-link'));
        stations[0].click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('station-info'));
        await driver.findElement(By.id('station-info-data'));
        const userInfoLines = await driver.findElements(By.className('station-info-line'));
        expect(userInfoLines.length).to.equal(4);
    });

    it('should go to MeteoSalle Login page and check the info values', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const stations = await driver.findElements(By.className('station-link'));
        stations[0].click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.sleep(3000);
        const stationInfoLines = await driver.findElements(By.className('station-info-line'));
        for (let i = 0; i < stationInfoLines.length; i++) {
            const text = await stationInfoLines[i].getText();
            expect(text).to.equal(stationInfo[i]);
        }
    });

    it('should go to MeteoSalle User page and check the header logout cancelled', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const stations = await driver.findElements(By.className('station-link'));
        stations[0].click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.sleep(2000);
        const logout = await driver.findElement(By.id('logout-link'));
        const logoutLinkText = await logout.getText();
        expect(logoutLinkText).to.equal('Logout');
        logout.click();
        await driver.wait(until.elementLocated(By.id('confirmation-modal')));
        const logoutModal = await driver.findElement(By.id('confirmation-modal'));
        const visibility = await logoutModal.getAttribute('className');
        expect(visibility).to.equal('');
        const modalMessage = await driver.findElement(By.id('modal-message'));
        const modalMessageText = await modalMessage.getText();
        expect(modalMessageText).to.equal('Are you sure you want to log out?');
        await driver.findElement(By.id('cancel-button')).click();
    });

    it('should go to MeteoSalle User page and check the header logout confirmed', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const stations = await driver.findElements(By.className('station-link'));
        stations[0].click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.sleep(2000);
        const logout = await driver.findElement(By.id('logout-link'));
        logout.click();
        await driver.wait(until.elementLocated(By.id('confirmation-modal')));
        await driver.findElement(By.id('red-button')).click();
        const loginTitle = await driver.findElement(By.id('login-title'));
        const text = await loginTitle.getText();
        expect(text).to.equal('Login');
        await driver.findElement(By.id('username')).sendKeys(credentials.username);
        await driver.findElement(By.id('password')).sendKeys(credentials.password);
        await driver.findElement(By.id('submit-button')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
    });

    it('should go to MeteoSalle User page and check the station header', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const stations = await driver.findElements(By.className('station-link'));
        stations[0].click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.sleep(2000);
        await driver.findElement(By.id('station-data-header'));
        const stationHeaderTitle = await driver.findElement(By.id('station-data-title'));
        const addRegisterButton = await driver.findElement(By.id('add-register-button'));
        const addRegisterButtonText = await addRegisterButton.getText();
        expect(addRegisterButtonText).to.equal('Add register');
    });

    it('should go to MeteoSalle User page and check the station body', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const stations = await driver.findElements(By.className('station-link'));
        stations[0].click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.sleep(2000);
        await driver.findElement(By.id('station-data-body'));
        await driver.findElement(By.id('station-tables'));
        await driver.findElement(By.id('station-charts'));
    });

    it('should go to MeteoSalle User page and check the user edition cancelled', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const stations = await driver.findElements(By.className('station-link'));
        stations[0].click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.sleep(2000);
        const editButton = await driver.findElement(By.id('edit-station-button'));
        const editButtonText = await editButton.getText();
        expect(editButtonText).to.equal('Edit');
        editButton.click();
        await driver.wait(until.elementLocated(By.id('form-modal')));
        const editModal = await driver.findElement(By.id('form-modal'));
        const visibility = await editModal.getAttribute('className');
        await driver.findElement(By.id('close-button')).click();
    });

    it('should go to MeteoSalle User page and check the user edition confirmed', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const stations = await driver.findElements(By.className('station-link'));
        stations[0].click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.sleep(2000);
        const editButton = await driver.findElement(By.id('edit-station-button'));
        editButton.click();
        await driver.wait(until.elementLocated(By.id('form-modal')));
        await driver.findElement(By.id('Location')).clear();
        await driver.findElement(By.id('Location')).sendKeys(stationEdit.location);
        await driver.findElement(By.id('green-button')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const stationInfoLines = await driver.findElements(By.className('station-info-line'));
        for (let i = 0; i < stationInfoLines.length; i++) {
            const text = await stationInfoLines[i].getText();
            expect(text).to.equal(stationEdited[i]);
        }
    });

    it('should go to MeteoSalle User page and check the station deletion cancelled', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const stations = await driver.findElements(By.className('station-link'));
        stations[0].click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.sleep(2000);
        const deleteButton = await driver.findElement(By.id('delete-station-button'));
        const deleteButtonText = await deleteButton.getText();
        expect(deleteButtonText).to.equal('Delete');
        deleteButton.click();
        await driver.wait(until.elementLocated(By.id('confirmation-modal')));
        const deleteModal = await driver.findElement(By.id('confirmation-modal'));
        const visibility = await deleteModal.getAttribute('className');
        expect(visibility).to.equal('');
        const modalMessage = await driver.findElement(By.id('modal-message'));
        const modalMessageText = await modalMessage.getText();
        expect(modalMessageText).to.equal('Are you sure you want to delete the station?');
        await driver.findElement(By.id('cancel-button')).click();
    });

    it('should go to MeteoSalle User page and check the station deletion confirmed', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const stations = await driver.findElements(By.className('station-link'));
        stations[0].click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.sleep(2000);
        const deleteButton = await driver.findElement(By.id('delete-station-button'));
        deleteButton.click();
        await driver.wait(until.elementLocated(By.id('confirmation-modal')));
        await driver.findElement(By.id('red-button')).click();
    });

    after(async () => driver.quit());

});