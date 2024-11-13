import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';

import { OFFERS } from './mocks/offers-mock';
import { cities } from './const';

import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={OFFERS} cities={cities}/>
    </Provider>
  </React.StrictMode>,
);
