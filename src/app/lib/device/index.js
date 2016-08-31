import deviceReducer from './reducers';
import deviceActions, {windowResize} from './actions';

const deviceMiddleware = store => next => action => {
  let result = next(action);
  window.addEventListener('resize', () => {
    next(windowResize(window.innerWidth, window.innerHeight));
  });
  window.addEventListener('orientationchange', () => {
    setTimeout(() => (next(windowResize(window.innerWidth, window.innerHeight))), 500);
  });
  return result;
};

export {
  deviceReducer,
  deviceActions,
  deviceMiddleware
};
