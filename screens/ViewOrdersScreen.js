import React, { useState, useContext } from "react";
import { StyleSheet, Button, View, TouchableOpacity, Text } from "react-native";
import { DataTable, Checkbox } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import PopupModal from "../components/PopupModal";
import LoginContext from "../context/LoginContext";

function ViewOrdersScreen() {
  const [modalChildren, setModalChildren] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentOrderData, setCurrentOrderData] = useState([]);
  const [pastOrderData, setPastOrderData] = useState([]);
  const [testOrderData, setTestOrderData] = useState([]);

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const { userToken } = useContext(LoginContext);

  const data = [
    {
      user_coffee_subscription_id: 2,
      user_id: 2,
      frequency: "weekly",
      amount: 4,
      coffee_id: 4,
      order_date: "2023-04-27",
      delivered: 1,
      name: "Jane Doe",
      email: "janedoe@email.com",
      street: "123 East Street",
      city: "Russelville",
      state: "AR",
      country: "US",
      zipcode: "16356",
      coffee_name: "Ozark Moon Espresso",
    },
    {
      user_coffee_subscription_id: 3,
      user_id: 2,
      frequency: "weekly",
      amount: 1,
      coffee_id: 4,
      order_date: "2023-04-27",
      delivered: 1,
      name: "Jane Doe",
      email: "janedoe@email.com",
      street: "123 East Street",
      city: "Russelville",
      state: "AR",
      country: "US",
      zipcode: "16356",
      coffee_name: "Ozark Moon Espresso",
    },
    {
      user_coffee_subscription_id: 33,
      user_id: 2,
      frequency: "weekly",
      amount: 1,
      coffee_id: 4,
      order_date: "2023-04-21",
      delivered: 0,
      name: "Jane Doe",
      email: "janedoe@email.com",
      street: "123 East Street",
      city: "Russelville",
      state: "AR",
      country: "US",
      zipcode: "16356",
      coffee_name: "Ozark Moon Espresso",
    },
    {
      user_coffee_subscription_id: 55,
      user_id: 13,
      frequency: "one-time",
      amount: 3,
      coffee_id: 4,
      order_date: "2023-04-30",
      delivered: 0,
      name: "Admin",
      email: "nsdev1@proton.me",
      street: "Tester",
      city: " Avenue",
      state: "AR",
      country: "US",
      zipcode: "16356",
      coffee_name: "Ozark Moon Espresso",
    },
    {
      user_coffee_subscription_id: 71,
      user_id: 13,
      frequency: "weekly",
      amount: 2,
      coffee_id: 4,
      order_date: "2023-04-25",
      delivered: 1,
      name: "Admin",
      email: "nsdev1@proton.me",
      street: "Tester",
      city: " Avenue",
      state: "AR",
      country: "US",
      zipcode: "16356",
      coffee_name: "Ozark Moon Espresso",
    },
    {
      user_coffee_subscription_id: 75,
      user_id: 13,
      frequency: "weekly",
      amount: 1,
      coffee_id: 4,
      order_date: "2023-04-25",
      delivered: 0,
      name: "Admin",
      email: "nsdev1@proton.me",
      street: "Tester",
      city: " Avenue",
      state: "AR",
      country: "US",
      zipcode: "16356",
      coffee_name: "Ozark Moon Espresso",
    },
    {
      user_coffee_subscription_id: 76,
      user_id: 13,
      frequency: "weekly",
      amount: 4,
      coffee_id: 3,
      order_date: "2023-04-25",
      delivered: 0,
      name: "Admin",
      email: "nsdev1@proton.me",
      street: "Tester",
      city: " Avenue",
      state: "AR",
      country: "US",
      zipcode: "16356",
      coffee_name: "Guatemala",
    },
    {
      user_coffee_subscription_id: 77,
      user_id: 13,
      frequency: "weekly",
      amount: 1,
      coffee_id: 5,
      order_date: "2023-04-25",
      delivered: 0,
      name: "Admin",
      email: "nsdev1@proton.me",
      street: "Tester",
      city: " Avenue",
      state: "AR",
      country: "US",
      zipcode: "16356",
      coffee_name: "Brazil",
    },
    {
      user_coffee_subscription_id: 78,
      user_id: 13,
      frequency: "weekly",
      amount: 1,
      coffee_id: 20,
      order_date: "2023-04-25",
      delivered: 0,
      name: "Admin",
      email: "nsdev1@proton.me",
      street: "Tester",
      city: " Avenue",
      state: "AR",
      country: "US",
      zipcode: "16356",
      coffee_name: "Mexico",
    },
  ];

  function searchForTestOrders() {
    setCurrentOrderData([]);
    setPastOrderData([]);
    setTestOrderData(data);
  }

  function searchForCurrentOrders() {
    if (month == "") {
      alert("Month must be selected!");
      return;
    }

    if (year == "") {
      alert("Year must be selected!");
      return;
    }

    getCurrentOrdersApiCall().then((apiData) => {
      if (apiData.status != 200) {
        alert(apiData.message);
        return;
      }
      setTestOrderData([]);
      setPastOrderData([]);
      setCurrentOrderData(apiData.orders);
    });
  }

  function searchForPastOrders() {
    if (month == "") {
      alert("Month must be selected!");
      return;
    }

    if (year == "") {
      alert("Year must be selected!");
      return;
    }

    getPastOrdersApiCall().then((apiData) => {
      if (apiData.status != 200) {
        alert(apiData.message);
        return;
      }
      setTestOrderData([]);
      setCurrentOrderData([]);
      setPastOrderData(apiData.orders);
    });
  }

  function getCurrentOrdersApiCall() {
    var getApiUrl = "https://nsdev1.xyz/index.php?method=getAllOrders";

    var data = {
      date: month + "/" + year,
    };

    const getOrdersApiCall = fetch(getApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .catch((error) => {
        alert("Error" + error);
      });

    return getOrdersApiCall;
  }

  function getPastOrdersApiCall() {
    var getApiUrl = "https://nsdev1.xyz/index.php?method=getAllPastOrders";

    var data = {
      date: month + "/" + year,
    };

    const getOrdersApiCall = fetch(getApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .catch((error) => {
        alert("Error" + error);
      });

    return getOrdersApiCall;
  }

  function test() {}

  const monthSelectData = [
    { key: "01", value: "1" },
    { key: "02", value: "2" },
    { key: "03", value: "3" },
    { key: "04", value: "4" },
    { key: "05", value: "5" },
    { key: "06", value: "6" },
    { key: "07", value: "7" },
    { key: "08", value: "8" },
    { key: "09", value: "9" },
    { key: "10", value: "10" },
    { key: "11", value: "11" },
    { key: "12", value: "12" },
  ];

  const yearSelectData = [
    { key: "2020", value: "2020" },
    { key: "2021", value: "2021" },
    { key: "2022", value: "2022" },
    { key: "2023", value: "2023" },
    { key: "2024", value: "2024" },
    { key: "2025", value: "2025" },
    { key: "2026", value: "2026" },
    { key: "2027", value: "2027" },
    { key: "2028", value: "2028" },
    { key: "2029", value: "2029" },
    { key: "2030", value: "2030" },
    { key: "2031", value: "2031" },
    { key: "2032", value: "2032" },
    { key: "2033", value: "2033" },
    { key: "2034", value: "2034" },
    { key: "2035", value: "2035" },
    { key: "2036", value: "2036" },
    { key: "2037", value: "2037" },
    { key: "2038", value: "2038" },
    { key: "2039", value: "2039" },
    { key: "2040", value: "2040" },
    { key: "2041", value: "2041" },
    { key: "2042", value: "2042" },
    { key: "2043", value: "2043" },
    { key: "2044", value: "2044" },
    { key: "2045", value: "2045" },
    { key: "2046", value: "2046" },
    { key: "2047", value: "2047" },
    { key: "2048", value: "2048" },
    { key: "2049", value: "2049" },
    { key: "2050", value: "2050" },
    { key: "2051", value: "2051" },
    { key: "2052", value: "2052" },
    { key: "2053", value: "2053" },
    { key: "2054", value: "2054" },
    { key: "2055", value: "2055" },
    { key: "2056", value: "2056" },
    { key: "2057", value: "2057" },
    { key: "2058", value: "2058" },
    { key: "2059", value: "2059" },
    { key: "2060", value: "2060" },
    { key: "2061", value: "2061" },
    { key: "2062", value: "2062" },
    { key: "2063", value: "2063" },
    { key: "2064", value: "2064" },
    { key: "2065", value: "2065" },
    { key: "2066", value: "2066" },
    { key: "2067", value: "2067" },
    { key: "2068", value: "2068" },
    { key: "2069", value: "2069" },
    { key: "2070", value: "2070" },
    { key: "2071", value: "2071" },
    { key: "2072", value: "2072" },
    { key: "2073", value: "2073" },
    { key: "2074", value: "2074" },
    { key: "2075", value: "2075" },
  ];

  function createModalInfo(order) {
    var modalInfo = (
      <View>
        <Text style={styles.infoTitleStyle}>Order Information</Text>

        <View style={styles.hairlineDividerStyle} />

        <View style={styles.infoGroupingStyle}>
          <Text style={styles.infoHeaderStyle}>Name:</Text>
          <Text style={styles.infoBodyStyle}>{order.name}</Text>
        </View>

        <View style={styles.infoGroupingStyle}>
          <Text style={styles.infoHeaderStyle}>Email:</Text>
          <Text style={styles.infoBodyStyle}>{order.email}</Text>
        </View>

        <View style={styles.subHairlineDividerStyle} />

        <View style={styles.infoGroupingStyle}>
          <Text style={styles.infoHeaderStyle}>Delivery Date:</Text>
          <Text style={styles.infoBodyStyle}>{order.order_date}</Text>
        </View>

        <View style={styles.subHairlineDividerStyle} />

        <View style={styles.infoGroupingStyle}>
          <Text style={styles.infoHeaderStyle}>Coffee Ordered:</Text>
          <Text style={styles.infoBodyStyle}>{order.coffee_name}</Text>
        </View>

        <View style={styles.infoGroupingStyle}>
          <Text style={styles.infoHeaderStyle}>Frequency:</Text>
          <Text style={styles.infoBodyStyle}>{order.frequency}</Text>
        </View>

        <View style={styles.infoGroupingStyle}>
          <Text style={styles.infoHeaderStyle}>Amount:</Text>
          <Text style={styles.infoBodyStyle}>{order.amount}</Text>
        </View>

        <View style={styles.subHairlineDividerStyle} />

        <View style={styles.infoGroupingStyle}>
          <Text style={styles.infoHeaderStyle}>Street:</Text>
          <Text style={styles.infoBodyStyle}>{order.street}</Text>
        </View>

        <View style={styles.infoGroupingStyle}>
          <Text style={styles.infoHeaderStyle}>City:</Text>
          <Text style={styles.infoBodyStyle}>{order.city}</Text>
        </View>

        <View style={styles.infoGroupingStyle}>
          <Text style={styles.infoHeaderStyle}>State:</Text>
          <Text style={styles.infoBodyStyle}>{order.state}</Text>
        </View>

        <View style={styles.infoGroupingStyle}>
          <Text style={styles.infoHeaderStyle}>Country:</Text>
          <Text style={styles.infoBodyStyle}>{order.country}</Text>
        </View>

        <View style={styles.infoGroupingStyle}>
          <Text style={styles.infoHeaderStyle}>Zipcode:</Text>
          <Text style={styles.infoBodyStyle}>{order.zipcode}</Text>
        </View>

        <View style={styles.subHairlineDividerStyle} />

        <TouchableOpacity
          style={styles.buttonContainerStyle}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.subscriptionButtonStyle}>Close</Text>
        </TouchableOpacity>
      </View>
    );

    setModalChildren(modalInfo);

    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <PopupModal
        modalChildren={modalChildren}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View style={styles.selectContainer}>
        <View style={styles.selectSubContainer}>
          <SelectList
            boxStyles={styles.select}
            setSelected={(input) => setMonth(input)}
            data={monthSelectData}
            search={false}
            placeholder="Month:"
          />
        </View>

        <View style={styles.selectSubContainer}>
          <SelectList
            boxStyles={styles.select}
            setSelected={(input) => setYear(input)}
            data={yearSelectData}
            search={false}
            placeholder="Year:"
          />
        </View>
      </View>
      <Text style={styles.searchText}>Search for:</Text>

      <View style={styles.buttonFlexStyle}>
        <View style={styles.buttonFlexStyle}>
          <View style={styles.viewPaddingFirst}>
            <TouchableOpacity
              style={styles.buttonContainerStyle}
              onPress={searchForCurrentOrders}
            >
              <Text style={styles.searchButtonStyle}>Current Orders</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewPadding}>
            <TouchableOpacity
              style={styles.buttonContainerStyle}
              onPress={searchForPastOrders}
            >
              <Text style={styles.searchButtonStyle}>Past orders</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewPadding}>
            <TouchableOpacity
              style={styles.buttonContainerStyle}
              onPress={searchForTestOrders}
            >
              <Text style={styles.searchButtonStyle}>Test orders</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Orders:</DataTable.Title>
        </DataTable.Header>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Date</DataTable.Title>
          <DataTable.Title numeric>Delivered?</DataTable.Title>
        </DataTable.Header>

        {currentOrderData.map((order) => {
          return (
            <DataTable.Row
              key={order.user_coffee_subscription_id}
              onPress={() => {
                createModalInfo(order);
              }}
            >
              <DataTable.Cell>{order.name}</DataTable.Cell>
              <DataTable.Cell numeric>{order.order_date}</DataTable.Cell>
              <DataTable.Cell
                numeric
                onPress={() => {
                  createModalInfo(order);
                }}
              >
                <Checkbox
                  status={order.delivered == 1 ? "checked" : "unchecked"}
                  onPress={() => {
                    console.log(
                      "Check box for order id: ",
                      order.user_coffee_subscription_id
                    );
                  }}
                />
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}

        {pastOrderData.map((order) => {
          return (
            <DataTable.Row
              key={order.past_subscription_id}
              onPress={() => {
                createModalInfo(order);
              }}
            >
              <DataTable.Cell>{order.name}</DataTable.Cell>
              <DataTable.Cell numeric>{order.order_date}</DataTable.Cell>
              <DataTable.Cell
                numeric
                onPress={() => {
                  createModalInfo(order);
                }}
              >
                <Checkbox
                  status={"checked"}
                  onPress={() => {
                    console.log(
                      "Check box for order id: ",
                      order.user_coffee_subscription_id
                    );
                  }}
                />
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}

        {testOrderData.map((order) => {
          return (
            <DataTable.Row
              key={order.user_coffee_subscription_id}
              onPress={() => {
                createModalInfo(order);
              }}
            >
              <DataTable.Cell>{order.name}</DataTable.Cell>
              <DataTable.Cell numeric>{order.order_date}</DataTable.Cell>
              <DataTable.Cell
                numeric
                onPress={() => {
                  createModalInfo(order);
                }}
              >
                <Checkbox
                  status={order.delivered == 1 ? "checked" : "unchecked"}
                  onPress={() => {
                    console.log(
                      "Check box for order id: ",
                      order.user_coffee_subscription_id
                    );
                  }}
                />
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>

      <View style={styles.buttonGroup}>
        <Button title={"Mark As Delivered or Undelivered"} onPress={test} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  selectContainer: {
    backgroundColor: "#F5F5F5",
    flexDirection: "column",
    // alignItems: "center",
    paddingTop: "20%",
    paddingBottom: "5%",
  },
  selectSubContainer: {
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  searchButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    paddingBottom: "20%",
    paddingTop: "20%",
  },
  select: {
    width: "40%",
  },
  infoTitleStyle: {
    fontSize: 25,
    textAlign: "center",
  },
  hairlineDividerStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth * 5,
    marginHorizontal: 2,
    marginVertical: 5,
    borderColor: "#9A7B4F",
  },
  subHairlineDividerStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth * 2.5,
    marginHorizontal: 2,
    marginVertical: 5,
    borderColor: "#9A7B4F",
  },
  infoGroupingStyle: {
    padding: 4,
    flexDirection: "row",
  },
  infoHeaderStyle: {
    textAlign: "left",
    paddingRight: "10%",
  },
  infoBodyStyle: {
    textAlign: "right",
  },
  buttonContainerStyle: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    marginVertical: 5,
    borderColor: "#581613",
    borderWidth: 1,
  },
  subscriptionButtonStyle: {
    fontSize: 17,
    flex: 1,
    color: "#581613",
    paddingLeft: 5,
    textAlign: "center",
  },
  searchButtonStyle: {
    color: "#581613",
    textAlign: "center",
  },
  searchText: {
    paddingBottom: "5%",
  },
  buttonFlexStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewPadding: {
    paddingRight: "10%",
  },
  viewPaddingFirst: {
    paddingRight: "10%",
    paddingLeft: "5%",
  },
});

export default ViewOrdersScreen;
