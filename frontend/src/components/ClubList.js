import React, {useState} from "react";
import ClubPage from "./ClubPage";
import Modal from "../Modal/Modal";
import toggleModal from '../Modal/ToggleModal';

function ClubList({clubs}) {
	const [clickedClub, setClickedClub] = useState({});

	const {
		isShowing: isClubPageShowed,
		toggle: toggleClubPage
	} = toggleModal();

	return (
		<div>
		{clubs.map((post, index) => (
			<div className="box" key={index} onClick={e => {setClickedClub(post); toggleClubPage();}}>
				<p>{post.name}</p>
				<p>{post.description}</p>
			</div>
		))}
		<Modal
			isShowing={isClubPageShowed}
			hide={toggleClubPage}
			title={clickedClub.name}>
			<ClubPage clubData={clickedClub}/>
		</Modal>
		</div>
	)
}

export default ClubList;