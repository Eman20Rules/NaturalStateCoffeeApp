import React, { useEffect, useState, useContext } from "react";

import LoginContext from "./LoginContext";

const MySubscriptionsContext = React.createContext();

export const MySubscriptionsProvider = ({ children }) => {
	const [mySubscriptionList, setMySubscriptionList] = useState([]);
	const [isSubscriptionsRetrieved, setIsSubscriptionsRetrieved] =
		useState(false);

	const { isLoggedIn, userToken } = useContext(LoginContext);

	const subscriptionAPI = () => {
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

	const getMySubscriptionList = () => {
		if (!isLoggedIn()) {
			return;
		}
		setIsSubscriptionsRetrieved(false);
		subscriptionAPI(userToken)
			.then((mySubscriptionCall) => {
				if (mySubscriptionCall.status == 200) {
					setMySubscriptionList(mySubscriptionCall.orders);
				} else if (mySubscriptionCall.message == "Orders not found") {
					setMySubscriptionList([]);
				} else {
					alert(mySubscriptionCall.message);
					console.log(mySubscriptionCall);
					console.log(isSubscriptionsRetrieved);
				}
			})
			.then(setIsSubscriptionsRetrieved(true));
	};

	const updateSubscriptionList = () => {
		getMySubscriptionList();
	};

	const deleteSubscriptionAPI = (subscriptionId) => {
		const deleteAPIurl =
			"https://nsdev1.xyz/index.php?method=deleteSubscription";

		const data = {
			user_coffee_subscription_id: subscriptionId,
		};

		const deleteSubscriptionCall = fetch(deleteAPIurl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			},
			body: JSON.stringify(data),
		}).then((resp) => resp.json());

		return deleteSubscriptionCall;
	};

	const deleteSubscription = (subscriptionId) => {
		return new Promise((resolve) => {
			deleteSubscriptionAPI(subscriptionId).then((deleteSubscriptionCall) => {
				if (
					deleteSubscriptionCall.success == 1 &&
					deleteSubscriptionCall.status == 200
				) {
					alert("Subscription deleted");
					resolve();
				} else {
					alert(deleteSubscriptionCall.message);
				}
			});
		});
	};

	return (
		<MySubscriptionsContext.Provider
			value={{
				mySubscriptionList,
				updateSubscriptionList,
				deleteSubscription,
				isSubscriptionsRetrieved,
			}}
		>
			{children}
		</MySubscriptionsContext.Provider>
	);
};

export default MySubscriptionsContext;
