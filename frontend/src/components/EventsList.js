import React, {useState} from "react";
import {serverUrl} from '../App'

function EventsList({events}) {

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