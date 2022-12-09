import React from 'react'
import { renderProvider } from 'test/helpers/renderProvider'

import App from '../App'

describe('Initializing App', () => {
	test('Should renders without crashing', () => {
		renderProvider(<App />)
	})
})
