import { combineReducers } from 'redux'

import { todoSlice } from './todo/todo-slice'

export const rootReducer = combineReducers({
	todo: todoSlice.reducer
})
