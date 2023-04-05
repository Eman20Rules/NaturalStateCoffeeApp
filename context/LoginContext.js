import React, { useState } from "react";

const LoginContext = React.createContext();

export const LoginProvider = ({ children }) => {
	const [userToken, setUserToken] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	function setLoginInfo(newUserToken, newIsAdmin) {
		console.log("Function is working!");
		setUserToken(newUserToken);
		setIsAdmin(newIsAdmin);
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
				setLoginInfo: setLoginInfo,
				isLoggedIn: isLoggedIn,
			}}
		>
			{children}
		</LoginContext.Provider>
	);
};

export default LoginContext;
