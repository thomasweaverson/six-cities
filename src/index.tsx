import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const offersCount = 999;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App offersCount={offersCount}/>
  </React.StrictMode>,
);
