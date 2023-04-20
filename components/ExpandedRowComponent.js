import React, { useEffect, useState } from "react";
import { View } from "react-native";
import DataTable from "react-data-table-component";

function ExpandedRowComponent({ data }) {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    setOrderData(data.subRows);
  }, []);

  const subData = [
    {
      name: "Order Email:",
      value: orderData.email,
    },
    {
      name: "Order Frequency:",
      value: orderData.frequency,
    },
    {
      name: "Order Amount:",
      value: orderData.amount,
    },
    {
      name: "Street:",
      value: orderData.street,
    },
    {
      name: "City:",
      value: orderData.city,
    },
    {
      name: "State:",
      value: orderData.state,
    },
    {
      name: "Zip Code:",
      value: orderData.zipcode,
    },
    {
      name: "Country:",
      value: orderData.country,
    },
  ];

  const columns = [
    {
      name: "___Field___",
      selector: (row) => row.name,
    },
    {
      name: "___Value___",
      selector: (row) => row.value,
    },
  ];

  return (
    <View>
      <DataTable columns={columns} data={subData} />
    </View>
  );
}

export default ExpandedRowComponent;
