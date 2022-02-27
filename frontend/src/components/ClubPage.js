import React, {useState} from "react";
import EventsList from "./EventsList";
import {serverUrl} from '../App'

function ClubPage({clubData}) {
	const id = localStorage.getItem('token');
	let admin = false;
	let clubEvents;

	for (let i in clubData.admins) {
		if (clubData.admins[i] === id) {
			admin = true
		}
	}

	async function fetchEvents() {
		await fetch(`http://${serverUrl}/club/${clubData.id}/events`, {
			headers: {
				Accept: "application/json",
				"Content-Type":
					"application/x-www-form-urlencoded; charset=UTF-8",
				"Access-Control-Allow-Origin": `http://${serverUrl}`,
			}
		}).then(res => {
			if (res.ok) {
				return res.json()
			}
		}).then(res => {
			clubEvents = res;
		}).catch(err => {
			console.log(err)
		})
	}
	fetchEvents();
	
	return (
		<div className="club-page">
			<div>
				<p>{clubData.description}</p>
			</div>
			<h2>Events</h2>
			<EventsList events={clubEvents}/>
			{(admin === true) ? (
				<button>Edit Club</button>
			) : (
				<button>Subscribe</button>
			)}
		</div>
	)
}

export default ClubPage