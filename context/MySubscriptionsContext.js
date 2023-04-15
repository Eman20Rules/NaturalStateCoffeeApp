import React, { useEffect, useState, useContext } from "react";

import LoginContext from "./LoginContext";

const MySubscriptionsContext = React.createContext();

export const MySubscriptionsProvider = ({ children }) => {
	const [mySubscriptionList, setMySubscriptionList] = useState([]);
	const [mySubscriptionsLoaded, setMySubscriptionLoaded] = useState(false);
	const { isLoggedIn } = useContext(LoginContext);

	const subscriptionAPI = (userToken) => {
		const insertApiUrl =
			"https://nsdev1.xyz/index.php?method=getMyUserSubscription";

		const mySubscriptionCall = fetch(insertApiUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			},
		}).then((resp) => resp.json());

		return mySubscriptionCall;
	};

	const getMySubscriptionList = async (userToken) => {
		if (!isLoggedIn()) {
			return false;
		}
		subscriptionAPI(userToken).then((mySubscriptionCall) => {
			if (mySubscriptionCall.status == 200) {
				console.log(mySubscriptionCall.orders);
				setMySubscriptionList(mySubscriptionCall.orders);
			} else {
				alert(mySubscriptionCall.message);
			}
		});
		return true;
	};

	const updateSubscriptionList = async (userToken) => {
		setMySubscriptionLoaded(false);
		const loadingDone = await getMySubscriptionList(userToken);
		setMySubscriptionLoaded(loadingDone);
	};

	return (
		<MySubscriptionsContext.Provider
			value={{
				mySubscriptionList,
				updateSubscriptionList,
				mySubscriptionsLoaded,
			}}
		>
			{children}
		</MySubscriptionsContext.Provider>
	);
};

export default MySubscriptionsContext;
