import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.js';
import HomePage from './HomePage.js';
import MyApps from './MyApps.js';
import Catalog from './Catalog.js';
import { Router, Route, hashHistory } from 'react-router';
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import appHub, {appItems} from './reducers';
import {syncHistoryWithStore} from 'react-router-redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import {deviceMiddleware} from 'local-t2-device-redux';
import {navigationCreateMiddleware} from 'local-t2-navigation-redux';
import navigationConfig from './navigationConfig';
import createMigration from 'redux-persist-migrate';

/**
 * Register/Manage service worker
 *
 */

(function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./ad-service-worker.js').then(function (reg) {
      reg.onupdatefound = function () {
        // The updatefound event implies that reg.installing is set; see
        // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
        var installingWorker = reg.installing;

        installingWorker.onstatechange = function () {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // At this point, the old content will have been purged and the fresh content will
                // have been added to the cache.
                // It's the perfect time to display a 'New content is available; please refresh.'
                // message in the page's interface.
                console.log('New or updated content is available.');
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a 'Content is cached for offline use.' message.
                console.log('Content is now available offline!');
              }
              break;

            case 'redundant':
              console.error('The installing service worker became redundant.');
              break;
          }
        };
      };
    }).catch(function (e) {
      console.error('Error during service worker registration:', e);
    });
  }
})();

const manifest = {
  22: (state) => ({...state, t2AppIds: undefined}),
  26: (state) => ({...state, apps: undefined})
};

// reducerKey is the key of the reducer you want to store the state version in
// in this example after migrations run `state.app.version` will equal `2`
let reducerKey = 'migrations';
const migration = createMigration(manifest, reducerKey);
const persistEnhancer = compose(migration, autoRehydrate());

let store = createStore(appHub,
  applyMiddleware(deviceMiddleware, navigationCreateMiddleware(navigationConfig))
  , persistEnhancer);
const history = syncHistoryWithStore(hashHistory, store);

store.subscribe(() => {
  console.log(store.getState());
});

class AppProvider extends React.Component {

  constructor () {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount () {
    persistStore(store, {keyPrefix: 'reduxPresistAd'}, () => {
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

