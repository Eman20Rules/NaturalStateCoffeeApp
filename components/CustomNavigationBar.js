import { StyleSheet } from "react-native";
import { Appbar, Menu, Provider } from "react-native-paper";
import { useState, useContext } from "react";
import LoginContext from "../context/LoginContext";

function CustomNavigationBar({ navigation }) {
  const [visible, setVisible] = useState(false);
  const { isLoggedIn, isAdmin } = useContext(LoginContext);

  return (
    <Provider>
      <Appbar.Header style={style.appBar}>
        <Appbar.Action
          style={style.profile}
          icon="account"
          onPress={() => navigation.navigate("Account")}
        />
        <Appbar.Content titleStyle={style.title} title="NATURAL STATE" />
        <Appbar.Action
          style={style.cart}
          icon="cart"
          onPress={() => navigation.navigate("Cart")}
        />
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Appbar.Action
              style={style.menu}
              icon="menu"
              onPress={() => setVisible(true)}
            />
          }
        >
          <Menu.Item
            onPress={() => {
              setVisible(false);
              navigation.navigate("Home");
            }}
            title="Home"
          />

          <Menu.Item
            onPress={() => {
              setVisible(false);

              if (isLoggedIn()) {
                navigation.navigate("Account");
              } else {
                navigation.navigate("Login");
              }
            }}
            title={isLoggedIn() ? "View Account" : "Login (Sign Up)"}
          />

          {/* <LogInOrViewAccount loggedInProp={isLoggedIn} /> */}

          <Menu.Item
            onPress={() => {
              setVisible(false);
              navigation.navigate("ActiveSubscriptions");
            }}
            title="View Active Subscriptions"
          />
          <Menu.Item
            onPress={() => {
              setVisible(false);
              navigation.navigate("ViewOrders");
            }}
            title={isAdmin ? "View All Orders" : ""}
            disabled={!isAdmin}
          />
        </Menu>
      </Appbar.Header>
    </Provider>
  );
}

// export function LogInOrViewAccount() {
//   loggedInProp ? (
//     <Menu.Item
//       onPress={() => {
//         setVisible(false);

//         navigation.navigate("Account");
//       }}
//       title={"View Account"}
//     />
//   ) : (
//     <Menu.Item
//       onPress={() => {
//         setVisible(false);

//         navigation.navigate("Login");
//       }}
//       title={"Login (Sign Up)"}
//     />
//   );
// }

const style = StyleSheet.create({
  menu: {
    justifyContent: "center",
  },
  cart: {
    justifyContent: "center",
  },
  profile: {
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#4a402a",
  },
  appBar: {
    height: 50,
    borderBottomColor: "#4a402a",
    borderBottomWidth: 2,
  },
  menuItems: {
    flex: 1,
    fontSize: 15,
    textAlignVertical: "center",
    textAlign: "center",
    paddingVertical: 30,
    color: "#1260de",
  },
});

export default CustomNavigationBar;
