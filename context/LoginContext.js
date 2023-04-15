import React, { useState } from "react";

const LoginContext = React.createContext();

export const LoginProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function setSecurityInfo(newUserToken, newIsAdmin) {
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
        setSecurityInfo,
        isLoggedIn,
        email,
        setEmail,
        password,
        setPassword,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
