import React, { FC, useState } from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { BookingsStackNavParams } from "navigation/bookings-stack-nav/BookingsStackNav";
import { useBooking } from "@src/store/booking/hooks";
import { ErrorModal } from "components/ErrorModal";
import { SuccessModal } from "components/SuccessModal";
import { Button } from "components/Button";
import { formatDate } from "core/utils";
import { palette, spacing, common, typography } from "core/styles";
import styles from "./BookingDetails.styles";

const BookingDetails: FC<
  BottomTabScreenProps<BookingsStackNavParams, "Booking Details">
> = ({ navigation, route }) => {
  const { bookingDetails } = route.params ?? {};

  const { loading, deleteBooking, error, setError, getBookings } = useBooking();

  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    const res = await deleteBooking({ id: bookingDetails._id });

    if (res && !res.error) {
      setOpen(true);
      await getBookings();
      //   navigation.navigate("Bookings List");
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
      >
        <View style={spacing.marginBottom28}>
          <Text style={styles.header24}>Availability Details</Text>
        </View>

        <View style={[styles.body, common.shadow]}>
          <Text style={styles.header16}>
            {bookingDetails.startTime} - {bookingDetails.endTime}
          </Text>

          <View style={[styles.flexedRow, spacing.marginTop28]}>
            <Text style={styles.text12}>Appointment Date</Text>
            <Text style={styles.header14}>{bookingDetails.date}</Text>
          </View>

          {/* <View style={[styles.flexedRow, spacing.marginTop16]}>
            <Text style={styles.text12}>Time</Text>
            <Text style={styles.header14}>{bookingDetails.time}</Text>
          </View> */}

          <View style={[styles.flexedRow, spacing.marginTop16]}>
            <Text style={styles.text12}>Name</Text>
            <Text style={styles.header14}>
              {bookingDetails.userId.firstName} {bookingDetails.userId.lastName}
            </Text>
          </View>

          <View style={[styles.flexedRow, spacing.marginTop16]}>
            <Text style={styles.text12}>Phone Number</Text>
            <Text style={styles.header14}>{bookingDetails.userId.phone}</Text>
          </View>

          <View style={[styles.flexedRow, spacing.marginTop16]}>
            <Text style={styles.text12}>Email</Text>
            <Text style={styles.header14}>{bookingDetails.userId.email}</Text>
          </View>

          <View style={[styles.flexedRow, spacing.marginTop16]}>
            <Text style={styles.text12}>Business Name</Text>
            <Text style={styles.header14}>
              {bookingDetails.userId.businessName}
            </Text>
          </View>

          <View style={[styles.flexedRow, spacing.marginTop16]}>
            <Text style={styles.text12}>Status</Text>
            <Text style={[styles.header14, { color: palette.GREEN }]}>
              Successful
            </Text>
          </View>

          <View style={[styles.flexedRow, spacing.marginTop16]}>
            <Text style={styles.text12}>Created on</Text>
            <Text style={styles.header14}>
              {formatDate(bookingDetails?.createdAt)}
            </Text>
          </View>

          <Button
            title="Edit"
            style={spacing.marginTop28}
            onPress={() =>
              navigation.navigate("Bookings", {
                date: bookingDetails.date,
                startTime: bookingDetails.startTime,
                endTime: bookingDetails.endTime,
                id: bookingDetails._id
              })
            }
            textStyle={{ ...typography.semiheader14 }}
            containerStyle={{ paddingVertical: 8 }}
            opaque={false}
          />

          <Button
            title="Delete"
            style={spacing.marginTop12}
            textStyle={{ ...typography.semiheader14 }}
            containerStyle={{ paddingVertical: 8 }}
            onPress={handleDelete}
            loading={loading}
            disabled={loading}
          />
        </View>
      </ScrollView>

      <ErrorModal
        open={!!error}
        onClose={() => setError(false)}
        message={
          typeof error === "string" ? error : "Oops, something went wrong!"
        }
      />

      <SuccessModal
        open={open}
        onClose={() => {
          setOpen(false);
          navigation.navigate("Bookings List");
        }}
        message="Avaialability Deleted Successfully"
      />
    </SafeAreaView>
  );
};

export default BookingDetails;
