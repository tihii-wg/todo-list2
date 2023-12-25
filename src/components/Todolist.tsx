import { ChangeEvent, KeyboardEvent, useState } from "react"
import { TasksFilterType } from "../App"

export type ArrayType = {
	id: string,
	isDone: boolean,
	title: string,
}

type PropsType = {
	title: string,
	tasks: Array<ArrayType>
	removeTask: (id: string) => void,
	changefilter: (value: TasksFilterType) => void,
	addNewTask: (title: string) => void,
	chandeTaskStatus: (taskId: string, isDone: boolean) => void,
	filter: string
}

export function Todolist(props: PropsType) {

	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [error, setNewError] = useState<null | string>(null)

	const addNewTaskHandler = () => {
		if (newTaskTitle.trim() !== '') {
			props.addNewTask(newTaskTitle.trim());
			setNewTaskTitle('')
		} else {
			setNewError('Field is required!')
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewError(null);
		setNewTaskTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && newTaskTitle.trim() !== '') {
			props.addNewTask(newTaskTitle.trim());
			setNewTaskTitle('')
		} else {
			setNewError('Field is required!')
		}
	}

	const onAllFilterHandler = () => { props.changefilter('all') }
	const onActiveFilterHandler = () => { props.changefilter('active') }
	const onCompletedFilterHandler = () => { props.changefilter('completed') }

	return (
		<div className="todolist-iner">
			<h3>{props.title}</h3>
			<div>
				<input type="text"
					value={newTaskTitle}
					onChange={onChangeHandler}
					onKeyDown={onKeyPressHandler}
					className={error ? "error" : ""} />
				<button onClick={addNewTaskHandler}>+</button>
				<div className={error ? "error-message" : ""}>{error}</div>
			</div>
			<ul>
				{
					props.tasks.map((t) => {
						const onRemovetask = () => {
							props.removeTask(t.id)
						}
						const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							props.chandeTaskStatus(t.id, e.currentTarget.checked)
						}
						return <li className={t.isDone ? "isDone" : ""}><input type="checkbox"
							onChange={onChangeTaskStatusHandler}
							checked={t.isDone} /><span>{t.title}</span>
							<button onClick={onRemovetask}>x</button></li>
					})
				}
			</ul>
			<div>
				<button className={props.filter === 'all' ? 'isActive' : ''} onClick={onAllFilterHandler}>ALL</button>
				<button className={props.filter === 'active' ? 'isActive' : ''} onClick={onActiveFilterHandler}>ACTIVE</button>
				<button className={props.filter === 'completed' ? 'isActive' : ''} onClick={onCompletedFilterHandler}>COMPLETE</button>
			</div>
		</div>
	)
};