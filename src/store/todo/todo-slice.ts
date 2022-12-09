import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITodoItem, ITodoState } from 'types/todo'

const initialState: ITodoState = {
	todos: []
}
export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		add(state, action: PayloadAction<string>) {
			state.todos.push({
				id: state.todos.length + 1,
				title: action.payload,
				completed: false
			})
		},
		edit(state, action: PayloadAction<ITodoItem>) {
			state.todos = state.todos.map((todo: ITodoItem) => {
				return todo.id === action.payload.id ? action.payload : todo
			})
		},
		completed(state, action: PayloadAction<number>) {
			const toDo = state.todos.find(todo => todo.id === action.payload)

			if (toDo) {
				toDo.completed = !toDo.completed
			}
		},
		remove(state, action: PayloadAction<number>) {
			state.todos = state.todos.filter(todo => action.payload !== todo.id)
		}
	}
})
