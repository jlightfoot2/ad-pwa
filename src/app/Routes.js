import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.js';
import HomePage from './HomePage.js';
import MyApps from './MyApps.js';
import Catalog from './Catalog.js';
import { Router, Route, hashHistory } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import appHub from './reducers'
import { Map } from 'immutable';

let store = createStore(appHub);
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
const Routes = () => (
	<Provider store={store}>
	  <Router history={hashHistory}>
	    <Route component={Main}>
	      {/* make them children of `App` */}
	      <Route path="/" component={HomePage} />
	      <Route path="/catalog" component={Catalog} />
          <Route path="/myapps" component={MyApps} />
	    </Route>
	  </Router>
	</Provider>
);

export default Routes