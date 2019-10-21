# MeteoSalle

MeteoSalle is a web application to share and consult weather data. Users can create and request stations, which are displayed in a map taking their location coordinates. Also, some stations provide weather forecasts and their historic can be consulted too.

This project is splitted in three different layers, and this repository only contains the code regarding to the Front-end side, which is a [React App](https://reactjs.org/docs/create-a-new-react-app.html) style implemented with [React](https://reactjs.org/) and [Redux](https://redux.js.org/).

## Project structure

1. _public_: Base _index.html_ file with a single _root_ element and the generic _styles.css_ file.

2. _src_: Main code folder:

* _actions_: Set of Redux actions is defined here.
* _api_: API calls are placed here and separated by domain issue. 
* _components_: The core app implementation. The React components are separated into folders each one representing the four main app screens (Authentication, Home, User and Station) plus the modal windows. 
* _reducers_: Set of Redux stores is defined here.
* _resources_: Basically the set of images used by the app. 
* _utils_: Several files containing multi-used functions and behaviors through the app, regarding different aspects.

3. _test_: Test sets, one for each application screen. Implemented with [Selenium WebDriver](https://www.seleniumhq.org/projects/webdriver/) plus helper libraries such as [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).

4. _.gitignore_: List of files/folders not to be included in the shared repo.

5. _package.json_: Manifest file where all the project specs, dependencies and scrips are defined.

6. _README.md_: This explaining file.

## To run

```bash
git clone #repositoryName#
```
```bash
cd #repositoryName#
```
```bash
npm install
```
Once the dependencies are installed, edit file _src/utils/config_:
```javascript
export const params = {
    middleApiIp: /* INSERT THE POINTING MIDDLEWARE IP */,
    googleKey: /* INSERT A GOOGLE MAPS API KEY */
}
```
To run the project:
```bash
npm run start
```
If you want to get a production build to deploy it on some server, just do:
```bash
npm run build
```
If you want to run some test, edit the _package.json_ script line to point to a file and do:
```bash
npm run test
```


