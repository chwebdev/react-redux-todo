import React from 'react'
import { renderProvider } from 'test/helpers/renderProvider'
import { ITodoItem } from 'types/todo'
import TodoItem from '../TodoItem'
import { screen } from '@testing-library/react'
import user from '@testing-library/user-event'

export const mockCompletedFn = jest.fn()
export const mockRemoveFn = jest.fn()
export const mockEditFn = jest.fn()

jest.mock('hooks/useActions', () => ({
	useActions: () => ({
		remove: mockRemoveFn,
		completed: mockCompletedFn,
		edit: mockEditFn
	})
}))

describe('Initializing TodoItem', () => {
	const mockItem: ITodoItem = {
		id: 1,
		title: 'Task #1',
		completed: false
	}

	describe('Render', () => {
		test('Should render without crashing', () => {
			renderProvider(<TodoItem todo={mockItem} />)
			const buttonRemoveElement = screen.getByTestId('todo-item-remove')
			const buttonEditElement = screen.getByTestId('todo-item-edit')
			const buttonCompletedElement = screen.getByRole('checkbox')

			expect(buttonRemoveElement).toBeInTheDocument()
			expect(buttonEditElement).toBeInTheDocument()
			expect(buttonCompletedElement).toBeInTheDocument()
		})

		test('Should render with props', async () => {
			renderProvider(<TodoItem todo={mockItem} />)
			const titleElement = screen.getByText(mockItem.title)

			expect(titleElement).toBeInTheDocument()
		})
	})

	describe('Edit', () => {
		test('Should filled in by default', async () => {
			user.setup()
			renderProvider(<TodoItem todo={mockItem} />)
			const buttonEditElement = screen.getByTestId('todo-item-edit')
			await user.click(buttonEditElement)

			expect(screen.getByRole('textbox')).toHaveValue('Task #1')
		})

		test('Should print in field', async () => {
			user.setup()
			renderProvider(<TodoItem todo={mockItem} />)
			const buttonEditElement = screen.getByTestId('todo-item-edit')

			await user.click(buttonEditElement)
			await user.clear(screen.getByRole('textbox'))
			await user.type(screen.getByRole('textbox'), 'Task #2')

			expect(screen.getByRole('textbox')).toHaveValue('Task #2')
		})

		test('Should not render field if not click a edit button', () => {
			const fieldElement = screen.queryByRole('textbox')

			expect(fieldElement).not.toBeInTheDocument()
		})

		test('Should render field if click a edit button', async () => {
			user.setup()
			renderProvider(<TodoItem todo={mockItem} />)
			const buttonEditElement = screen.getByTestId('todo-item-edit')

			await user.click(buttonEditElement)

			expect(screen.getByRole('textbox')).toBeInTheDocument()
		})

		test('Should not edit if field empty and after not hide field', async () => {
			user.setup()
			renderProvider(<TodoItem todo={mockItem} />)
			const buttonEditElement = screen.getByTestId('todo-item-edit')

			await user.click(buttonEditElement)
			await user.clear(screen.getByRole('textbox'))
			await user.click(buttonEditElement)

			expect(mockEditFn).toBeCalledTimes(0)
			expect(screen.getByRole('textbox')).toBeInTheDocument()
		})

		test('Should edit if field not empty and after hide field', async () => {
			user.setup()
			renderProvider(<TodoItem todo={mockItem} />)
			const buttonEditElement = screen.getByTestId('todo-item-edit')

			await user.dblClick(buttonEditElement)

			expect(mockEditFn).toBeCalledTimes(1)
			expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
		})
	})

	describe('Completed', () => {
		test('Should disabled checkbox by default', () => {
			renderProvider(<TodoItem todo={mockItem} />)
			const buttonCompletedElement = screen.getByRole('checkbox')
			expect(buttonCompletedElement).not.toBeChecked()
		})

		test('Should enabled checkbox if click', async () => {
			user.setup()
			renderProvider(<TodoItem todo={mockItem} />)
			const buttonCompletedElement = screen.getByRole('checkbox')

			await user.click(buttonCompletedElement)

			expect(mockCompletedFn).toBeCalledTimes(1)
		})
	})

	describe('Remove', () => {
		test('Should remove element if click', async () => {
			user.setup()
			renderProvider(<TodoItem todo={mockItem} />)
			const button = screen.getByTestId('todo-item-remove')

			await user.click(button)

			expect(mockRemoveFn).toBeCalledTimes(1)
		})
	})
})
