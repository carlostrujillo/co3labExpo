import React from 'react';
import AppNavigator from './navigation/AppNavigator';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import creatSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import allReducers from './reducers';

const sagaMiddleware = creatSagaMiddleware()
let store = createStore(allReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}



export default App