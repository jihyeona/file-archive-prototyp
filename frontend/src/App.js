import React from 'react'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import PollList from './pages/PollList'
import ItemList from './pages/ItemList'
import MyPage from './pages/MyPage'
import AddPoll from './pages/AddPoll'
import AddItem from './pages/AddItem'
import { Provider } from 'react-redux'
import { user } from './reducers/user'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { combineReducers } from '@reduxjs/toolkit'
import { createStore } from 'redux'
import thunk from 'redux-thunk'
import { applyMiddleware, compose } from '@reduxjs/toolkit'
import HowToUse from 'pages/HowToUse'

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    console.log('saving to local storage...')
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.log(error)
  }
}

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state')
    console.log('loading from local storage...')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (error) {
    console.log(error)
    return undefined
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedState = loadFromLocalStorage()

const reducer = combineReducers({ user: user.reducer })

const store = createStore(reducer, persistedState, composeEnhancer(applyMiddleware(thunk)))

store.subscribe(() => saveToLocalStorage(store.getState()))

export const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact ><SignUp /></Route>
          <Route path='/login' exact ><LogIn /></Route>
          <Route path='/about' exact ><HowToUse /></Route>
          <Route path='/home' exact ><PollList /></Route>
          <Route path='/polls/:pollId' exact ><ItemList /></Route>
          <Route path='/mypage' exact ><MyPage /></Route>
          <Route path='/addpoll' exact ><AddPoll /></Route>
          <Route path='/:pollId/additem'><AddItem /></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}