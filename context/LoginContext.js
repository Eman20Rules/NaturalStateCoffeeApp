import React, { useState } from "react";

const LoginContext = React.createContext();

export const LoginProvider = ({ children }) => {
	const [userToken, setUserToken] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	setLogin = (newUserToken, newIsAdmin) => {
		setUserToken(newUserToken);
		setIsAdmin(newIsAdmin);
	};

	isLoggedIn = () => {
		if (userToken == "") {
			return false;
		}
		return true;
	};

	return (
		<LoginContext.Provider value={{ userToken, isAdmin, setLogin, isLoggedIn }}>
			{children}
		</LoginContext.Provider>
	);
};

export default LoginContext;
