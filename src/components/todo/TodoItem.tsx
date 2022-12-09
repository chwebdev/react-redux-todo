import React, { FC, useState } from 'react'
import { useActions } from 'hooks/useActions'
import { Button, Form } from 'react-bootstrap'
import { AiOutlineCheck, AiOutlineDelete, AiTwotoneEdit } from 'react-icons/ai'

import { ITodoItemProps } from './todo.interface'

const TodoItem: FC<ITodoItemProps> = ({ todo }) => {
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [value, setValue] = useState<string>(todo.title)

	const { remove, edit, completed } = useActions()
	const editTodo = () => {
		if (isEdit) {
			edit({
				...todo,
				title: value
			})
		}

		setIsEdit(!isEdit)
	}

	return (
		<Form
			className='d-flex flex-column flex-sm-row align-items-sm-center p-3 mt-3 border rounded-1'
			id='todo-item'
			role='form'
			aria-label='todo-item'
		>
			<Form.Check
				type='switch'
				className='me-3 mb-3 mb-sm-0'
				checked={todo.completed}
				onChange={() => completed(todo.id)}
				id='todo-item-completed'
			/>

			{isEdit ? (
				<Form.Control
					className='flex-1'
					onChange={e => setValue(e.target.value)}
					value={value}
					type='text'
					placeholder='Task name'
					id='todo-item-field'
				/>
			) : (
				<span className='text-truncate flex-1' id='todo-item-title'>
					{todo.title}
				</span>
			)}

			<div className='mt-3 mt-sm-0'>
				<Button
					className='mx-sm-3 me-3'
					onClick={editTodo}
					type='button'
					disabled={!value}
					data-testid='todo-item-edit'
					id='todo-item-edit'
				>
					{isEdit ? <AiOutlineCheck /> : <AiTwotoneEdit />}
				</Button>
				<Button
					onClick={() => remove(todo.id)}
					variant='danger'
					type='button'
					data-testid='todo-item-remove'
					id='todo-item-remove'
				>
					<AiOutlineDelete />
				</Button>
			</div>
		</Form>
	)
}

export default TodoItem
