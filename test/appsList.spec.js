import 'babel-polyfill';
import configureMockStore from 'redux-mock-store';
import * as actions from '../src/app/actions';
import reducers from '../src/app/reducers';
import navigationConfig from '../src/app/navigationConfig';
import expect from 'expect'; // You can use any testing library
import {deviceMiddleware} from 'local-t2-device-redux';
import {navigationCreateMiddleware} from 'local-t2-navigation-redux';

// import {createStore, applyMiddleware, compose} from 'redux';

const mockStore = configureMockStore();

describe('actions', () => {
  it('should create an action to add t2 app to my list', () => {
    const id = 45;
    const expectedAction = {
      type: actions.TOGGLE_T2APP_FROM_MYAPPS_LIST,
      id
    };
    expect(actions.toggleT2AppFromMyList(id)).toEqual(expectedAction);
  });

  it('toggles t2 apps into and out of "My Apps"', () => {
    var lastState;
    lastState = reducers(lastState, {type: ''});

    Object.keys(lastState.apps).forEach(function (propName) {

      lastState = reducers(lastState, actions.toggleT2AppFromMyList(propName));

      expect(lastState.myAppIds.indexOf(propName)).toBeGreaterThan(-1);

      lastState = reducers(lastState, actions.toggleT2AppFromMyList(propName));

      expect(lastState.myAppIds.indexOf(propName)).toEqual(-1);
    });
  });
});
