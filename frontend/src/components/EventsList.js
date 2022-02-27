import React, {useState} from "react";
import {serverUrl} from '../App'

function EventsList({id}) {
	let events;

    async function getEvents() {
        let res = await fetch(`http://${serverUrl}/user/events`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                "Access-Control-Allow-Origin": `http://${serverUrl}`,
            },
            body: JSON.stringify({
                userID: id
            })
        })
		events = await res.json();
    }
	getEvents();
	if (events === undefined) {
		return (<div className="eventsList">No events</div>)
	}
	return (
		<div className="eventsList">
			{events.map((event, i) => {
				if (event !== undefined) {
				<div className="event box" key={i}>
					<p className="title">{event.title}</p>
					<p className="description">{event.description}</p>
					<p>{event.date}</p>
				</div> 
				}
			})}
		</div>
	)
}

export default EventsList