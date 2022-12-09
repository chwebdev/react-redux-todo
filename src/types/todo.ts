export interface ITodoItem {
	id: number
	title: string
	completed: boolean
}

export interface ITodoState {
	todos: ITodoItem[]
}

export interface ITodoInitState {
	todo: {
		todos: ITodoItem[]
	}
}
