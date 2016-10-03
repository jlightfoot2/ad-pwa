import MyApps from '../MyApps';
export default {
  path: '/apps',
  name: 'apps',
  getComponent (nextState, cb) {
    cb(null, MyApps);
  }
};
