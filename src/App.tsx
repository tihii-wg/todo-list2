
import './App.css';
import { Todolist } from './components/Todolist';




function App() {


	return (
		<div className="app">
			<h1 className='logo'>Todo list.</h1>
			<div className='container'>
				<Todolist />
			</div>
		</div>
	)
}

export default App;
