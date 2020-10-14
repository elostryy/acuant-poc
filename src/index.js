import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store, history } from './store';

ReactDOM.render(
  <App routerHistory={history} store={store} />,
  document.getElementById('root')
);
