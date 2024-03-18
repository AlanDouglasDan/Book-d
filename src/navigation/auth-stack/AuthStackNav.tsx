import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignUp, Login } from "screens";

export type AuthStackNavParams = {
  "Sign Up": undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackNavParams>();

const AuthStackNav: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUp}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNav;
