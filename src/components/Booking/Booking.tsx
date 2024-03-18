import { FC, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { BookingsStackNavParams } from "navigation/bookings-stack-nav/BookingsStackNav";
import { formatDate } from "core/utils";
import { palette, common, spacing } from "core/styles";
import styles from "./Booking.styles";

interface BookingProps {
  booking: any;
  navigation: BottomTabNavigationProp<
    BookingsStackNavParams,
    "Booking Details" | "Bookings List",
    undefined
  >;
}

const Booking: FC<BookingProps> = ({ booking, navigation }) => {
  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity
        style={[
          common.shadow,
          styles.flexedRow,
          styles.transactionContainer,
          spacing.marginBottom16,
        ]}
        key={booking._id}
        delayLongPress={500}
        onPress={() =>
          navigation.navigate("Booking Details", { bookingDetails: booking })
        }
      >
        <View style={styles.flexedRow}>
          <View style={styles.gap}>
            <Text style={styles.header14}>{booking?.date}</Text>
            <Text style={[styles.text12, { color: palette.GREEN }]}>
              Successful
            </Text>
          </View>
        </View>

        <View style={styles.gap}>
          <Text style={[styles.header14, styles.textRight]}>
            {booking?.startTime} - {booking?.endTime}
          </Text>
          <Text style={[styles.text12, styles.textRight]}>
            Created on {formatDate(booking?.createdAt, true)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Booking;
