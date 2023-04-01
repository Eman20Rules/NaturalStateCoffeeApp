import React, { useState, route, useEffect } from "react";

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

function App() {
  const Stack = createNativeStackNavigator();
  //   const [test, setTest] = useState();

  //   function LoggedIn(userToken) {
  //     setTest(userToken);
  //     console.log("user token from method: ", userToken);
  //     console.log("user token global: ", test);
  //     console.log("It worked!!!");
  //   }

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       setTest(token);
  //       console.log(test);
  //     }
  //   }, []);

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
        <Stack.Screen
          name="Login"
          component={LogInScreen}
          //   initialParams={{ handleLoggedIn: LoggedIn }}
          //   options={(route) => ({ userTokenG: route.params.userToken })}
        />

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

export default App;
