import { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Dashboard, Bookings, Profile } from "screens";
import { BookingsStackNav } from "../bookings-stack-nav";
import styles from "./BottomTabsNav.styles";
import { palette } from "@src/core/styles";

export type BottomTabsNavParams = {
  Dashboard: undefined;
  "Bookings Stack": undefined;
  Notifications: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsNavParams>();

const renderTabBarIcon = (name: string, focused: boolean): JSX.Element => {
  let icon, color;

  switch (name) {
    case "Dashboard":
      icon = "home";
      color = focused ? palette.ORANGE : palette.GREY5;
      break;
    case "Bookings":
      icon = "calendar";
      color = focused ? palette.ORANGE : palette.GREY5;
      break;
    default:
      icon = "notifications";
      color = focused ? palette.ORANGE : palette.GREY5;
      break;
  }

  return <Ionicons name={icon} size={24} color={color} />;
};

const renderTabBarLabel = (name: string, focused: boolean): JSX.Element => {
  const style = focused ? "text10Focus" : "text10";
  return <Text style={styles[style]}>{name}</Text>;
};

const BottomTabsNav: FC = () => {
  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <Tab.Navigator screenOptions={{ tabBarStyle: styles.tabBar }}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => renderTabBarIcon("Dashboard", focused),
            tabBarLabel: ({ focused }) =>
              renderTabBarLabel("Dashboard", focused),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Bookings Stack"
          component={BookingsStackNav}
          options={{
            tabBarIcon: ({ focused }) => renderTabBarIcon("Bookings", focused),
            tabBarLabel: ({ focused }) =>
              renderTabBarLabel("Bookings", focused),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Notifications"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) =>
              renderTabBarIcon("Notifications", focused),
            tabBarLabel: ({ focused }) =>
              renderTabBarLabel("Notifications", focused),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabsNav;
