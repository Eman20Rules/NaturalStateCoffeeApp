import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, Abel_400Regular } from "@expo-google-fonts/abel";
import {
	HankenGrotesk_300Light,
	HankenGrotesk_600SemiBold,
} from "@expo-google-fonts/hanken-grotesk";
import AppLoading from "expo-app-loading";

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

const App = () => {
	const Stack = createNativeStackNavigator();

	const [fontsLoaded] = useFonts({
		Abel_400Regular,
		HankenGrotesk_300Light,
		HankenGrotesk_600SemiBold,
	});

	//Apploading is deprecated, but SplashScreen isn't going away once the fonts are loaded.
	//An error that Abel is not loaded is thrown and the SplashScreen never goes away.
	if (!fontsLoaded) {
		return <AppLoading />;
	}

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
