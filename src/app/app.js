(function() {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/ad-service-worker.js');
  }
})();
import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from './Routes'; // Our custom react component
import "./reducers";
import '../www/manifest.json';
import '../www/untitled.json';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(<Routes />, document.getElementById('app'));
