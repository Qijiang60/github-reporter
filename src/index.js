import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from './components/containers/Routes';
import store from './store/';
import theme from './styles/theme';
import './styles/index.css';
import './styles/fonts/index.css';

injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider muiTheme={theme}>
    <Provider store={store()}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
