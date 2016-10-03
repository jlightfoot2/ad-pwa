import Catalog from '../Catalog';

export default {
  path: '/catalog',
  name: 'catalog',
  getComponent (nextState, cb) {
    cb(null, Catalog);
  }
};
