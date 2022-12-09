import Page from './page'

class HomePage extends Page {
	public get todoItems() {
		return $$('#todo-item')
	}

	public get todoInput() {
		return $('#todo-button-field')
	}

	public get todoButtonAdd() {
		return $('#todo-button-add')
	}

	public get todoItemRemove() {
		return this.todoItems[0].$('#todo-item-remove')
	}

	public get todoItemEdit() {
		return this.todoItems[0].$('#todo-item-edit')
	}

	public get todoItemField() {
		return this.todoItems[0].$('#todo-item-field')
	}

	public get todoItemTitle() {
		return this.todoItems[0].$('#todo-item-title')
	}

	public get todoItemCompleted() {
		return this.todoItems[0].$('#todo-item-completed')
	}

	public async addTodoItem(value: string) {
		await this.todoInput.setValue(value)
		await this.todoButtonAdd.click()
	}

	public async editTodoItem(value: string) {
		await this.todoItemEdit.click()
		await this.todoItemField.setValue(value)
		await this.todoItemEdit.click()
	}

	public async completedTodoItem() {
		await this.todoItemCompleted.click()
	}

	public async clearLocalStorage() {
		await browser.clearLocalStorage()
	}

	public async deleteTodoItem() {
		await this.todoItemRemove.click()
	}

	public open() {
		return super.open('/')
	}
}

export default new HomePage()
