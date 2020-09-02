import React from 'react';
import HomePage from './pages/HomePage';
import AddFile from './pages/AddFile';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { file } from './reducers/file';
import { combineReducers } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import { applyMiddleware, compose } from '@reduxjs/toolkit';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({ file: file.reducer });

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk))
);

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/upload" exact>
            <AddFile />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
