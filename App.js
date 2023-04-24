import "react-native-gesture-handler";
import React, { useState, useEffect, useCallback } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Abel_400Regular } from "@expo-google-fonts/abel";
import {
	HankenGrotesk_300Light,
	HankenGrotesk_600SemiBold,
} from "@expo-google-fonts/hanken-grotesk";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "./screens/HomeScreen";
import ActiveSubscriptionsScreen from "./screens/ActiveSubscriptionsScreen";
import CustomNavigationBar from "./components/CustomNavigationBar";
import CustomStackNavigationBar from "./components/CustomStackNavigationBar";
import LogInScreen from "./screens/LoginScreen";
import ViewOrdersScreen from "./screens/ViewOrdersScreen";
import CartScreen from "./screens/CartScreen";
import AccountScreen from "./screens/AccountScreen";
import SignUpScreen from "./screens/SignUpScreen";
import EditAvailableCoffeeScreen from "./screens/EditAvailableCoffeeScreen";
import AdminAddCoffeeScreen from "./screens/AdminAddCoffeeScreen";
import AdminEditCoffeeScreen from "./screens/AdminEditCoffeeScreen";
import { LoginProvider } from "./context/LoginContext";
import { CartProvider } from "./context/CartContext";
import { MySubscriptionsProvider } from "./context/MySubscriptionsContext";
import DrawerWindow from "./components/DrawerWindow";
import { Dimensions } from "react-native";

SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const width = Dimensions.get("window").width;

const App = () => {
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
			await SplashScreen.hideAsync();
		}
	}, [isAppReady]);

	if (!isAppReady) {
		return null;
	}

	const Root = () => {
		return (
			<Drawer.Navigator
				initialRouteName="Home"
				drawerContent={DrawerWindow}
				screenOptions={{
					headerStyle: { height: 50 },
					header: (props) => (
						<CustomNavigationBar {...props} windowWidth={width} />
					),
					drawerStyle: {
						width: "80%",
					},
					drawerType: "slide",
				}}
			>
				<Drawer.Screen name="Home" component={HomeScreen} />
				<Drawer.Screen name="Login" component={LogInScreen} />
				<Drawer.Screen
					name="ActiveSubscriptions"
					component={ActiveSubscriptionsScreen}
				/>
				<Drawer.Screen name="ViewOrders" component={ViewOrdersScreen} />

				<Drawer.Screen name="SignUp" component={SignUpScreen} />
				<Drawer.Screen
					name="EditCoffees"
					component={EditAvailableCoffeeScreen}
				/>
			</Drawer.Navigator>
		);
	};

	return (
		<CartProvider>
			<LoginProvider>
				<MySubscriptionsProvider>
					<SafeAreaProvider>
						<NavigationContainer>
							<Stack.Navigator
								screenOptions={{
									headerStyle: { height: 50 },
									header: (props) => <CustomStackNavigationBar {...props} />,
								}}
							>
								<Stack.Screen
									name="Root"
									component={Root}
									options={{ headerShown: false }}
								/>
								<Stack.Screen name="Cart" component={CartScreen} />
								<Stack.Screen name="Account" component={AccountScreen} />
								<Stack.Screen
									name="AdminAddCoffee"
									component={AdminAddCoffeeScreen}
								/>
								<Stack.Screen
									name="AdminEditCoffee"
									component={AdminEditCoffeeScreen}
								/>
							</Stack.Navigator>
						</NavigationContainer>
					</SafeAreaProvider>
				</MySubscriptionsProvider>
			</LoginProvider>
		</CartProvider>
	);
};

export default App;
