import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import Reducer from './reducers'
import App from './App';
import * as serviceWorker from './serviceWorker';


const store=createStore(Reducer)



ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

serviceWorker.unregister();
