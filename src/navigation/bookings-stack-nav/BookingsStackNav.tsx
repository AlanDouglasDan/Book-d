import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Bookings, BookingsList } from "screens";

export type BookingsStackNavParams = {
  Bookings: undefined;
  "Bookings List": undefined;
};

const Stack = createNativeStackNavigator<BookingsStackNavParams>();

const BookingsStackNav: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bookings List"
        component={BookingsList}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Bookings"
        component={Bookings}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default BookingsStackNav;
