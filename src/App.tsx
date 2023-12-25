
import { useState } from 'react';
import './App.css';
import { ArrayType, Todolist } from './components/Todolist';
import { v1 } from 'uuid';

export type TasksFilterType = 'all' | 'active' | 'completed';

//export const ALL = 'all';
//export const ACTIVE = 'active';
//export const COMPLETED = 'completed';

function App() {
	const [tasks, setTasks] = useState<Array<ArrayType>>([
		{ id: v1(), isDone: true, title: 'CSS' },
		{ id: v1(), isDone: false, title: 'JS' },
		{ id: v1(), isDone: true, title: 'Redux' },
		{ id: v1(), isDone: false, title: 'JS' },
		{ id: v1(), isDone: true, title: 'html' },
		{ id: v1(), isDone: false, title: 'React' },
	])
	const [filter, setFiler] = useState<TasksFilterType>('all')

	const changefilter = (value: TasksFilterType) => {
		setFiler(value);
	}

	const removeTask = (id: string) => {
		let filteredTask = tasks.filter((t) => id !== t.id)
		setTasks(filteredTask);
	}

	const addNewTask = (title: string) => {
		let newtask = {
			id: v1(),
			isDone: false,
			title: title
		}
		let newTasks = [newtask, ...tasks]
		setTasks(newTasks);
	}

	let tasksForTodoList = tasks;
	if (filter === 'active') {
		tasksForTodoList = tasks.filter(t => t.isDone === false)
	}
	if (filter === 'completed') {
		tasksForTodoList = tasks.filter(t => t.isDone === true)
	}

	const changeTaskStatus = (taskId: string, isDone: boolean) => {
		let task = tasks.find(t => t.id === taskId)
		if (task) {
			task.isDone = isDone
		}
		setTasks([...tasks])
	}

	return (
		<div className="app">
			<h1 className='logo'>Todo list.</h1>
			<div className='container'>
				<Todolist
					title='What to learn'
					tasks={tasksForTodoList}
					removeTask={removeTask}
					changefilter={changefilter}
					addNewTask={addNewTask}
					chandeTaskStatus={changeTaskStatus}
					filter={filter}
				/>
			</div>
		</div>
	)
}

export default App;
