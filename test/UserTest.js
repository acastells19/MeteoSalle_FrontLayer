const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

const credentials = {
    'username': 'userForTesting',
    'password': 'Testing01'
}

const userInfo = [
    'Name: userForTesting',
    'Gender: Other',
    'Age: 25',
]

const userEdited = [
    'Name: userForTesting',
    'Gender: Other',
    'Age: 28'
]

const userEdit = {
    age: 28
}

const newStation = {
    'latitude': '41.2192764',
    'longitude': '1.6937269',
    'location': 'Barcelona',
    'state': 'Barcelona',
    'zip': '08001'
}

const url = '###ENTER URL HERE###';
const enLng = '?lng=en';

describe('UserTest', () => {

    const driver = new Builder().forBrowser('chrome').build();

    it('should go to MeteoSalle User page and check the title', async () => {
        await driver.get(url + enLng);
        await driver.findElement(By.id('username')).sendKeys(credentials.username);
        await driver.findElement(By.id('password')).sendKeys(credentials.password);
        await driver.findElement(By.id('submit-button')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-main'));
        const title = await driver.getTitle();
        expect(title).to.equal('MeteoSalle, a community to share and consult weather data');
    });

    it('should go to MeteoSalle User page and check the info area', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-info'));
        await driver.findElement(By.id('user-profile-image'));
        await driver.findElement(By.id('user-info-data'));
        const userInfoLines = await driver.findElements(By.className('user-info-line'));
        expect(userInfoLines.length).to.equal(3);
        await driver.findElement(By.id('user-info-actions'));
    });

    it('should go to MeteoSalle User page and check the info values', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const profileImage = await driver.findElement(By.id('profile-image'));
        const profileImageSrc = await profileImage.getAttribute('src');
        expect(profileImageSrc).to.equal(url + '/static/media/no-gender-avatar.356f17df.png');
        const userInfoLines = await driver.findElements(By.className('user-info-line'));
        for (let i = 0; i < userInfoLines.length; i++) {
            const text = await userInfoLines[i].getText();
            expect(text).to.equal(userInfo[i]);
        }
    });

    it('should go to MeteoSalle User page and check the header logout cancelled', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
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

    it('should go to MeteoSalle User page and check the stations list header', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('stations-list-header'));
        const stationsListTitle = await driver.findElement(By.id('stations-list-title'));
        const stationsListTitleText = await stationsListTitle.getText();
        expect(stationsListTitleText).to.equal('Stations');
        const newStationButton = await driver.findElement(By.id('new-station-button'));
        const newStationButtonText = await newStationButton.getText();
        expect(newStationButtonText).to.equal('New station');
    });

    it('should go to MeteoSalle User page and check the stations list items', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('stations-list'));
        const listItems = await driver.findElements(By.className('station-link'));
        expect(listItems.length).to.equal(1);
    });

    it('should go to MeteoSalle User page and check the user deletion cancelled', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const deleteButton = await driver.findElement(By.id('delete-user-button'));
        const deleteButtonText = await deleteButton.getText();
        expect(deleteButtonText).to.equal('Delete');
        deleteButton.click();
        await driver.wait(until.elementLocated(By.id('confirmation-modal')));
        const deleteModal = await driver.findElement(By.id('confirmation-modal'));
        const visibility = await deleteModal.getAttribute('className');
        expect(visibility).to.equal('');
        const modalMessage = await driver.findElement(By.id('modal-message'));
        const modalMessageText = await modalMessage.getText();
        expect(modalMessageText).to.equal('Are you sure you want to delete your account? Your stations will be deleted too');
        await driver.findElement(By.id('cancel-button')).click();
    });

    it('should go to MeteoSalle User page and check the user edition cancelled', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const editButton = await driver.findElement(By.id('edit-user-button'));
        const editButtonText = await editButton.getText();
        expect(editButtonText).to.equal('Edit');
        editButton.click();
        await driver.wait(until.elementLocated(By.id('form-modal')));
        const editModal = await driver.findElement(By.id('form-modal'));
        const visibility = await editModal.getAttribute('className');
        expect(visibility).to.equal('');
        await driver.findElement(By.id('close-button')).click();
    });

    it('should go to MeteoSalle User page and check the user edition confirmed', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const editButton = await driver.findElement(By.id('edit-user-button'));
        editButton.click();
        await driver.wait(until.elementLocated(By.id('form-modal')));
        await driver.findElement(By.id('Age')).clear();
        await driver.findElement(By.id('Age')).sendKeys(userEdit.age);
        await driver.findElement(By.id('green-button')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const userInfoLines = await driver.findElements(By.className('user-info-line'));
        for (let i = 0; i < userInfoLines.length; i++) {
            const text = await userInfoLines[i].getText();
            expect(text).to.equal(userEdited[i]);
        }
    });

    it('should go to MeteoSalle User page and check the new station cancelled', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const newStationButton = await driver.findElement(By.id('new-station-button'));
        const newStationButtonText = await newStationButton.getText();
        expect(newStationButtonText).to.equal('New station');
        newStationButton.click();
        await driver.wait(until.elementLocated(By.id('form-modal')));
        const editModal = await driver.findElement(By.id('form-modal'));
        await driver.findElement(By.id('close-button')).click();
    });

    it('should go to MeteoSalle User page and check the new station confirmed', async () => {
        await driver.get(url + enLng);
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        await driver.findElement(By.id('user-link')).click();
        await driver.wait(until.elementLocated(By.className('spinner-hidden')));
        const newStationButton = await driver.findElement(By.id('new-station-button'));
        newStationButton.click();
        await driver.wait(until.elementLocated(By.id('form-modal')));
        await driver.findElement(By.id('Latitude')).sendKeys(newStation.latitude);
        await driver.findElement(By.id('Longitude')).sendKeys(newStation.longitude);
        await driver.findElement(By.id('Location')).sendKeys(newStation.location);
        await driver.findElement(By.id('State')).sendKeys(newStation.state);
        await driver.findElement(By.id('Zip')).sendKeys(newStation.zip);
        await driver.findElement(By.id('green-button')).click();
    });

    after(async () => driver.quit());

});