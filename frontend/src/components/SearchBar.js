import React, {useState, useEffect} from "react";
import {serverUrl} from '../App'
import Modal from '../Modal/Modal'
import toggleModal from '../Modal/ToggleModal';
import ClubPage from "./ClubPage";

function SearchBar() {
	const [details, setDetails] = useState({value: ""})
    const [clubData, setClubData] = useState([{name: "", description: ""}])
	const [clickedClub, setClickedClub] = useState({});
	const {
		isShowing: isClubPageShowed,
		toggle: toggleClubPage
	} = toggleModal();


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
		<div className="search">
			<input placeholder="Find a club" type="text" name="search" id="search" onChange={e => { setDetails({...details, value: e.target.value}); fetchData();}} value={details.value}/>
			{(details.value !== '') ? clubData.filter(post => {
				if (details.value === '')
					return null
				if (post.name.toLowerCase().includes(details.value.toLowerCase())) {
					return post;
				}
			}).map((post, index) => (
				<div className="box" key={index} onClick={e => {setClickedClub(post); toggleClubPage();}}>
					<p>{post.name}</p>
					<p>{post.description}</p>
				</div>
			)) : null}
			<Modal
			isShowing={isClubPageShowed}
			hide={toggleClubPage}
			title={clickedClub.name}>
				<ClubPage clubData={clickedClub}/>
			</Modal>
		</div>
	)
}

export default SearchBar