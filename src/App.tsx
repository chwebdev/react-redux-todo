import React, { FC } from 'react'
import Layout from 'components/layout/Layout'
import Todo from 'components/todo/Todo'
import './index.css'
import Logo from './components/logo/Logo'

const App: FC = () => {
	return (
		<Layout title='Todo App'>
			<div className='d-flex justify-content-center mb-3 mb-sm-5'>
				<Logo />
			</div>
			<Todo />
		</Layout>
	)
}

export default App
