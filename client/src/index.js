import React from 'react';
import ReactDOM from 'react-dom';
import UserProvider from "./Providers/UserProvider";
import './index.css';
import App from './App.jsx';
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
    <UserProvider>
      <App />
    </UserProvider>,
  document.getElementById('root')
);