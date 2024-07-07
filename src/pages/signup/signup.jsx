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

export default function SignUp() {
	const [pass, setPass] = useState("")
	const [email, setEmail] = useState("")
	const [errMsg, setErrMsg] = useState({})

	function handleSubmit(e) {
		e.preventDefault()
		adduser(email, pass, setErrMsg)

	}
	return (
		<>
			{!errMsg.msg ? "" : (
				<div>
					<span style={errMsg.error ? { color: "red" } : { color: "cyan" }}>{errMsg.msg}</span>
				</div>
			)
			}
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">email:</label>
				<input required type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />

				<label htmlFor="password">password:</label>
				<input required type="password" id="password" value={pass} onChange={(e) => setPass(e.target.value)} /> <br />

				<button>Submit</button>
			</form>
		</>
	)
}
