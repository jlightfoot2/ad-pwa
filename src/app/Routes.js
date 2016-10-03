import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage.js';
import MyApps from './MyApps.js';
import Catalog from './Catalog.js';
import BlankPage from './BlankPage.js';
import HomeRoute from './routes/homeRoute.js';
import SplashPage from './SplashPage.js';
import { Router, Route, hashHistory, browserHistory } from 'react-router';

import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import appHub, {appItems} from './reducers';
import {persistStore, autoRehydrate} from 'redux-persist';
import {deviceMiddleware} from 'local-t2-device-redux';
import {navigationCreateMiddleware} from 'local-t2-navigation-redux';
import navigationConfig from './navigationConfig';
import createMigration from 'redux-persist-migrate';
import {registerPromise} from 'local-t2-app-redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

const manifest = {
  22: (state) => ({...state, t2AppIds: undefined}),
  26: (state) => ({...state, apps: undefined}),
  9001: (state) => ({...state, navigation: undefined}),
};

// reducerKey is the key of the reducer you want to store the state version in
// in this example after migrations run `state.app.version` will equal `2`
let reducerKey = 'migrations';
const migration = createMigration(manifest, reducerKey);
const persistEnhancer = compose(migration, autoRehydrate());

let store = createStore(appHub,
  applyMiddleware(routerMiddleware(browserHistory), deviceMiddleware, navigationCreateMiddleware(navigationConfig))
  , persistEnhancer);

const history = syncHistoryWithStore(hashHistory, store);

if (__INCLUDE_SERVICE_WORKER__) {
  if ('serviceWorker' in navigator) {
    const registrationPromise = navigator.serviceWorker.register('./ad-service-worker.js');
    registerPromise(registrationPromise, store).then(function (res) {
      if (__DEVTOOLS__) {
        console.log(res);
      }
    }).catch(function (e) {
      if (__DEVTOOLS__) {
        console.log(e);
      }
      throw e;
    });
  }
}

if (__DEVTOOLS__) {
  store.subscribe(() => {
    console.log(store.getState());
  });
}
const rootRoute = [
  {
    getComponent (nextState, cb) {
      cb(null, BlankPage);
    },
    name: 'root',
    childRoutes: [
      require('./routes/mainPageRoute.js').default
    ]
  }
];
class AppProvider extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.state = { rehydrated: false };
  }

  componentWillMount () {
    persistStore(store, {keyPrefix: 'reduxPresistT2Hub'}, () => {
      setTimeout(() => {
        this.setState({ rehydrated: true });
      }, 2000);
    });
  }

  render () {
    if (!this.state.rehydrated) {
      return <BlankPage><SplashPage/></BlankPage>;
    }
    return (
      <Provider store={store}>
        <Router history={history} routes={rootRoute} />
      </Provider>
    );
  }
}

export default AppProvider;

