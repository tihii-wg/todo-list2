import { useState, ChangeEvent, KeyboardEvent } from "react"
import { FiltersValueType } from "../App"
import { InputForm } from "./InputForm"
import { EditSpan } from "./EditSpan"

export type TaskArray = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskArray>
	removeTask: (id: string, todoListId: string) => void
	setTaskFilter: (value: FiltersValueType, todoListId: string) => void
	addTask: (title: string, todoListId: string) => void
	changeStatus: (id: string, isDone: boolean, todoListId: string) => void
	deleteTodoList: (todoListId: string) => void
	filter: FiltersValueType
}

export function Todolist(props: PropsType) {





	const deleteTodoListHandler = () => {
		props.deleteTodoList(props.id)
	}
	const onAllClickHandler = () => { props.setTaskFilter("all", props.id) }
	const onActiveClickHandler = () => { props.setTaskFilter("active", props.id) }
	const onCompletedClickHandler = () => { props.setTaskFilter("completed", props.id) }

	const addTask = (title: string) => {
		props.addTask(title, props.id)
	}

	return (
		<div>
			<h1>{props.title}<button onClick={deleteTodoListHandler} >X</button></h1>
			<InputForm addItem={addTask} />
			<ul>
				{
					props.tasks.map(t => {
						const onAllClickHandler = () => { props.removeTask(t.id, props.id) }
						const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
							props.changeStatus(t.id, e.target.checked, props.id)
						}
						return <li key={t.id} className={t.isDone ? "is-done" : ""}>
							<input
								type="checkbox"
								checked={t.isDone}
								onChange={onChangeHandler} />
							<EditSpan title={t.title}/>
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


