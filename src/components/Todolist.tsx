import { useState, ChangeEvent, KeyboardEvent } from "react"
import { FiltersValueType } from "../App"


export type TaskArray = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id:string
	title: string
	tasks: Array<TaskArray>
	removeTask: (id: string,todoListId:string) => void
	setTaskFilter: (value: FiltersValueType,todoListId:string) => void
	addTask: (title: string,todoListId:string) => void
	changeStatus: (id: string, isDone: boolean,todoListId:string) => void
	filter: FiltersValueType
}

export function Todolist(props: PropsType) {

	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [error, setError] = useState<string | null>(null);


	const addTask = () => {
		if (newTaskTitle.trim() !== "") {
			props.addTask(newTaskTitle,props.id)
			setNewTaskTitle("")
		} else {
			setError("Field is requared")
			
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

	const onAllClickHandler = () => { props.setTaskFilter("all",props.id) }
	const onActiveClickHandler = () => { props.setTaskFilter("active",props.id) }
	const onCompletedClickHandler = () => { props.setTaskFilter("completed",props.id) }

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
						const onAllClickHandler = () => { props.removeTask(t.id,props.id) }
						const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
							props.changeStatus(t.id, e.target.checked,props.id)
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
