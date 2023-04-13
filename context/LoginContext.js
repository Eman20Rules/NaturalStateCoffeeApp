import React, { useState } from "react";

const LoginContext = React.createContext();

export const LoginProvider = ({ children }) => {
	const [userToken, setUserToken] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	function setLoginInfo(newUserToken, newIsAdmin) {
		setUserToken(newUserToken);
		setIsAdmin(newIsAdmin);
		console.log(userToken);
	}

	function isLoggedIn() {
		if (userToken == "") {
			return false;
		}
		return true;
	}

	return (
		<LoginContext.Provider
			value={{
				userToken,
				isAdmin,
				setLoginInfo,
				isLoggedIn,
			}}
		>
			{children}
		</LoginContext.Provider>
	);
};

export default LoginContext;
