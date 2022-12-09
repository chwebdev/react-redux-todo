import React from 'react'
import { renderProvider } from 'test/helpers/renderProvider'
import { screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { ITodoInitState } from 'types/todo'

import Todo from '../Todo'

describe('Initializing Todo', () => {
	const initialState: ITodoInitState = {
		todo: {
			todos: [
				{
					id: 1,
					title: 'Task #1',
					completed: false
				}
			]
		}
	}

	describe('Render', () => {
		test('Should renders without crashing', () => {
			renderProvider(<Todo />)
			const buttonAddElement = screen.getByRole('button', {
				name: 'Add'
			})
			const fieldElement = screen.getByRole('textbox')
			const slugElement = screen.getByRole('img')

			expect(buttonAddElement).toBeInTheDocument()
			expect(fieldElement).toBeInTheDocument()
			expect(slugElement).toBeInTheDocument()
		})
	})

	describe('Add', () => {
		test('Should added to an empty list', async () => {
			user.setup()
			renderProvider(<Todo />)
			const fieldElement = screen.getByRole('textbox')
			const buttonAddElement = screen.getByRole('button', {
				name: 'Add'
			})

			await user.type(fieldElement, 'Task #1')
			await user.click(buttonAddElement)

			expect(screen.getByText('Task #1')).toBeInTheDocument()
		})
	})

	describe('Edit', () => {
		test('Should edit element to an existing list', async () => {
			user.setup()
			renderProvider(<Todo />, initialState)
			const buttons = screen.getAllByTestId('todo-item-edit')

			await user.click(buttons[0])
			await user.clear(
				screen.getByDisplayValue(initialState.todo.todos[0].title)
			)
			await user.type(
				screen.getAllByPlaceholderText('Task name')[0],
				'Buy new jeans'
			)
			await user.click(buttons[0])

			expect(screen.getByText('Buy new jeans')).toBeInTheDocument()
		})
	})

	describe('Completed', () => {
		test('Should completed element in existing list', async () => {
			user.setup()
			renderProvider(<Todo />, initialState)
			const buttons = screen.getAllByRole('checkbox')

			await user.click(buttons[0])

			expect(buttons[0]).toBeChecked()
		})
	})

	describe('Remove', () => {
		test('Should be deleted in the existing list', async () => {
			user.setup()
			renderProvider(<Todo />, initialState)
			const buttons = screen.getAllByTestId('todo-item-remove')

			await user.click(buttons[0])

			expect(screen.queryByText('Task #1')).not.toBeInTheDocument()
		})
	})
})
