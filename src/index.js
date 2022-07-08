import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';
import { store } from './redux/store';
import { MetaMaskProvider } from "metamask-react";

ReactDOM.render(
  <React.StrictMode>
    <MetaMaskProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </MetaMaskProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
