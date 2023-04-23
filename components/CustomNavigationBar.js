import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Appbar, Menu, Provider } from "react-native-paper";
import { useState } from "react";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import MySubscriptionsContext from "../context/MySubscriptionsContext";
import LoginContext from "../context/LoginContext";

function CustomNavigationBar({ navigation }) {
  const [visible, setVisible] = useState(false);
  const { shoppingCart } = useContext(CartContext);
  const { updateSubscriptionList } = useContext(MySubscriptionsContext);
  const { isLoggedIn, isAdmin } = useContext(LoginContext);

  const cartNotificationNumber =
    shoppingCart.length > 0 ? (
      <View style={style.cartNotificationNumberContainer}>
        <Text style={style.cartNotificationNumber}>{shoppingCart.length}</Text>
      </View>
    ) : null;

  const allOrdersMenuItem = isAdmin ? (
    <Menu.Item
      onPress={() => {
        setVisible(false);
        navigation.navigate("ViewOrders");
      }}
      title={"(ADMIN) All User Orders"}
    />
  ) : null;

  const mySubscriptionsMenuItem = isLoggedIn() ? (
    <Menu.Item
      onPress={() => {
        setVisible(false);
        updateSubscriptionList();
        navigation.navigate("ActiveSubscriptions");
      }}
      title="View Active Subscriptions"
    />
  ) : null;

  const editCoffeesMenuItem = isAdmin ? (
    <Menu.Item
      onPress={() => {
        setVisible(false);
        navigation.navigate("EditCoffees");
      }}
      title={"(ADMIN) Edit Available Coffees"}
    />
  ) : null;

  return (
    <Provider>
      <Appbar.Header style={style.appBar}>
        <Appbar.Action
          style={style.profile}
          icon="account"
          onPress={() =>
            navigation.navigate(isLoggedIn() ? "Account" : "Login")
          }
        />
        <TouchableOpacity
          style={style.titleContainerStyle}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Appbar.Content titleStyle={style.title} title="NATURAL STATE" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Appbar.Action
            style={style.cart}
            icon="cart"
            onPress={() => navigation.navigate("Cart")}
          />
          {cartNotificationNumber}
        </TouchableOpacity>
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
            title={isLoggedIn() ? "View Account" : "Login"}
          />
          {mySubscriptionsMenuItem}
          {allOrdersMenuItem}
          {editCoffeesMenuItem}
        </Menu>
      </Appbar.Header>
    </Provider>
  );
}

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
  titleContainerStyle: {
    height: 28,
    flex: 1,
  },
  cartNotificationNumber: {
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
  cartNotificationNumberContainer: {
    position: "absolute",
    borderRadius: 45,
    backgroundColor: "rgba(88, 22, 19, .7)",
    width: 20,
    height: 20,
    bottom: 3,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomNavigationBar;
