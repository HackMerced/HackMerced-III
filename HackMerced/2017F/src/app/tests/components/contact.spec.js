import React from 'react'

import { shallow } from 'enzyme'
import { Contact } from 'components/contact'

describe('Contact', () => {
  it('renders as a <div>', () => {
    shallow(<Contact/>)
      .should.have.tagName('div')
  })
})
