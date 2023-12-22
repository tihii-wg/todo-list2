import { ChangeEvent,KeyboardEvent, useState } from "react"
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
	changefilter: (value: TasksFilterType) => void
	addNewTask: (title: string) => void
}

export function Todolist(props: PropsType) {

	const [newTaskTitle, setNewTaskTitle] = useState('')

	const addNewTaskHandler = (e:KeyboardEvent<HTMLInputElement>) => {
		if(e.code === 'Enter')
		props.addNewTask(newTaskTitle);
		setNewTaskTitle('')
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}

	return (
		<div className="todolist-iner">
			<h3>{props.title}</h3>
			<div>
				<input type="text" value={newTaskTitle} 
				onChange={onChangeHandler} 
				onKeyDown={addNewTaskHandler}/>
				<button onClick={addNewTaskHandler}>+</button>
			</div>
			<ul>
				{
					props.tasks.map((t) => {
						const onRemovetask = () => {
							props.removeTask(t.id)
						}
						return <li><input type="checkbox" checked={t.isDone} /><span>{t.title}</span>
							<button onClick={onRemovetask}>x</button></li>
					})
				}
			</ul>
			<div>
				<button onClick={() => { props.changefilter('all') }}>ALL</button>
				<button onClick={() => { props.changefilter('active') }}>ACTIVE</button>
				<button onClick={() => { props.changefilter('completed') }}>COMPLETE</button>
			</div>
		</div>
	)
};