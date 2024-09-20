import { Heading, NativeBaseProvider } from "native-base";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import BombComponents from "../../src/components/BombComponents";
import { imagesBombRoutes } from "../../src/utils/functions";

export default function App() {
  return (
    <View style={styles.container}>
      <NativeBaseProvider>
        <ScrollView style={styles.scroll}>
          <BombComponents imagesRoute={imagesBombRoutes} />
        </ScrollView>
      </NativeBaseProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 14,
    backgroundColor: "red",
    paddingHorizontal: 10,
  },
  title: {
    marginTop: 10,
    alignItems: "center",
  },
  scroll: {
    marginTop: 20,
  },
});
