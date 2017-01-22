import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import BrowserRouter from 'react-router/BrowserRouter';
import Routes from './components/Routes';
import store from './store/';
import './styles/index.css';

const App = () => (
  <Provider store={store()}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
