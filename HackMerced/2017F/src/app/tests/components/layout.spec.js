import React from 'react'
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const dispatch = sinon.spy();

import { Layout } from 'components/layout'
import { Header } from 'components/partials'
import { shallow } from 'enzyme'


describe('Layout', () => {
  it('renders as a <div>', () => {
    shallow(<Layout
      dispatch={dispatch}
      location={{pathname: '/'}}
      data={{loggedIn: false}}
      store={mockStore({loggedIn: false})}
    />)
      .should.have.tagName('div')
  })
})
