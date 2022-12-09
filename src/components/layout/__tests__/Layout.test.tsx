import React from 'react'
import { render, screen } from '@testing-library/react'
import { Helmet } from 'react-helmet'

import Layout from '../Layout'

describe('Initializing Layout', () => {
	test('Should render without crashing', () => {
		render(<Layout title='Meta title'>Child</Layout>)
	})

	test('Should render with props', () => {
		render(<Layout title='Meta title'>Child</Layout>)
		const helmet = Helmet.peek()
		const child = screen.getByText('Child')

		expect(helmet.title).toBe('Meta title')
		expect(child).toBeInTheDocument()
	})
})
