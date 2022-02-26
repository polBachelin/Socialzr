import React, {useState} from 'react'

function RegisterForm({Register, error}) {
	const [details, setDetails] = useState({email: "", password: ""})

	const submitHandler  = e => {
		e.preventDefault();
		Register(details)
	}

	return (
		<form onSubmit={submitHandler}>
			<div className="form-inner">
				<h2>Register</h2>
				{(error != "") ? (<div className="error">{error}</div>) : ""}
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input type="text" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password: </label>
					<input type="password" name="password " id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
				</div>
				<input type="submit" value="REGISTER"/>
			</div>
		</form>	
	)
}

export default RegisterForm