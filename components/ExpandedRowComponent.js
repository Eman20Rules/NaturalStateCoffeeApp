import React, { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";

function ExpandedRowComponent({ data }) {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
  ];

  return (
    <View>
      <View>
        <Text>{JSON.stringify(data)}</Text>
      </View>
      <DataTable columns={columns} data={data} />
    </View>
  );
}

export default ExpandedRowComponent;
