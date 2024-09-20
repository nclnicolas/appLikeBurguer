import React, { useEffect } from "react";
import {
  Button,
  Modal,
  VStack,
  HStack,
  Text,
  Radio,
  Center,
  NativeBaseProvider,
  FormControl,
  Input,
} from "native-base";
import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ModalCompra = ({
  handleModal,
  onClose,
  total,
}: {
  handleModal: boolean;
  onClose: () => void;
  total: number;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [isDireccionInvalid, setIsDireccionInvalid] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isPaymentInvalid, setIsPaymentInvalid] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setShowModal(handleModal);
  }, [handleModal]);

  const handleClose = () => {
    setShowModal(false);
    setShowModal2(false);
    onClose();
  };

  const handleContinue = () => {
    if (!direccion) {
      setIsDireccionInvalid(true);
    } else {
      setIsDireccionInvalid(false);
      setShowModal3(true);
    }
  };

  const handlePago = async () => {
    if (!selectedPayment) {
      setIsPaymentInvalid(true);
    } else {
      setIsPaymentInvalid(false);
      setShowModal(false);
      setShowModal2(false);
      setShowModal3(false);
      onClose();
      try {
        await AsyncStorage.removeItem("carrito");
        router.push("/success/Success");
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  };

  const envio = 250;

  return (
    <NativeBaseProvider>
      <Center>
        <Modal isOpen={showModal} onClose={handleClose} size="lg">
          <Modal.Content maxWidth="350">
            <Modal.CloseButton />
            <Modal.Header>Orden</Modal.Header>
            <Modal.Body>
              <VStack space={3}>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Sub Total</Text>
                  <Text color="blueGray.400">{`$${total}`}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Envio</Text>
                  <Text color="blueGray.400">{`$${envio}`}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Total</Text>
                  <Text color="green.500">{`$${total + envio}`}</Text>
                </HStack>
              </VStack>
            </Modal.Body>
            <Modal.Footer>
              <Button
                flex="1"
                bg="red.500"
                onPress={() => {
                  setShowModal2(true);
                }}
              >
                Continuar
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal isOpen={showModal2} onClose={handleClose} size="lg">
          <Modal.Content maxWidth="350">
            <Modal.CloseButton />
            <Modal.Header>Select Address</Modal.Header>
            <Modal.Body>
              <Radio.Group defaultValue="address1" name="address" size="sm">
                <VStack space={3}>
                  <Modal.Body>
                    <FormControl
                      w="250px"
                      isRequired
                      isInvalid={isDireccionInvalid}
                    >
                      <FormControl.Label>
                        Direccion de entrega
                      </FormControl.Label>
                      <Input
                        value={direccion}
                        onChangeText={(text) => setDireccion(text)}
                        placeholder="Ingresa tu dirección"
                      />
                      {isDireccionInvalid && (
                        <FormControl.ErrorMessage>
                          La dirección es obligatoria.
                        </FormControl.ErrorMessage>
                      )}
                    </FormControl>
                  </Modal.Body>
                </VStack>
              </Radio.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button bg="red.500" flex="1" onPress={handleContinue}>
                Continue
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal isOpen={showModal3} size="lg" onClose={handleClose}>
          <Modal.Content maxWidth="350">
            <Modal.CloseButton />
            <Modal.Header>Forma de pago</Modal.Header>
            <Modal.Body>
              <FormControl isRequired isInvalid={isPaymentInvalid}>
                <Radio.Group
                  name="payment"
                  size="sm"
                  value={selectedPayment}
                  onChange={(nextValue) => {
                    setSelectedPayment(nextValue);
                    setIsPaymentInvalid(false);
                  }}
                >
                  <VStack space={3}>
                    <Radio
                      alignItems="flex-start"
                      _text={{
                        mt: "-1",
                        ml: "2",
                        fontSize: "sm",
                      }}
                      value="payment1"
                    >
                      Efectivo
                    </Radio>
                    <Radio
                      alignItems="flex-start"
                      _text={{
                        mt: "-1",
                        ml: "2",
                        fontSize: "sm",
                      }}
                      value="payment2"
                    >
                      Transferencia Bancaria
                    </Radio>
                    <Radio
                      alignItems="flex-start"
                      _text={{
                        mt: "-1",
                        ml: "2",
                        fontSize: "sm",
                      }}
                      value="payment3"
                    >
                      Billetera Virtual
                    </Radio>
                  </VStack>
                </Radio.Group>
                {isPaymentInvalid && (
                  <FormControl.ErrorMessage>
                    Por favor selecciona una forma de pago.
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button bg="red.500" flex="1" onPress={handlePago}>
                Realizar Pedido
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </NativeBaseProvider>
  );
};

export default ModalCompra;
