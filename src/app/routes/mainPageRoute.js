
import Main from '../Main.js';

export default {
  getComponent (nextState, cb) {
    cb(null, Main);
  },

  getChildRoutes (partialNextState, cb) {
    cb(null, [
      require('./homeRoute.js').default,
      require('./debugRoute.js').default,
      require('./catalogRoute.js').default,
      require('./myAppsRoute.js').default,
      require('./notFoundRoute.js').default
    ]);
  }
};
