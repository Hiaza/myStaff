import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { AppContainer } from 'react-hot-loader';

const root = document.getElementById('root');

const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>
    , root,
  );
};

renderApp();

if (module.hot) {
    module.hot.accept('./components/App', renderApp);
  }