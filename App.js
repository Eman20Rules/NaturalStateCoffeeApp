import React from "react";
import {SafeAreaView} from "react-native";
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const App = () => {
  return (
    <SafeAreaView>
      <AppBar
        title="Title"
        leading={(props) => (
          <IconButton
            icon={(props) => <Icon name="menu" {...props} />}
            {...props}
          />
        )}
        trailing={(props) => (
          <HStack>
            <IconButton
              icon={(props) => <Icon name="magnify" {...props} />}
              {...props}
            />
            <IconButton
              icon={(props) => <Icon name="dots-vertical" {...props} />}
              {...props}
            />
          </HStack>
        )}
      />
    </SafeAreaView>
  );
};

export default App;
