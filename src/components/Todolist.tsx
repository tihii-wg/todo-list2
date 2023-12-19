


export function Todolist(props: PropsType) {
	return (
		<div className="todolist-iner">
			<h3>{props.title}</h3>
			<div>
				<input type="text" />
				<button>+</button>
			</div>
			<ul>
				<li><input type="checkbox" checked={} /><span>{}</span></li>
				<li><input type="checkbox" checked={} /><span>{}</span></li>
				<li><input type="checkbox" checked={} /><span>{}</span></li>
			</ul>
			<div>
				<button>ALL</button>
				<button>ACTIVE</button>
				<button>COMPLETE</button>
			</div>
		</div>
	)
};