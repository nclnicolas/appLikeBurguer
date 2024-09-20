import { Heading, NativeBaseProvider } from "native-base";
import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { imagesBombRoutesMenu } from "../../src/utils/functions";
import BombComponents from "../../src/components/BombComponents";

const Menu = () => {
  return (
    <View style={styles.container}>
      <NativeBaseProvider>
        <ScrollView>
          <BombComponents imagesRoute={imagesBombRoutesMenu} />
        </ScrollView>
      </NativeBaseProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 14,
    backgroundColor: "red",
    paddingHorizontal: 10,
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
});
export default Menu;
