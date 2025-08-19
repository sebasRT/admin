import MainDrawer from "@/components/drawers/MainDrawer";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <MainDrawer>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Domiciliarios",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome name="users" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: "Productos",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="shopping-cart" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="metrics"
          options={{
            title: "Métricas",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="dashboard" color={color} />
            ),
          }}
        />
      </Tabs>
    </MainDrawer>
  );
}
