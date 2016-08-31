import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import {deviceReducer} from '../lib/device';

import {
  ADD_T2APP_TO_MYAPPS_LIST,
  REMOVE_T2APP_FROM_MYAPPS_LIST,
  TOGGLE_T2APP_FROM_MYAPPS_LIST,
  USER_SEES_INTRO,
  USER_SEES_SPLASH,
  SHOW_FLASH_MESSAGE,
  HIDE_FLASH_MESSAGE,
  TAB_CHANGE_INDEX
} from '../actions';
import { normalize, Schema, arrayOf } from 'normalizr';

const appitem = new Schema('appitems');

appitem.define({

});

/*
* This is default view data which germane to the app ui only
* and should be kept separate from rest of the state.
*/
const defaultView = {
  flash: {
    message: '',
    open: false
  },
  tabs: {
    mainTab: 0
  }
};

/*
* The data below could come from a rest server
*/
const defaultApps = [
  {
    id: 1,
    img: require('../../images/ad_injury_topics_lg.png'),
    title: 'Physical Injuries',
    author: 'T2',
    url: 'https://google.com',
    installed: false
  },
  {
    id: 2,
    img: require('../../images/intro-pts.png'),
    title: 'PTS',
    author: 'T2',
    url: 'https://jlightfoot2.github.io/ad-pts-pwa/build/',
    installed: false
  },
  {
    id: 3,
    img: require('../../images/ad_tobacco_topics_lg.png'),
    title: 'Tobacco',
    author: 'T2',
    url: 'https://google.com',
    installed: false
  },
  {
    id: 4,
    img: require('../../images/lg-icon-b2r_3.png'),
    title: 'Breath to Relax',
    author: 'T2',
    url: 'https://google.com',
    installed: false
  }
];

/**
 * The root of this apps state
 * @type {Object}
 */
const appTree = {
  apps: defaultApps
};

/*
* normalize function (below) will flatten hierarchical/nested data which is
* the recommended way to handle data with redux
* see https://github.com/paularmstrong/normalizr
* see http://stackoverflow.com/questions/32135779/updating-nested-data-in-redux-store    (scroll to dan abramov's answer)
*/
var t2apps = normalize(appTree.apps, arrayOf(appitem));

const appItems = t2apps.entities.appitems;

const initT2AppIds = t2apps.result;
const initMyAppIds = [];

/**
 * Below are convenience functions to prevent mutations
 */

/**
 * Update object/Map member and
 *
 * @return object A new object representing the new state
 */

function updateMapItem (state, id, cb) {
  var item = state[id + ''];

  state[id + ''] = {...cb(null, item)};
  return {...state};
}

function arrayHasItem (arr, val) {
  return arr.indexOf(val) > -1;
}

/**
 * Adds an item to an array and returns a new array
 * @param  Array arr the current array
 * @param  Any val The new value to append to the array
 * @return Array     The new array representing the new state
 */
function arrayPush (arr, val) {
  arr.push(val);
  return [...arr];
}

/**
 * Same as arrayPush but ensures no duplicates are added
 */
function arrayPushUnique (arr, val) {
  if (!arrayHasItem(arr, val)) {
    return arrayPush(arr, val);
  }
  return [...arr];
}

/**
 * Returns a new array respresenting the old array less the provided value
 * @param  Array arr  The target array
 * @param  Any val The value we want to target for removal
 * @return Array     The new array representing the new state
 */
function arrayDeleteValue (arr, val) {
  if (arrayHasItem(arr, val)) {
    arr.splice(arr.indexOf(val), 1);
  }
  return [...arr];
}
/*
* The data below could come from a rest server
*/
const defaultUser = {
  stage: 0, //intro stage
  role: 'anonymous',
  firstname: '',
  lastname: ''  
}

/**
 * Controlls the user state
 * @param object state the user's current state
 * @param object action The action that this function may respond to
 *
 * @return object the new state or the current state
 */
function user(state = defaultUser, action){
  switch(action.type){
    case USER_SEES_SPLASH:
      if(state.stage !== 0){
        return state
      }
      state.stage = 1;
      return  {...state};
    case USER_SEES_INTRO:
      if(state.stage !== 1){
        return state
      }
      state.stage = 2;
      return  {...state};
  }
  return state;
}
/**
 * Controlls the apps state
 * @param Object state the apps current state
 * @param Object action The action that this function may respond to
 *
 * @return Object the new state or the current state
 */
function apps(state = appItems , action){

  switch(action.type){
    case REMOVE_T2APP_FROM_MYAPPS_LIST:
      return updateMapItem(state,action.id,function(err,item){
        item.installed = false;
        return item
      });
    case TOGGLE_T2APP_FROM_MYAPPS_LIST:
      return updateMapItem(state,action.id,function(err,item){
        item.installed = !item.installed;
        return item
      });
  }

  return state;
}
/**
 * Controlls the t2AppIds state
 * @param Array state The t2AppIds current state
 * @param Object action The action that this function may respond to
 *
 * @return Array the new state or the current state
 */
function t2AppIds(state = initT2AppIds, action){
  switch(action.type){

  }
  return state;
}
/**
 * Controlls the myAppIds state
 * @param Array state The myAppIds current state
 * @param Object action The action that this function may respond to
 *
 * @return Array the new state or the current state
 */
function myAppIds(state = initMyAppIds, action){

  switch(action.type){
    case ADD_T2APP_TO_MYAPPS_LIST:
      return arrayPushUnique(state,action.id);
    case TOGGLE_T2APP_FROM_MYAPPS_LIST:
      return arrayHasItem(state,action.id) ? arrayDeleteValue(state,action.id) : arrayPushUnique(state,action.id);
    case REMOVE_T2APP_FROM_MYAPPS_LIST:
      return arrayDeleteValue(state,action.id);  
  }
  return state;
}


/**
 * Controlls the app view state
 * @param Array state The view current state
 * @param Object action The action that this function may respond to
 *
 * @return Object   The new state or the current state
 */
function view (state = defaultView, action) {
  switch (action.type) {
    case SHOW_FLASH_MESSAGE:
      state.flash.message = action.text;
      state.flash.open = true;
      return {...state};
    case HIDE_FLASH_MESSAGE:
      state.flash.message = '';
      state.flash.open = false;
      return {...state};
    case TAB_CHANGE_INDEX:
      if (typeof state.tabs[action.id] !== 'undefined') {
        state.tabs[action.id] = action.index;
        return {...state};
      }
      return state;
  }
  return state;
}

const appHub = combineReducers({
  apps,
  t2AppIds,
  myAppIds,
  routing: routerReducer,
  user,
  view,
  device: deviceReducer
});


export default appHub