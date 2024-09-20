import { Tabs } from "expo-router";
import { Text } from "react-native";
import { Icon } from "react-native-paper";

const HomeTabs = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "pink",
          height: 60,
        },
        tabBarInactiveTintColor: "black",
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 15 },
        headerTintColor: "white",
        headerTitleStyle: {
          textTransform: "uppercase",
        },
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor:
            route.name === "success/Success" ? "blue" : "red",
        },
      })} 
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon({ focused }) {
            return <Icon source={"home"} size={30} />;
          },
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon({ focused }) {
            return <Icon source="menu" size={30} />;
          },
        }}
      />
      <Tabs.Screen
        name="compra/carrito"
        options={{
          title: "Carrito",
          tabBarIcon({ focused }) {
            return <Icon source="cart" size={30} />;
          },
        }}
      />
      <Tabs.Screen
        name="success/Success"
        options={{
          title: "Exito",
          href: null,
        }}
      />
    </Tabs>
  );
};

export default HomeTabs;
