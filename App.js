import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, Abel_400Regular } from "@expo-google-fonts/abel";
import { HankenGrotesk_300Light } from "@expo-google-fonts/hanken-grotesk";
import Apploading from 'expo-app-loading'



import HomeScreen from "./screens/HomeScreen";
import ActiveSubscriptionsScreen from "./screens/ActiveSubscriptionsScreen";
import CustomNavigationBar from "./components/CustomNavigationBar";
import LogInScreen from "./screens/LoginScreen";
import ViewOrdersScreen from "./screens/ViewOrdersScreen";
import CartScreen from "./screens/CartScreen";
import AccountScreen from "./screens/AccountScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AppLoading from "expo-app-loading";







export default function App() {
	const Stack = createNativeStackNavigator();

	const [fontsLoaded] = useFonts({

		Abel_400Regular,
		HankenGrotesk_300Light
	})


	

	//Apploading is deprecated, but SplashScreen isn't going away once the fonts are loaded. 
	//An error that Abel is not loaded is thrown and the SplashScreen never goes away.
	if (!fontsLoaded) {
		return <AppLoading/>
	}

	return (
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
			</Stack.Navigator>
		</NavigationContainer>
	);
}
