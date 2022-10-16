import React from 'react';
import ReactDOM from 'react-dom';
import { setUserProperties } from '@firebase/analytics';
import { analytics } from 'apis';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

setUserProperties(analytics, { is_early_access: false });
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
