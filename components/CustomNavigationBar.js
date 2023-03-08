import { StyleSheet, Text } from "react-native";
import { Appbar, Menu, Provider } from "react-native-paper";
import { useState } from "react";

// function CustomNavigationBar({ navigation, back }) {
//   const [visible, setVisible] = React.useState(false);
//   const openMenu = () => setVisible(true);
//   const closeMenu = () => setVisible(false);

//   return (
//     <Appbar.Header>
//       {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
//       <Appbar.Content title="My awesome app" />
//       {!back ? (
//         <Menu
//           visible={visible}
//           onDismiss={closeMenu}
//           anchor={
//             <Appbar.Action icon="menu" color="white" onPress={openMenu} />
//           }>
//           <Menu.Item onPress={() => {console.log('Option 1 was pressed')}} title="Option 1" />
//           <Menu.Item onPress={() => {console.log('Option 2 was pressed')}} title="Option 2" />
//           <Menu.Item onPress={() => {console.log('Option 3 was pressed')}} title="Option 3" disabled />
//         </Menu>
//       ) : null}
//     </Appbar.Header>
//   );
// }

function CustomNavigationBar({ navigation }) {
  const [visible, setVisible] = useState(false);

  const closeMenu = () => setVisible(false);
  const openMenu = (v) => setVisible(true);

  return (
    <Provider>
      <Appbar.Header style={style.appBar}>
        <Appbar.Action
          style={style.profile}
          icon="account"
          onPress={() => navigation.navigate("Account")}
        />
        <Appbar.Content style={style.title} title="Natural State" />
        <Appbar.Action
          style={style.cart}
          icon="cart"
          onPress={() => navigation.navigate("Cart")}
        />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action style={style.menu} icon="menu" onPress={openMenu} />
          }
        >
          {/* <Menu.Item onPress={() => navigation.navigate("Home")} title="Home" />
          <Menu.Item
            onPress={() => navigation.navigate("Login")}
            title="Sign Up / Login"
          />
          <Menu.Item
            onPress={() => navigation.navigate("ActiveSubscriptions")}
            title="View Active Subscriptions"
          />
          <Menu.Item
            onPress={() => navigation.navigate("ViewOrders")}
            title="View Orders"
          /> */}
          <Text
            style={style.menuItems}
            onPress={() => navigation.navigate("Home")}
          >
            Home
          </Text>
          <Text
            style={style.menuItems}
            onPress={() => navigation.navigate("Login")}
          >
            Sign Up / Login
          </Text>
          <Text
            style={style.menuItems}
            onPress={() => navigation.navigate("ActiveSubscriptions")}
          >
            &nbsp;&nbsp;&nbsp;View Active Subscriptions&nbsp;&nbsp;&nbsp;
          </Text>
          <Text
            style={style.menuItems}
            onPress={() => navigation.navigate("ViewOrders")}
          >
            View Orders
          </Text>
        </Menu>
      </Appbar.Header>
    </Provider>
  );
}

const style = StyleSheet.create({
  menu: {
    alignItems: "right",
    justifyContent: "center",
    backgroundColor: "white",
  },
  cart: {
    alignItems: "right",
    justifyContent: "center",
    backgroundColor: "white",
  },
  profile: {
    alignItems: "right",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    textColor: "white",
  },
  appBar: {
    backgroundColor: "#32a869",
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
