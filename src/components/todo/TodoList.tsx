import React, { FC } from 'react'
import { ITodoItem } from 'types/todo'
import { useTypedSelector } from 'hooks/useTypedSelector'

import TodoItem from './TodoItem'
import TodoPlug from './TodoPlug'

const TodoList: FC = () => {
	const { todos } = useTypedSelector(state => state.todo)

	if (!todos.length) return <TodoPlug />

	return (
		<div>
			{todos.map((todo: ITodoItem) => {
				return <TodoItem key={todo.id} todo={todo} />
			})}
		</div>
	)
}

export default TodoList
