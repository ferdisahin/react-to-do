import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";

function App() {
	const [todos, setTodos] = useState(() => {
		const savedTodos = localStorage.getItem('todos')

		if (savedTodos) {
			return JSON.parse(savedTodos)
		} else {
			return []
		}
	})

	const [todo, setTodo] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()

		setTodos([...todos, todo])
		setTodo("")
	}

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos))
	}, [todos])

	const deleteItem = (id) => {
		setTodos(todos.filter((o, i) => id !== i))
	}

	return (
		<div className="App">
			<Header />

			<div className="mx-auto max-w-3xl my-10">

				<form className="flex items-center gap-5" onSubmit={handleSubmit}>
					<input type="text" className="h-10 w-full rounded border-2 border-gray-300 outline-none px-3" value={todo} onChange={e => setTodo(e.target.value)} />
					<button className="bg-gray-200 w-20 h-10 rounded text-gray-400 hover:bg-gray-300 transition-all hover:text-gray-700" disabled={!todo} type="submit">Add</button>
				</form>

				{todos.length > 0 && (
					<ul className="mt-10 [&>*]:mb-0.5">
						{todos && todos.map((todo, item) => (
							<li className="bg-gray-100 p-5 text-gray-500 flex items-center" key={item}>
								{todo}
								<button className="bg-red-300 ml-auto text-white hover:bg-red-500 transition-all py-2 px-4 rounded text-xs" onClick={() => deleteItem(item)}>Delete</button>
							</li>
						))}
					</ul>
				)}

				{todos.length === 0 && (
					<div className="p-4 bg-gray-100 text-gray-400 text-sm mt-10">You can start by adding a to-do.</div>
				)}
			</div>
		</div>
	);
}

export default App;
