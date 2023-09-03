import { useState } from 'react';
import './App.css';
import { Todolist } from './components/Todolist';
import uuid from 'react-uuid';

function App() {
	const [tasks, setTasks] = useState([
		{ id: uuid(), title: "react", isDone: true },
		{ id: uuid(), title: "js", isDone: true },
		{ id: uuid(), title: "css", isDone: false },
		{ id: uuid(), title: "redux", isDone: true }]);
		
	const [filter, setFilter] = useState("all")
	let tasksForTodolist = tasks;
	if (filter === "completed") {
		tasksForTodolist.filter(t => t.isDone === true)
	}
	function removeTask(id: string) {
		let newTasks = tasks.filter(t => t.id !== id)
		setTasks(newTasks)
	}



	return (
		<div className="App">
			<Todolist
				title={"Want to learn"}
				tasks={tasks}
				removeTask={removeTask} />
		</div>
	)
}

export default App;
