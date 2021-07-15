import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserHistory} from "history";
// apollo
import {ApolloProvider} from "@apollo/client";
import {client} from "./api/client";
// router
import {Router} from "react-router-dom";
// redux
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from "./mudules";


export const history = createBrowserHistory();
// @ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);
ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <ApolloProvider client={client}>
          <App/>
      </ApolloProvider>
    </Provider>
  </Router>
  ,
  document.getElementById('root')
);

reportWebVitals();
