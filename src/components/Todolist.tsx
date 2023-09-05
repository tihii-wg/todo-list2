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
	filter: FiltersValueType
}

export function Todolist(props: PropsType) {

	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [error, setError] = useState<string | null>(null);


	const addTask = () => {
		if (newTaskTitle.trim() !== "") {
			props.addTask(newTaskTitle)
			setNewTaskTitle("")
		} else {
			setError("Field is requared")
			setNewTaskTitle("")
		}
	}
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.target.value)
		setError(null)
	}
	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			addTask();
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
				className={error ? "error" : ""}
			/>
			<button onClick={addTask}>+</button>
			{error && <div className="error-message">{error}</div>}
			<ul>
				{
					props.tasks.map(t => {
						const onAllClickHandler = () => { props.removeTask(t.id) }
						const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
							props.changeStatus(t.id, e.target.checked)
						}
						return <li key={t.id} className={t.isDone ? "is-done" : ""}><input
							type="checkbox"
							checked={t.isDone}
							onChange={onChangeHandler} />
							{t.title}
							<button onClick={onAllClickHandler}>x</button>

						</li>
					})
				}
			</ul>
			<button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
			<button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
			<button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
		</div>
	)
}
