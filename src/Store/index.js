import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducres } from './Reducers';

export const configureStore = () => {
  return createStore(rootReducres, applyMiddleware(thunk));
}

