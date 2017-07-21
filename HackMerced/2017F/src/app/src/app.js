// Import all the third party stuff
import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { homeReducer } from './reducers';

import { Home, Layout, Login, Signup, Apply, NotFound, Sponsor, Contact, Volunteer, Team , Forget} from './components'

import { Home, Layout, Login, Signup, Apply, NotFound, Sponsor, Contact, Volunteer, Team } from './components'



const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(homeReducer);


function checkAuth(nextState, replaceState) {
  let { loggedIn } = store.getState();

  const nextPath = nextState.location.pathname;
  if (nextPath !== '/apply') {
    if (loggedIn) {
      if(['/login', '/signup'].indexOf(nextPath) !== -1){
        replaceState('/apply');
        return;
      }

      if (nextState.location.state && nextPath) {
        replaceState(nextPath);
      } else {
        replaceState('/');
      }
    }
  } else {
    if (!loggedIn) {
      if (nextState.location.state && nextPath) {
        replaceState(nextPath);
      } else {
        replaceState('/');
      }
    }
  }
}

export class App extends Component{
  render(){    
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route component={Layout}>
            <Route path="/" component={Home} />
            <Route path="/volunteer" component={Volunteer} />
            <Route path="/contact" component={Contact} />
            <Route path="/team" component={Team} />
            <Route path="/sponsor" component={Sponsor} />
            <Route onEnter={checkAuth}>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/apply" component={Apply}/>
               <Route path="/forget" component={Forget}/>
            </Route>
            <Route path="*" component={NotFound} />
          </Route>
        </Router>
      </Provider>
    )
  }
}
