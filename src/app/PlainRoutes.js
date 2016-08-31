import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.js';
import HomePage from './HomePage.js';
import MainTabs from './MainTabs.js';
import MyApps from './MyApps.js';
import Catalog from './Catalog.js';
import { Router, Route, hashHistory } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import appHub from './reducers'
import { Map } from 'immutable';
import { userSeesIntro } from './actions';
import { syncHistoryWithStore} from 'react-router-redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import localForage from 'localForage'


let store = createStore(appHub,undefined,autoRehydrate());
const history = syncHistoryWithStore(hashHistory, store);
persistStore(store);

var storeObserver = function(store, selector, onChange) {
    if (!store) throw Error('\'store\' should be truthy');
    if (!selector) throw Error('\'selector\' should be truthy');
    var currentValue = null;
    store.subscribe(() => {
    	console.log(store.getState());
        let previousValue = currentValue;
        try {
            currentValue = selector(store.getState());
        }
        catch(ex) {
            // the selector could not get the value. Maybe because of a null reference. Let's assume undefined
            currentValue = undefined;
        }
        if (previousValue !== currentValue) {
            onChange(store, previousValue, currentValue);
        }
    });
}
storeObserver (
			store,
			(state) => {
				return state.user.stage === 0 && state.routing.locationBeforeTransitions.pathname === '/intro'
			},
			(store, previousValue, currentValue) => {
					store.dispatch(userSeesIntro());
			}
		);
/*
let unsubscribe = store.subscribe(() => {
  		console.log(store.getState())
  		var  hasSeen = false
  		if(!hasSeen && store.getState().routing.locationBeforeTransitions.pathname === '/intro'){
  			console.log('intro is seen');
  			store.dispatch(userSeesIntro());
  			hasSeen = true;
  		}
	}
)
 */



function requireIntro(nextState, replace) {
  switch(store.getState().user.stage){
    case 0:
      replace({
        pathname: '/splash',
        state: { nextPathname: nextState.location.pathname }
      });
      break;
    case 1:
      replace({
        pathname: '/intro',
        state: { nextPathname: nextState.location.pathname }
      });
      break;
  }
}

const rootRoute = [
  {
    getComponent (nextState, cb) {
      cb(null, BlankPage);
    },
    childRoutes: [
      require('./routes/quickLoadRoute.js').default,
      require('./routes/mainPageRoute.js').default
    ]
  }
];

export default class AppProvider extends React.Component {

  constructor () {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount () {
    persistStore(store, {}, () => {
      setTimeout(() => {
        this.setState({ rehydrated: true });
      }, 1000);
    });
  }
  componentDidMount () {
    setTimeout(() => {
      console.log(window.innerWidth, window.innerHeight);
      //windowResize(window.innerWidth, window.innerHeight);
    }, 500);
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
