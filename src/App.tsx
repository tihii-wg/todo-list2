import { useState } from 'react';
import './App.css';
import { Todolist, TaskArray } from './components/Todolist';
import uuid from 'react-uuid';

export type FiltersValueType = "all" | "active" | "completed";

function App() {
	const [tasks, setTasks] = useState<Array<TaskArray>>([
		{ id: uuid(), title: "react", isDone: true },
		{ id: uuid(), title: "js", isDone: true },
		{ id: uuid(), title: "css", isDone: false },
		{ id: uuid(), title: "redux", isDone: true }]);

	const [filter, setFilter] = useState<FiltersValueType>("all")


	let tasksForTodolist = tasks;
	if (filter === "completed") {
		tasksForTodolist = tasks.filter(t => t.isDone === true);
	}
	if (filter === "active") {
		tasksForTodolist = tasks.filter(t => t.isDone === false);
	}

	function setTaskFilter(value: FiltersValueType) {
		setFilter(value);
	}
	function removeTask(id: string) {
		let newTasks = tasks.filter(t => t.id !== id)
		setTasks(newTasks)
	}
	function addTask(title: string) {
		let task = { id: uuid(), title: title, isDone: false }
		let newTasks = [task, ...tasks]
		setTasks(newTasks);
	}
	function changeStatus(id: string, isDone: boolean) {
		let task = tasks.find(t => t.id == id);
		if (task) {
			task.isDone = isDone;
		}
		setTasks([...tasks]);
	}
	return (
		<div className="App">
			<Todolist
				title={"Want to learn"}
				tasks={tasksForTodolist}
				removeTask={removeTask}
				setTaskFilter={setTaskFilter}
				addTask={addTask}
				changeStatus={changeStatus} />
		</div>
	)
}

export default App;
