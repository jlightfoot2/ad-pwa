
export const ADD_APP_TO_MYAPPS_LIST = 'ADD_APP_TO_MYAPPS_LIST';
export const REMOVE_APP_FROM_T2APPS_LIST = 'REMOVE_APP_FROM_T2APPS_LIST';

export const ADD_APP_TO_T2APPS_LIST = 'ADD_APP_TO_T2APPS_LIST';
export const REMOVE_APP_FROM_MYAPPS_LIST = 'REMOVE_APP_FROM_MYAPPS_LIST';

export const MOVE_T2APP_TO_MYAPPS_LIST = 'MOVE_T2APP_TO_MYAPPS_LIST';
export const MOVE_MYAPP_TO_T2APPS_LIST = 'MOVE_MYAPP_TO_T2APPS_LIST';

export const moveT2AppToMyApps = (id) => {
	return {
		type: MOVE_T2APP_TO_MYAPPS_LIST ,
		id
	};
}

export const  moveMyAppToT2Apps = (id) =>{
	return {
		type: MOVE_MYAPP_TO_T2APPS_LIST,
		id
	};
}

/*
function removeAppFromMyApps(id){
	return {
		type: ADD_APP_TO_MYAPPS_LIST,
		id
	}
}

function addAppToMyApps(id){
	return {
		type: ADD_APP_TO_MYAPPS_LIST,
		id
	}
}
*/

