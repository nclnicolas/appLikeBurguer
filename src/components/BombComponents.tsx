import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Box,
  Center,
  Skeleton,
  VStack,
  Image,
  Text,
  Button,
} from "native-base";
import { useState } from "react";
import { View } from "react-native";
import AlertComponents from "./AlertComponents";
import { ImageBombRoute } from "../utils/types";

const BombComponents = ( { imagesRoute } : any) => {
  const [alert, setAlert] = useState(false);

  const handlePress = async (item: any) => {
    const carritoData = {
      title: item.title,
      uri: item.uri,
      price: item.price
    };

    try {
      const existingCarrito = await AsyncStorage.getItem("carrito");
      let carritoArray = [];

      if (existingCarrito) {
        carritoArray = JSON.parse(existingCarrito);

        if (!Array.isArray(carritoArray)) {
          carritoArray = [];
        }
      }
      carritoArray.push(carritoData);
      await AsyncStorage.setItem("carrito", JSON.stringify(carritoArray));
      setAlert(true);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <View>
      {alert && <AlertComponents onClose={() => setAlert(false)} />}
      <Center w="100%">
        <Box w="90%" maxWidth="400">
          <VStack
            maxWidth="400"
            borderWidth="1"
            space={8}
            overflow="hidden"
            rounded="md"
            _dark={{
              backgroundColor: "blue.100",
              borderColor: "black",
            }}
            _light={{
              backgroundColor: "blue.100",
              borderColor: "black",
            }}
          >
            {imagesRoute.map((item: any, index: any) => (
              <Box key={index}>
                <Skeleton h="40" isLoaded={true}>
                  <Image
                    h="40"
                    source={{
                      uri: item.uri,
                    }}
                    alt={`Image ${index + 1}`}
                  />
                </Skeleton>
                <Skeleton.Text lines={4} px="4" isLoaded={true}>
                  <Text
                    px="4"
                    pt={"5"}
                    pb={"2"}
                    fontSize={"lg"}
                    lineHeight={"20px"}
                    fontWeight="bold"
                  >
                    {`${item.title} $${item.price}`}
                  </Text>
                  <Text px="4" fontSize={"md"} lineHeight={"20px"}>
                    {item.description}
                  </Text>
                </Skeleton.Text>

                <Skeleton
                  px="4"
                  mb="4"
                  rounded="md"
                  startColor="rose.100"
                  isLoaded={true}
                >
                  <Button m="4" onPress={() => handlePress(item)}>
                    Agregar al Carrito
                  </Button>
                </Skeleton>
              </Box>
            ))}
          </VStack>
        </Box>
      </Center>
    </View>
  );
};

export default BombComponents;
