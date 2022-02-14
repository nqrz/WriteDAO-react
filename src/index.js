import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './assets/index.css'

import { ThirdwebWeb3Provider } from '@3rdweb/hooks';

const supportedChainsIds = [4];

const connectors = {
  injected: {},
};

ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider connectors={connectors} supportedChainsIds={supportedChainsIds}>
      <App />
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
