import HomePage from '../HomePage.js';
export default {
  path: '/',
  name: 'home',
  getComponent (nextState, cb) {
    cb(null, HomePage);
  }
};
