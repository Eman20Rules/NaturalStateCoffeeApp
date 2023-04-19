import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import ExpandedRowComponent from "../components/ExpandedRowComponent";

function ViewOrdersScreen() {
  const data = [
    {
      id: 1,
      name: "John Doe",
      subRows: [
        {
          id: 2,
          name: "Jane Doe",
        },
      ],
    },
  ];

  // const data = [
  //   {
  //     firstName: "Dylan",
  //     lastName: "Murray",
  //     address: "261 Erdman Ford",
  //     city: "East Daphne",
  //     state: "Kentucky",
  //     subRows: [
  //       {
  //         firstName: "Ervin",
  //         lastName: "Reinger",
  //         address: "566 Brakus Inlet",
  //         city: "South Linda",
  //         state: "West Virginia",
  //         subRows: [
  //           {
  //             firstName: "Jordane",
  //             lastName: "Homenick",
  //             address: "1234 Brakus Inlet",
  //             city: "South Linda",
  //             state: "West Virginia",
  //           },
  //         ],
  //       },
  //       {
  //         firstName: "Brittany",
  //         lastName: "McCullough",
  //         address: "722 Emie Stream",
  //         city: "Lincoln",
  //         state: "Nebraska",
  //       },
  //     ],
  //   },
  //   {
  //     firstName: "Raquel",
  //     lastName: "Kohler",
  //     address: "769 Dominic Grove",
  //     city: "Columbus",
  //     state: "Ohio",
  //     subRows: [
  //       {
  //         firstName: "Branson",
  //         lastName: "Frami",
  //         address: "32188 Larkin Turnpike",
  //         city: "Charleston",
  //         state: "South Carolina",
  //       },
  //     ],
  //   },
  // ];

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
    <DataTable
      columns={columns}
      data={data}
      expandableRows
      expandableRowsComponent={ExpandedRowComponent}
    />
  );
}

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   paddingTop: 100,
//   //   paddingHorizontal: 30,
//   //   backgroundColor: "#fff",
//   //   borderBottom: "1pt solid #ff000d",
//   // },
//   // upperRow: {
//   //   borderColor: "black",
//   //   borderTopWidth: 2.5,
//   // },
//   // lowerRow: {
//   //   borderBottom: "1pt solid #ff000d",
//   // },
// });

export default ViewOrdersScreen;
