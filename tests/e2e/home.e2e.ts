import HomePage from '../page/home.page'

describe('Initializing Home', () => {
	beforeEach(async () => {
		await HomePage.open()
	})

	it('Should add to an empty list localStorage', async () => {
		await HomePage.addTodoItem('Task #1')

		await expect(await HomePage.todoItemTitle).toHaveText('Task #1')
	})

	it('Should edit element to an existing list localStorage', async () => {
		await HomePage.editTodoItem('Task #2')

		await expect(await HomePage.todoItemTitle).toHaveText('Task #2')
	})

	it('Should completed element in existing list localStorage', async () => {
		await HomePage.completedTodoItem()

		await expect(await HomePage.todoItemCompleted).toBeChecked()
	})

	it('Should be deleted in the existing list localStorage', async () => {
		await HomePage.deleteTodoItem()

		await expect(await HomePage.todoItems).toHaveLength(0)
	})
})
