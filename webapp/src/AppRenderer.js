import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import setupAxios from './redux/setupAxios';

setupAxios(store);

const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div className="loading" />}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
