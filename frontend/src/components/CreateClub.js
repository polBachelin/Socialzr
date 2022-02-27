import React, {useState} from "react";
import Popup from 'reactjs-popup'
import {serverUrl} from '../App'

function CreateClub({toggle, id, tooltip}) {

	const [details, setDetails] = useState({title: "", description: ""})
	const [error, setError] = useState("")

	const submitHandler  = async e => {
		let found = false;
		e.preventDefault();

		await fetch(`http://${serverUrl}/club?name=${details.title}`, {
	        headers: {
                Accept: "application/json",
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                "Access-Control-Allow-Origin": `http://${serverUrl}`,
            }
		}).then(res => {
			if (res.ok) {
				setError("This club already exists choose another name")
				found = true;
			}
		})
		if (found) return;
		await fetch(`http://${serverUrl}/club`, {
			method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                "Access-Control-Allow-Origin": `http://${serverUrl}`,
            },
			body: JSON.stringify({
				name: details.title,
				description: details.description,
				members: [],
				events: [],
				admins: [id]
			})
		}).then(function (res) { 
			if (res.ok)
				return res.json();
		})
		tooltip(true)
		toggle()
	}

	return (
		<form onSubmit={submitHandler}>
			<div className="form-inner">
				{(error !== "") ? (<div className="error">{error}</div>) : ""}
				<div className="form-group">
					<label htmlFor="title">Title:</label>
					<input type="text" name="title" id="title" onChange={e => setDetails({...details, title: e.target.value})} value={details.title}/>
				</div>
				<div className="form-group">
					<label htmlFor="desc">Description: </label>
					<input type="desc" name="desc " id="desc" onChange={e => setDetails({...details, description: e.target.value})} value={details.description}/>
				</div>
				<input className="button hover" type="submit" value="Create"/>
			</div>
		</form>
	)
}

export default CreateClub;