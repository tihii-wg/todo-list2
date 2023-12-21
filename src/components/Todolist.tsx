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
}

export function Todolist(props: PropsType) {
	return (
		<div className="todolist-iner">
			<h3>{props.title}</h3>
			<div>
				<input type="text" />
				<button>+</button>
			</div>
			<ul>
				{
					props.tasks.map((t) => {
						return <li><input type="checkbox" checked={t.isDone} /><span>{t.title}</span>
							<button onClick={() => { props.removeTask(t.id) }}>x</button></li>
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