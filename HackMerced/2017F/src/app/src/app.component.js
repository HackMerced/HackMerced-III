import React, { Component } from 'react'
import { browserHistory, Router, Route } from 'react-router'

import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import { Home } from './home';
import { Signup } from './signup';
import { Login } from './login';


class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory}>
            <Route path="/" component={Home} />
            <Route path="/apply" component={Signup} />
            <Route path="/login" component={Login} />
          </Router>
        </div>
      </Provider>
    )
  }
}

export default App
