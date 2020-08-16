import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export function configureStore(initialState) {
  const enhancers = [applyMiddleware(...middlewares)];

  if (process.env.NODE_ENV === 'development') {
    enhancers.push(
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }

  const store = createStore(reducers, initialState, compose(...enhancers));

  sagaMiddleware.run(sagas);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

const store = configureStore();
export default store;
