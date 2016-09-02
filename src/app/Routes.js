import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.js';
import HomePage from './HomePage.js';
import MyApps from './MyApps.js';
import Catalog from './Catalog.js';
import { Router, Route, hashHistory } from 'react-router';
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import appHub from './reducers';
import {syncHistoryWithStore} from 'react-router-redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import localForage from 'localForage';
import {deviceMiddleware} from 'local-t2-device-redux';
import {navigationCreateMiddleware} from 'local-t2-navigation-redux';
import navigationConfig from './navigationConfig';

let store = createStore(appHub,
  applyMiddleware(deviceMiddleware, navigationCreateMiddleware(navigationConfig))
  , autoRehydrate());
const history = syncHistoryWithStore(hashHistory, store);
persistStore(store);

store.subscribe(() => {
  console.log(store.getState());
});

class AppProvider extends React.Component {

  constructor () {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount () {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true });
    });
  }

  render () {
    if (!this.state.rehydrated) {
      return <div>Loading...</div>;
    }
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route component={Main}>
            {/* make them children of `App` */}
            <Route path="/" component={HomePage} />
            <Route path="/apps" component={MyApps} />
            <Route path="/catalog" component={Catalog} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default AppProvider;

