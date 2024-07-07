import { Link } from "react-router-dom";
import { useState } from "react"

async function adduser(email, pass, setErrMsg) {
	const url = "http://localhost:8000/signup";

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
		console.log(result.msg);
		setErrMsg(result);
	} catch (e) {
		console.log(e);
	}
}


const SignUp = () => {
	const [pass, setPass] = useState("")
	const [email, setEmail] = useState("")
	const [errMsg, setErrMsg] = useState({})

	function handleSubmit(e) {
		e.preventDefault()
		adduser(email, pass, setErrMsg)

	}
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
			<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
				<h2 className="text-2xl font-bold mb-4">Signup</h2>
				<form>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
							Name
						</label>
						<input
							type="text"
							id="name"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
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
						Signup
					</button>
				</form>
				<div className="text-center mt-4">
					<Link to="/login" className="text-blue-500 hover:text-blue-700">
						Already have an account? Login
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
