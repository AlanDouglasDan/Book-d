import React, { FC, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Entypo } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { BookingsStackNavParams } from "navigation/bookings-stack-nav/BookingsStackNav";
import { Booking } from "components/Booking";
import { palette, spacing, common } from "core/styles";
import styles from "./BookingsList.styles";

const bookings = [
  {
    id: 1,
    body: "Session with Boldoz",
    time: "20th Mar 2024",
    period: "afternoon",
    status: "Successful",
  },
  {
    id: 2,
    body: "Session with Boldoz",
    time: "20th Mar 2024",
    period: "evening",
    status: "Successful",
  },
];

const BookingsList: FC<
  BottomTabScreenProps<BookingsStackNavParams, "Bookings List">
> = ({ navigation }) => {
  const [visible, setVisible] = useState<number>(0);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={20}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
      >
        <View style={[styles.flexedRow, spacing.marginBottom28]}>
          <Text style={styles.header24}>Bookings</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Bookings")}
          >
            <Entypo name="plus" size={20} color={palette.WHITE} />

            <Text style={styles.semiheader14}>New</Text>
          </TouchableOpacity>
        </View>

        {bookings.map((booking) => {
          //   if (open && visible === booking.id)
          return <Booking key={booking.id} booking={booking} />;
        })}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default BookingsList;
