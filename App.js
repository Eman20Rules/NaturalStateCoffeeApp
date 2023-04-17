import React, { useState, useEffect, useCallback } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Abel_400Regular } from "@expo-google-fonts/abel";
import {
	HankenGrotesk_300Light,
	HankenGrotesk_600SemiBold,
} from "@expo-google-fonts/hanken-grotesk";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import HomeScreen from "./screens/HomeScreen";
import ActiveSubscriptionsScreen from "./screens/ActiveSubscriptionsScreen";
import CustomNavigationBar from "./components/CustomNavigationBar";
import LogInScreen from "./screens/LoginScreen";
import ViewOrdersScreen from "./screens/ViewOrdersScreen";
import CartScreen from "./screens/CartScreen";
import AccountScreen from "./screens/AccountScreen";
import SignUpScreen from "./screens/SignUpScreen";
import EditAvailableCoffeeScreen from "./screens/EditAvailableCoffeeScreen";
import AdminAddCoffeeScreen from "./screens/AdminAddCoffeeScreen";
import { LoginProvider } from "./context/LoginContext";
import { CartProvider } from "./context/CartContext";
import { MySubscriptionsProvider } from "./context/MySubscriptionsContext";

SplashScreen.preventAutoHideAsync();

const App = () => {
	const Stack = createNativeStackNavigator();

	const [isAppReady, setIsAppReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			let customFonts = {
				Abel_400Regular,
				HankenGrotesk_300Light,
				HankenGrotesk_600SemiBold,
			};
			try {
				await Font.loadAsync(customFonts);
			} catch (e) {
				console.warn(e);
			} finally {
				setIsAppReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (isAppReady) {
		}

		if (!isAppReady) {
			return null;
		}
	});

	return (
		<CartProvider>
			<LoginProvider>
				<MySubscriptionsProvider>
					<NavigationContainer>
						<Stack.Navigator
							initialRouteName="Home"
							screenOptions={{
								headerStyle: { height: 50 },
								header: (props) => <CustomNavigationBar {...props} />,
							}}
						>
							<Stack.Screen name="Home" component={HomeScreen} />
							<Stack.Screen name="Login" component={LogInScreen} />
							<Stack.Screen
								name="ActiveSubscriptions"
								component={ActiveSubscriptionsScreen}
							/>
							<Stack.Screen name="ViewOrders" component={ViewOrdersScreen} />
							<Stack.Screen name="Cart" component={CartScreen} />
							<Stack.Screen name="Account" component={AccountScreen} />
							<Stack.Screen name="SignUp" component={SignUpScreen} />
							<Stack.Screen
								name="EditCoffees"
								component={EditAvailableCoffeeScreen}
							/>
							<Stack.Screen
								name="AdminAddCoffee"
								component={AdminAddCoffeeScreen}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</MySubscriptionsProvider>
			</LoginProvider>
		</CartProvider>
	);
};

export default App;
