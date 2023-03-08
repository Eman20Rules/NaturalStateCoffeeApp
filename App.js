import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ActiveSubscriptionsScreen from "./screens/ActiveSubscriptionsScreen";
import CustomNavigationBar from "./components/CustomNavigationBar";
import LogInScreen from "./screens/LoginScreen";
import ViewOrdersScreen from "./screens/ViewOrdersScreen";
import CartScreen from "./screens/CartScreen";
import AccountScreen from "./screens/AccountScreen";
import SignUpScreen from "./screens/SignUpScreen";

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
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
};

export default App;
