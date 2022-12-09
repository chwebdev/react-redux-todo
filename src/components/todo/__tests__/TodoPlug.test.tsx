import React from 'react'
import { render, screen } from '@testing-library/react'

import TodoPlug from '../TodoPlug'

describe('Initializing TodoPlug', () => {
	test('Should renders without crashing', () => {
		render(<TodoPlug />)
		const plugElement = screen.getByRole('img')

		expect(plugElement).toBeInTheDocument()
	})
})
