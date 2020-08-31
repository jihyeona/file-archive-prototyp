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

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    console.log('saving to local storage...');
    localStorage.setItem('state', serializedState);
  } catch (error) {
    console.log(error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    console.log('loading from local storage...');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadFromLocalStorage();

const reducer = combineReducers({ file: file.reducer });

const store = createStore(
  reducer,
  persistedState,
  composeEnhancer(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

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
