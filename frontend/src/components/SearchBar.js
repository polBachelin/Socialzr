import React, {useState, useEffect} from "react";
import {serverUrl} from '../App'
import Modal from '../Modal/Modal'
import toggleModal from '../Modal/ToggleModal';
import ClubList from "./ClubList";

function SearchBar() {
	const [details, setDetails] = useState({value: ""})
    const [clubData, setClubData] = useState([{name: "", description: ""}])

	async function fetchData() {
		await fetch(`http://${serverUrl}/club`, {
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
			setClubData(res)
			console.log(clubData)
		})
	}

	return (
		<div className="searchWrap">
			<div className="search">
				<input placeholder="Find a club" type="text" name="search" className="searchTerm" onChange={e => { setDetails({...details, value: e.target.value}); fetchData();}} value={details.value}/>
			</div>
			<div className="searchResults">
			{(details.value !== '') ? (
				<ClubList clubs={clubData.filter(post => {
					if (details.value === '')
						return null
					if (post.name.toLowerCase().includes(details.value.toLowerCase())) {
						return post;
					}
				})}/>
			) : null}
			</div>
		</div>
	)
}

export default SearchBar