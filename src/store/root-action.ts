import { todoSlice } from './todo/todo-slice'

export const rootActions = { ...todoSlice.actions }
