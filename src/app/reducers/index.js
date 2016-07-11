import {combineReducers} from 'redux'
import {
	MOVE_T2APP_TO_MYAPPS_LIST, 
	MOVE_MYAPP_TO_T2APPS_LIST, 
	ADD_T2APP_TO_MYAPPS_LIST,
	REMOVE_T2APP_FROM_MYAPPS_LIST,
	TOGGLE_T2APP_FROM_MYAPPS_LIST
} from '../actions'
import { normalize, Schema, arrayOf } from 'normalizr';
import { List, Map } from 'immutable';
const appitem = new Schema('appitems');

appitem.define({

});

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
	    url: 'https://google.com',
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

const appTree = {
	apps: defaultApps
}

var t2apps = normalize(appTree.apps,arrayOf(appitem));
console.log(t2apps);
const appItems = t2apps.entities.appitems;


const initT2AppIds = List(t2apps.result);
const initMyAppIds = List();


//just containes an object list of all apps
function apps(state = appItems , action){

	switch(action.type){

		case TOGGLE_T2APP_FROM_MYAPPS_LIST:
			console.log('toggle state called '+action.id);
			//return state.updateIn(action.id+"", 'installed',(v) => !v)
			state[action.id+""].installed = state[action.id+""].installed ? false : true;
			return Object.assign({},state);
	}

	return state;
}

function t2AppIds(state = initT2AppIds, action){
	switch(action.type){
 
	}
	return state;
}

function myAppIds(state = initMyAppIds, action){
	return state;
	switch(action.type){
		case MOVE_T2APP_TO_MYAPPS_LIST:
		case ADD_T2APP_TO_MYAPPS_LIST:
			return state.push(action.id)
		case MOVE_MYAPP_TO_T2APPS_LIST:
		case REMOVE_T2APP_FROM_MYAPPS_LIST:
			return state.delete(state.keyOf(action.id));	
	}
	return state;
}


const appHub = combineReducers({
  apps,
  t2AppIds,
  myAppIds
});


export default appHub