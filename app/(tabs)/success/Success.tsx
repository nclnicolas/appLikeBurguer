import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Button, NativeBaseProvider } from "native-base";
import { Link } from "expo-router";

const Success = () => {
  return (
    <NativeBaseProvider>
    <View style={styles.container}>
      <Text style={styles.text}> Compra realizada con exito!! </Text>
      <Text style={styles.text}> Tu pedido demorara entre 30 y 50 minutos. </Text>

      <Link href={'/menu'} asChild>
      <Button size="sm" colorScheme="lightBlue" onPress={() => {}}>
        Volver al Menu
      </Button>
      </Link>
    </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 14,
    backgroundColor: "lightblue",
    paddingHorizontal: 10,
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: "bold",
  },
  button:{
    marginTop: 50
  }
});
export default Success;
