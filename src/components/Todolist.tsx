
type TaskArray = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	title: string
	tasks: Array<TaskArray>
	removeTask: (id: string) => void
}
  
export function Todolist(props: PropsType) {
	return (
		<div>
			<h1>{props.title}</h1>
			<input type="text" />
			<button>+</button>
			<ul>
				{
					props.tasks.map(t =>
						<li><input
							type="checkbox"
							checked={t.isDone} />{t.title}
							<button onClick={() => { props.removeTask(t.id) }}>x</button>
						</li>
					)
				}
			</ul>
			<button>All</button>
			<button>Active</button>
			<button>Completed</button>
		</div>
	)
}