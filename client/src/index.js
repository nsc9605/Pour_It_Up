import React from 'react';
import ReactDOM from 'react-dom';
import UserProvider from "./Providers/UserProvider";
import './index.css';
import App from './App.jsx';
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  // <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>,
  // {/* </React.StrictMode>, */}
  document.getElementById('root')
);