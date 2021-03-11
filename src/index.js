import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import {createStore} from "redux";
import reducers from './reducers/index'
import middlewares from "./middlewares";
import {Provider} from 'react-redux'

const store = createStore(reducers, middlewares)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'))
