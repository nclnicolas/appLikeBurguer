import { Box, Button, Center, CheckIcon, Select, Stack } from "native-base";
import React from "react";
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from "react-native";

const CarritoComponents = ({ description, image, onRemove, cantidad, onAmount, price }: any) => {
  
  return (
    <View>
      <TouchableHighlight underlayColor={"blue"}>
        <View style={styles.container}>
          <Image style={styles.thumbNail} source={{ uri: image }} />

          <View style={styles.textContainer}>
            <Text style={styles.text}>{`${description} $${price}`}</Text>
            
            {/* Selector de cantidad */}
            <Center>
              <Box maxW="300">
                <Select
                  bgColor="muted.200"
                  borderRadius="3xl"
                  selectedValue={cantidad}
                  minWidth="200"
                  accessibilityLabel="Cantidad"
                  placeholder="Cantidad"
                  _selectedItem={{
                    bg: "danger.300",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  defaultValue="1"
                  onValueChange={(itemValue) => onAmount(itemValue)}
                >
                  <Select.Item label="1" value="1" />
                  <Select.Item label="2" value="2" />
                  <Select.Item label="3" value="3" />
                  <Select.Item label="4" value="4" />
                  <Select.Item label="5" value="5" />
                </Select>
              </Box>
            </Center>

            <Stack
              mb="2.5"
              mt="2.5"
              direction={{
                base: "column",
                md: "row",
              }}
              space={2}
              mx={{
                base: "auto",
                md: "0",
              }}
            >
              <Button size="xs" colorScheme="secondary" onPress={onRemove}>
                No lo quiero
              </Button>
            </Stack>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    padding: 10,
    backgroundColor: "pink",
    marginBottom: 12,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  thumbNail: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  cantidad: {
    fontSize: 14,
    color: "blue",
  },
});

export default CarritoComponents;
