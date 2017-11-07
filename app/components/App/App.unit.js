import { test } from 'mocha'
import { assert } from 'chai'

import * as TU from 'services/testUtils'
import App from './App'

const setup = TU.makeTestSetup({
  Component: App,
})

test('components.App | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})
