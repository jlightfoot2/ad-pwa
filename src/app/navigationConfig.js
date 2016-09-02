export default {
  '1': {
    id: '1',
    name: 'Intro',
    routes: ['/'],
    pathname: '/',
    level: 0,
    childrenIds: [],
    parentId: null
  },
  '2': {
    id: '2',
    name: 'Home',
    routes: ['/apps'],
    level: 0,
    pathname: '/apps',
    childrenIds: ['3'],
    parentId: null

  },
  '3': {
    id: '3',
    name: 'Catalog',
    routes: ['/catalog'],
    level: 1,
    pathname: '/catalog',
    childrenIds: [],
    parentId: null
  }
};
