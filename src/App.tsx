import { useState } from 'react';
import './App.css';
import { Todolist, TaskArray } from './components/Todolist';
import uuid from 'react-uuid';

export type FiltersValueType = "all" | "active" | "completed";

type TodoListType = {
	id: string
	title: string
	filter: FiltersValueType
}

function App() {

	function removeTask(id: string, todoListId: string) {
		let tasks = allTasks[todoListId]
		let newTasks = tasks.filter(t => t.id !== id)
		allTasks[todoListId] = newTasks
		setAllTasks({ ...allTasks });
	}
	function addTask(title: string, todoListId: string) {
		let task = { id: uuid(), title: title, isDone: false }
		let tasks = allTasks[todoListId]
		let newTasks = [task, ...tasks]
		allTasks[todoListId] = newTasks
		setAllTasks({...allTasks});
	}
	function changeStatus(id: string, isDone: boolean, todoListId: string) {
		let tasks = allTasks[todoListId]
		let task = tasks.find(t => t.id == id);
		if (task) {
			task.isDone = isDone;
			setAllTasks({ ...allTasks });
		}
	}


	function setTaskFilter(value: FiltersValueType, todoListId: string) {
		let todoList = todoLists.find(tl => tl.id == todoListId);
		if (todoList) {
			todoList.filter = value;
		}
		setTodolist([...todoLists]);
	}
	let todolistId1 = uuid();
	let todolistId2 = uuid();

	const [todoLists, setTodolist] = useState<Array<TodoListType>>([
		{ id: todolistId1, title: "Want to learn", filter: "all" },
		{ id: todolistId2, title: "Want to buy", filter: "all" }
	]);

	const [allTasks, setAllTasks] = useState({
		[todolistId1]: [
			{ id: uuid(), title: "react", isDone: true },
			{ id: uuid(), title: "js", isDone: true },
			{ id: uuid(), title: "css", isDone: false },
			{ id: uuid(), title: "redux", isDone: true }],
		[todolistId2]: [
			{ id: uuid(), title: "book", isDone: false },
			{ id: uuid(), title: "bicycle", isDone: true }]
	})

	return (
		<div className="App">
			{
				todoLists.map(tl => {
					let tasksForTodolist = allTasks[tl.id];
					if (tl.filter === "completed") {
						tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
					}
					if (tl.filter === "active") {
						tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
					}
					return <Todolist
						key={tl.id}
						id={tl.id}
						title={tl.title}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						setTaskFilter={setTaskFilter}
						addTask={addTask}
						changeStatus={changeStatus}
						filter={tl.filter} />
				})
			}

		</div>
	)
}

export default App;
