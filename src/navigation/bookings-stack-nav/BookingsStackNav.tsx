import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Bookings, BookingsList, BookingDetails } from "screens";

export type BookingsStackNavParams = {
  Bookings: {
    date?: string;
    startTime?: string;
    endTime?: string;
    id?: string;
  };
  "Bookings List": undefined;
  "Booking Details": { bookingDetails: any };
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

      <Stack.Screen
        name="Booking Details"
        component={BookingDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default BookingsStackNav;
