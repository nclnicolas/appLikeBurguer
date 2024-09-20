import { Button, Heading, NativeBaseProvider } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CarritoComponents from "../../../src/components/CarritoComponents";
import { useFocusEffect } from "@react-navigation/native";
import ModalCompra from "../../../src/components/modalCompra";

const Carrito = () => {
  const [carritoItems, setCarritoItems] = useState<any>([]);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [handleModal, setHandleModal] = useState(false);

  const handleRemoveItem = async (index: any) => {
    const newCarrito = carritoItems.filter((item: any, i: any) => i !== index);
    setCarritoItems(newCarrito);

    try {
      await AsyncStorage.setItem("carrito", JSON.stringify(newCarrito));
      calculateTotal(newCarrito);
    } catch (error) {
      console.log("ERROR---", error);
    }
  };

  const handleAmount = async (index: number, newAmount: string) => {
    const updatedCarrito = carritoItems.map((item: any, i: number) =>
      i === index ? { ...item, cantidad: newAmount } : item
    );

    setCarritoItems(updatedCarrito);

    try {
      await AsyncStorage.setItem("carrito", JSON.stringify(updatedCarrito));
      calculateTotal(updatedCarrito);
    } catch (error) {
      console.log("ERROR----", error);
    }
  };

  const calculateTotal = (item: any[]) => {
    const total = item.reduce(
      (acc, item) => acc + item.price * (parseInt(item.cantidad) || 1),
      0
    );
    setTotalCarrito(total);
  };

  useFocusEffect(
    useCallback(() => {
      const datacarrito = async () => {
        try {
          const localData = await AsyncStorage.getItem("carrito");
          const parsedData = localData ? JSON.parse(localData) : [];
          setCarritoItems(parsedData);
          calculateTotal(parsedData);
        } catch (error) {
          console.log("ERROR", error);
        }
      };
      datacarrito();
    }, [])
  );

  const handleSuccess = async () => {
    
    setHandleModal(true);
  };

  const closeModal = () => {
    setHandleModal(false);
  };

  return (
    <>
      {carritoItems && (
        <View style={styles.container}>
          <NativeBaseProvider>
            <View style={styles.title}>
              <Heading size="lg">
                {carritoItems.length > 0 ? "" : "--Tu carrito esta vacio--"}
              </Heading>
            </View>

            {carritoItems.length > 0 && (
              <ScrollView>
                {carritoItems.map((item: any, index: number) => (
                  <CarritoComponents
                    key={item.uri}
                    description={item.title}
                    price={item.price}
                    image={item.uri}
                    cantidad={item.cantidad}
                    onAmount={(newAmount: string) =>
                      handleAmount(index, newAmount)
                    }
                    onRemove={() => handleRemoveItem(index)}
                  />
                ))}
                <View style={styles.totalContainer}>
                  <Text style={styles.totalText}>
                    Total del Carrito: ${totalCarrito}
                  </Text>
                </View>

                <Button
                  size="sm"
                  colorScheme="secondary"
                  onPress={handleSuccess}
                >
                  Pedir
                </Button>
              </ScrollView>
            )}
          </NativeBaseProvider>
        </View>
      )}

      {handleModal && (
        <ModalCompra
          handleModal={true}
          onClose={closeModal}
          total={totalCarrito}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 14,
    backgroundColor: "red",
    paddingHorizontal: 10,
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  totalContainer: {
    height: 50,
    padding: 10,
    backgroundColor: "pink",
    marginBottom: 12,
    borderRadius: 9,
    flexDirection: "column",
    alignItems: "center",
    columnGap: 10,
  },
  totalText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
export default Carrito;
