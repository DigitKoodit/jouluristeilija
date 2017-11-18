import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './stores/store';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import AppRouter from './core/router';
import routes from './core/routes';
import cabinStorer from './middleware/cabinStorer';
import { cabinsFetched, CABINS_DB_KEY } from './stores/cabins';
import localforage from 'localforage';
import './App.css';

const App = () => {
  const store = compose(
    applyMiddleware(thunk),
    applyMiddleware(cabinStorer)
  )(createStore)(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Enable redux devtools
  );

  const fetchInitialSate = () => {
    return Promise.resolve()
      .then(() => localforage.getItem(CABINS_DB_KEY))
      .then(value => {
        store.dispatch(cabinsFetched(value));
      })
      .catch(err => console.error(err));
  };
  fetchInitialSate();

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navigation routes={routes} />
          <AppRouter routes={routes} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
