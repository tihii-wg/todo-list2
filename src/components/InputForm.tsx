import { useState, ChangeEvent, KeyboardEvent } from "react"

type InputFormType={
	addItem: (title:string) => void
}
export function InputForm(props:InputFormType) {
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [error, setError] = useState<string | null>(null);

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.target.value)
		setError(null)
	}
	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			addTask();
		}
	}
	const addTask = () => {
		if (newTaskTitle.trim() !== "") {
			props.addItem(newTaskTitle)
			setNewTaskTitle("")
		} else {
			setError("Field is requared")

		}
	}
	return (
		<div>
			<input type="text"
				value={newTaskTitle}
				onChange={onChangeHandler}
				onKeyDown={onKeyDownHandler}
				className={error ? "error" : ""}
			/>
			<button onClick={addTask}>+</button>
			{error && <div className="error-message">{error}</div>}
		</div>
	)
}