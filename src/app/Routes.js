import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.js';
import HomePage from './HomePage.js';
import Prescriptions from './Prescriptions.js';

import { Router, Route, hashHistory } from 'react-router'

const Routes = () => (
	  <Router history={hashHistory}>
	    <Route component={Main}>
	      {/* make them children of `App` */}
	      <Route path="/" component={HomePage} />
	      <Route path="/scripts" component={Prescriptions} />

	    </Route>
	  </Router>
);

export default Routes