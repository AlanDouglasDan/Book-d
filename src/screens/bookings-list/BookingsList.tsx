import React, { FC, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { BookingsStackNavParams } from "navigation/bookings-stack-nav/BookingsStackNav";
import { useBooking } from "store/booking/hooks";
import { Booking } from "components/Booking";
import { palette, spacing, common } from "core/styles";
import styles from "./BookingsList.styles";

const BookingsList: FC<
  BottomTabScreenProps<BookingsStackNavParams, "Bookings List">
> = ({ navigation }) => {
  const { getBookings, loading, bookings } = useBooking();

  useEffect(() => {
    getBookings();
  }, []);

  if (loading)
    return (
      <ActivityIndicator
        style={{ flex: 1, backgroundColor: palette.BG_COLOR }}
        size="large"
        color={palette.ORANGE}
      />
    );

  console.log(bookings);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => getBookings()}
          />
        }
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
      >
        <View style={[styles.flexedRow, spacing.marginBottom28]}>
          <Text style={styles.header24}>Availability</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Bookings", {})}
          >
            <Entypo name="plus" size={20} color={palette.WHITE} />

            <Text style={styles.semiheader14}>New</Text>
          </TouchableOpacity>
        </View>

        {bookings?.length !== 0 ? (
          bookings?.map((booking) => {
            return (
              <Booking
                key={booking.id}
                booking={booking}
                navigation={navigation}
              />
            );
          })
        ) : (
          <View style={styles.center}>
            <Text style={styles.header18}>
              You don't have any reserved dates
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingsList;
