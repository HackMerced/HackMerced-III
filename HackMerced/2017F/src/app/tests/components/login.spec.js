import React from 'react'
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const dispatch = sinon.spy();

import { Login } from 'components/login'
import { LoginForm } from 'components/forms'
import { LogoWithCopy } from 'components/partials'
import { shallow } from 'enzyme'


describe('Login', () => {
  it('renders as a <div>', () => {
    shallow(<Login
      dispatch={dispatch}
      store={mockStore({
        loginForm: {
          email: '',
          password: '',
        },
        loginErrors: {
          email: '',
          password: '',
        }
      })}
    />)
      .should.have.tagName('div')
  })
})
