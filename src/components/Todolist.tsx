import { useState, ChangeEvent, KeyboardEvent } from "react"
import { FiltersValueType } from "../App"


export type TaskArray = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	title: string
	tasks: Array<TaskArray>
	removeTask: (id: string) => void
	setTaskFilter: (value: FiltersValueType) => void
	addTask: (title: string) => void
	changeStatus: (id: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {

	const [newTaskTitle, setNewTaskTitle] = useState("");


	const addTask = () => {
		if (newTaskTitle.trim() !== "") {
			props.addTask(newTaskTitle)
			setNewTaskTitle("")
		}
	}
	const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
		setNewTaskTitle(e.target.value)
	}
	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (newTaskTitle.trim() !== "" && e.key === "Enter") {
			props.addTask(newTaskTitle);
			setNewTaskTitle("")
		}
	}

	const onAllClickHandler = () => { props.setTaskFilter("all") }
	const onActiveClickHandler = () => { props.setTaskFilter("active") }
	const onCompletedClickHandler = () => { props.setTaskFilter("completed") }

	return (
		<div>
			<h1>{props.title}</h1>
			<input type="text"
				value={newTaskTitle}
				onChange={onChangeHandler}
				onKeyDown={onKeyDownHandler}
			/>
			<button onClick={addTask}>+</button>
			<ul>
				{
					props.tasks.map(t => {
						const onAllClickHandler = () => { props.removeTask(t.id) }
						const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { props.changeStatus(t.id, e.target.checked) }
						return <li><input
							type="checkbox"
							checked={t.isDone}
							onChange={onChangeHandler} />
							{t.title}
							<button onClick={onAllClickHandler}>x</button>
						</li>
					})
				}
			</ul>
			<button onClick={onAllClickHandler}>All</button>
			<button onClick={onActiveClickHandler}>Active</button>
			<button onClick={onCompletedClickHandler}>Completed</button>
		</div>
	)
}
