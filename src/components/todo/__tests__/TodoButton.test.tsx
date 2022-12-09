import React from 'react'
import { screen } from '@testing-library/react'
import { renderProvider } from 'test/helpers/renderProvider'
import user from '@testing-library/user-event'

import TodoButton from '../TodoButton'

export const mockAddFn = jest.fn()

jest.mock('hooks/useActions', () => ({
	useActions: () => ({
		add: mockAddFn
	})
}))

describe('Initializing TodoButton', () => {
	test('Should renders without crashing', () => {
		renderProvider(<TodoButton />)
		const buttonAddElement = screen.getByRole('button')
		const fieldElement = screen.getByRole('textbox')

		expect(buttonAddElement).toBeInTheDocument()
		expect(fieldElement).toBeInTheDocument()
	})

	test('Should field must be empty by default', () => {
		renderProvider(<TodoButton />)
		const field = screen.getByRole('textbox')

		expect(field).toHaveValue('')
	})

	test('Should print in field', async () => {
		user.setup()
		renderProvider(<TodoButton />)
		const field = screen.getByRole('textbox')

		await user.type(field, 'Task #1')

		expect(field).toHaveValue('Task #1')
	})

	test('Should not add element if field empty', async () => {
		user.setup()
		renderProvider(<TodoButton />)
		const button = screen.getByRole('button')

		await user.click(button)

		expect(mockAddFn).toBeCalledTimes(0)
	})

	test('Should add element if field not empty and after clear field', async () => {
		user.setup()
		renderProvider(<TodoButton />)
		const button = screen.getByRole('button')
		const field = screen.getByRole('textbox')

		await user.type(field, 'Task #1')
		await user.click(button)

		expect(mockAddFn).toBeCalledTimes(1)
		expect(field).toHaveValue('')
	})
})
