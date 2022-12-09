import React from 'react'
import { render, screen } from '@testing-library/react'

import Logo from '../Logo'

describe('Initializing Logo', () => {
	test('Should render without crashing', () => {
		render(<Logo />)
		const logo = screen.getByRole('button')

		expect(logo).toBeInTheDocument()
	})
})
