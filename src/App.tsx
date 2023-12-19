
import './App.css';




function App() {


	return (
		<div className="app">
			<div className='container'>
				<h1>What to learn.</h1>
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
		</div>
	)
}

export default App;
