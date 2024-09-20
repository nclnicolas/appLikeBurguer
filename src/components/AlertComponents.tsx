import React from "react";
import {
  Stack,
  Alert,
  IconButton,
  HStack,
  VStack,
  CloseIcon,
  Text,
} from "native-base";

const AlertComponents = ({ onClose }: { onClose: () => void }) => {
  return (
    <Stack space={3} w="100%" maxW="400">
      <Alert w="100%">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
                Se agrego al carrito correctamente!!
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<CloseIcon size="3" />}
              _icon={{
                color: "coolGray.600",
              }}
              onPress={onClose}
            />
          </HStack>
        </VStack>
      </Alert>
    </Stack>
  );
};

export default AlertComponents;
