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

import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from './Routes'; // Our custom react component
import './reducers';
require('file?name=manifest.json!json-file!json!../www/manifest.json');
require('../www/index.html');
require('../www/main.css');
require('../images/icons/star_144.png');
require('../images/icons/star_152.png');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(<Routes />, document.getElementById('app'));
