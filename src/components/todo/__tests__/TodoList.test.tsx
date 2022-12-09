import React from 'react'
import { screen } from '@testing-library/react'
import { renderProvider } from 'test/helpers/renderProvider'
import { ITodoInitState } from 'types/todo'

import TodoList from '../TodoList'

describe('Initializing TodoList', () => {
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

	test('Should renders without crashing', () => {
		renderProvider(<TodoList />, initialState)
	})

	test('Should renders Plug if store todo empty', () => {
		renderProvider(<TodoList />)
		const todo = screen.queryByRole('form')
		const plug = screen.getByRole('img')

		expect(todo).not.toBeInTheDocument()
		expect(plug).toBeInTheDocument()
	})

	test('Should renders TodoItem if store todo not empty', () => {
		renderProvider(<TodoList />, initialState)
		const todo = screen.getByRole('form')
		const plug = screen.queryByRole('img')

		expect(todo).toBeInTheDocument()
		expect(plug).not.toBeInTheDocument()
	})
})
