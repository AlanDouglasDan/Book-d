import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignUp, Login } from "screens";
import { BottomTabsNav } from "navigation/bottom-tabs-nav";
// import { ArrowBack } from "components/ArrowBack";
// import { HeaderBackground } from "components/HeaderBackground";
import styles from "./AuthStackNav.styles";

export type AuthStackNavParams = {
  "Sign Up": undefined;
  Login: undefined;
  "Bottom Tabs": undefined;
};

const Stack = createNativeStackNavigator<AuthStackNavParams>();

const AuthStackNav: FC = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Bottom Tabs"
        component={BottomTabsNav}
        options={{ headerShown: false, gestureEnabled: false }}
      /> */}

      <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUp}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="Bottom Tabs"
        component={BottomTabsNav}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNav;
