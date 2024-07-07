import { useState } from "react"

async function getUser(email, pass, setMsg) {
	const url = "http://localhost:8000/login";

	const options = {
		mode: "cors",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Host": "http://localhost:8000/",
			"Origin": "http://localhost:5173/"
		},
		body: JSON.stringify({
			email: email,
			pass: pass
		})
	};

	try {

		const response = await fetch(url, options);
		const result = await response.json()
		console.log(result);
		if (result.error) {

			setMsg(result);
		} else {
			setMsg({});
			localStorage.setItem("user", JSON.stringify(result))
		}
	} catch (e) {
		console.log(e);
	}
}

import { Link } from "react-router-dom";
const LogIn = () => {
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")
	const [msg, setMsg] = useState({})

	function handleSubmit(e) {
		e.preventDefault()
		getUser(email, pass, setMsg)
	}

	if (localStorage.getItem('user')) {
		location.replace('/');
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
			<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
				<h2 className="text-2xl font-bold mb-4">Login</h2>
				<form>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							id="email"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
					>
						Login
					</button>
				</form>
				<div className="text-center mt-4">
					<Link to="/signup" className="text-blue-500 hover:text-blue-700">
						Create an account
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LogIn;
