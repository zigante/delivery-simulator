import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.render(root, document.getElementById('root'));

reportWebVitals();
