import { useState } from "react";

const ToggleModal = () => {
	const [isShowing, setIsShowing] = useState(false);
  
	function toggle() {
	  setIsShowing(!isShowing);
	}
  
	return {
	  isShowing,
	  toggle
	};
  };

export default ToggleModal;