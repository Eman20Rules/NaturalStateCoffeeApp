import React from "react";
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet} from 'react-native';

export default function App() {
  return (
    <AppBar
    title="Title"
    leading={props => (
      <IconButton icon={props => <Icon name="menu" {...props} />} {...props} />
    )}
    trailing={props => (
      <HStack>
        <IconButton
          icon={props => <Icon name="magnify" {...props} />}
          {...props}
        />
        <IconButton
          icon={props => <Icon name="dots-vertical" {...props} />}
          {...props}
        />
      </HStack>
    )}
  />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
