/**
 * Created by Oskar on 15.10.17.
 */

import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter, routerMiddleware } from 'react-router-redux';

import {CentProvider} from 'react-cent'
import getCentrifugeConfig from 'utils/centrifugeConfig'

import App from './components2/App';
import initStore from './utils/store';

const history = createHistory();
const middleware = routerMiddleware(history);

ReactDOM.render(
    <Provider store={ initStore([middleware]) }>
        <CentProvider config={getCentrifugeConfig()}>
            <ConnectedRouter history={ history }>
                <App />
            </ConnectedRouter>
        </CentProvider>
    </Provider>,
    document.getElementById('root'),
);
