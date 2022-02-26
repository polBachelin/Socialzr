import React, {useState} from "react";

function SearchBar({Data}) {
	const [details, setDetails] = useState({value: ""})

	return (
		<div className="form-inner search">
			<label>Find a club :</label>
			<input placeholder="Find a club" type="text" name="search" id="search" onChange={e => setDetails({...details, value: e.target.value})} value={details.value}/>
			{(Data !== undefined) ? Data.filter(post => {
				if (details.value === '')
					return null
				if (post.title.toLowerCase().includes(details.value.toLowerCase())) {
					return post;
				}
			}).map((post, index) => (
				<div className="box" key={index}>
					<p>{post.title}</p>
					<p>{post.description}</p>
				</div>
			)) : null}
		</div>
	)
}

export default SearchBar