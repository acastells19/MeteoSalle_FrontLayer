import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Root from './components/Root'
import rootReducer from './reducers'
import './i18n';

export const store = createStore(rootReducer)

render(
  <Provider store={store}>
  	<BrowserRouter>
    	<Root />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
