import React, { useState, useEffect } from "react";
import { StyleSheet, Button, View } from "react-native";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import ExpandedRowComponent from "../components/ExpandedRowComponent";

function ViewOrdersScreen() {
  const [allOrderData, setAllOrderData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setAllOrderData(data);
  }, []);

  const data = [
    {
      name: "Jane Doe",
      order_date: "2023-04-27",
      delivered: 0 == 1 ? "Yes" : "No",
      subRows: {
        user_coffee_subscription_id: 2,
        user_id: 2,
        frequency: "weekly",
        amount: 4,
        coffee_id: 4,
        email: "janedoe@email.com",
        street: "123 East Street",
        city: "Russelville",
        state: "AR",
        country: "US",
        zipcode: "16356",
        coffee_name: "Ozark Moon Espresso",
      },
    },
    {
      name: "Admin",
      order_date: "2023-04-30",
      delivered: 1 == 1 ? "Yes" : "No",
      subRows: {
        user_coffee_subscription_id: 55,
        user_id: 13,
        frequency: "one-time",
        amount: 3,
        coffee_id: 4,
        email: "nsdev1@proton.me",
        street: "Tester",
        city: " Avenue",
        state: "AR",
        country: "US",
        zipcode: "16356",
        coffee_name: "Ozark Moon Espresso",
      },
    },
  ];

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.order_date,
      sortable: true,
    },
    {
      name: "Delivered",
      selector: (row) => row.delivered,
      sortable: true,
    },
  ];

  function test() {
    console.log(selectedRows);
  }

  return (
    <View style={styles.container}>
      <DataTable
        columns={columns}
        data={allOrderData}
        expandableRows
        expandableRowsComponent={ExpandedRowComponent}
        selectableRows
        onSelectedRowsChange={(input) => setSelectedRows(input)}
      />
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
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
});

export default ViewOrdersScreen;
