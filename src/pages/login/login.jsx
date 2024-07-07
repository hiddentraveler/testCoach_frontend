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

export default function LogIn() {
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
		<>
			{}
			{!msg.msg ? "" : (
				<div>
					<span style={msg.error ? { color: "red" } : { color: "cyan" }}>{msg.msg}</span>
				</div>
			)
			}
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">email:</label>
				<input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />

				<label htmlFor="password">password:</label>
				<input type="password" id="password" value={pass} onChange={(e) => setPass(e.target.value)} /> <br />

				<button>Submit</button>
			</form>
		</>
	)
}
