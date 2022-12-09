import { todoSlice } from '../todo-slice'

import { ITodoItem } from 'types/todo'

const todos: ITodoItem[] = [
	{ id: 1, title: 'Run the tests', completed: false },
	{ id: 2, title: 'Use Redux', completed: false }
]

describe('Initializing todo slice', () => {
	test('Should return the initial state', () => {
		const reducer = todoSlice.reducer(undefined, { type: undefined })

		expect(reducer).toEqual({ todos: [] })
	})

	test('Should add to an empty list', () => {
		const reducer = todoSlice.reducer(
			{ todos: [] },
			todoSlice.actions.add(todos[0].title)
		)

		expect(reducer).toEqual({
			todos: [todos[0]]
		})
	})

	test('Should add to an existing list', () => {
		const reducer = todoSlice.reducer(
			{ todos: [todos[0]] },
			todoSlice.actions.add(todos[1].title)
		)

		expect(reducer).toEqual({
			todos
		})
	})

	test('Should edit element to an existing list', () => {
		const reducer = todoSlice.reducer(
			{ todos },
			todoSlice.actions.edit({
				...todos[0],
				title: 'Edit element'
			})
		)

		expect(reducer).toEqual({
			todos: [{ ...todos[0], title: 'Edit element' }, todos[1]]
		})
	})

	test('Should completed element in existing list', () => {
		const reducer = todoSlice.reducer(
			{ todos },
			todoSlice.actions.completed(todos[0].id)
		)

		expect(reducer).toEqual({
			todos: [{ ...todos[0], completed: true }, todos[1]]
		})
	})

	test('Should be deleted in the existing list', () => {
		const reducer = todoSlice.reducer(
			{ todos },
			todoSlice.actions.remove(todos[0].id)
		)

		expect(reducer).toEqual({
			todos: [todos[1]]
		})
	})
})
