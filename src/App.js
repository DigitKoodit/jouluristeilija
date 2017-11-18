import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './stores/store';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import AppRouter from './core/router';
import routes from './core/routes';
import './App.css';

const App = () => {
  const store = compose(
    applyMiddleware(thunk)
  )(createStore)(rootReducer);

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
