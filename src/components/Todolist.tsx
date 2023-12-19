


export function Todolist() {
	return (
		<div className="todolist-iner">
			<h3>What to learn.</h3>
			<div>
				<input type="text" />
				<button>+</button>
			</div>
			<ul>
				<li><input type="checkbox" checked={true} /><span>CSS</span></li>
				<li><input type="checkbox" checked={true} /><span>JS</span></li>
				<li><input type="checkbox" checked={false} /><span>React</span></li>
			</ul>
			<div>
				<button>ALL</button>
				<button>ACTIVE</button>
				<button>COMPLETE</button>
			</div>
		</div>
	)
};