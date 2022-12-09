import React, { FC, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useActions } from 'hooks/useActions'

const TodoButton: FC = () => {
	const [value, setValue] = useState<string>('')
	const { add } = useActions()

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		add(value)
		setValue('')
	}

	return (
		<Form role='form' aria-label='button-add' onSubmit={onSubmit}>
			<Form.Group className='d-flex'>
				<Form.Control
					onChange={e => setValue(e.target.value)}
					value={value}
					type='text'
					placeholder='It is task name'
					id='todo-button-field'
				/>
				<Button
					className='ms-3'
					variant='primary'
					type='submit'
					id='todo-button-add'
					disabled={!value}
				>
					Add
				</Button>
			</Form.Group>
		</Form>
	)
}

export default TodoButton
