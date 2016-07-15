(function() {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./ad-service-worker.js');
  }
})();
import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from './Routes'; // Our custom react component
import "./reducers";
var manifest = require("file?name=manifest.json!json-file!json!./manifest.json");

//console.log(manifest);
//require("file!/Users/jack.lightfoot/Documents/projects/innovations/progressivewebapps/webpack-material-ui/src/images/icons/icon-128x128.pngd")

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(<Routes />, document.getElementById('app'));
