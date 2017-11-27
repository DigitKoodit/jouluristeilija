import React, { Component } from 'react';
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
import { USER_ID_KEY, USER_NAME_KEY } from './core/auth';
import { setUserName, setUserId } from './stores/chat';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.store = compose(
      applyMiddleware(thunk),
      applyMiddleware(cabinStorer)
    )(createStore)(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Enable redux devtools
    );
  }

  componentWillMount() {
    console.log('App mounting');
    const store = this.store;
    const fetchInitialSate = () => {
      return Promise.resolve()
        .then(() => localforage.getItem(CABINS_DB_KEY))
        .then(value => {
          store.dispatch(cabinsFetched(value));
        })
        .catch(err => console.error(err));
    };
  
    const fetchChatId = () => {
      return localforage.getItem(USER_ID_KEY)
        .then(value => store.dispatch(setUserId(value)))
        .catch(err => console.error(err));
    }
  
    const fetchChatName = () => {
      return localforage.getItem(USER_NAME_KEY)
        .then(value => store.dispatch(setUserName(value)))
        .catch(err => console.error(err));
    }
  
    fetchInitialSate();
    fetchChatId();
    fetchChatName();
  }

  render() {
    const store = this.store;

    console.log(window.location);

    const isEmbed = window.location.pathname === '/schedule-embed';

    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            {!isEmbed && <Navigation routes={routes} />}
            <AppRouter routes={routes} />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;