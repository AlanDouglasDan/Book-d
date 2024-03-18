import React, { FC, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Calendar, Agenda } from "react-native-calendars";
import { Octicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { BookingsStackNavParams } from "navigation/bookings-stack-nav/BookingsStackNav";
import { useBooking } from "store/booking/hooks";
import { ErrorModal } from "components/ErrorModal";
import { SuccessModal } from "components/SuccessModal";
import { Button } from "components/Button";
import { extractDate } from "core/utils";
import { palette, spacing } from "core/styles";
import styles from "./Bookings.styles";

const Bookings: FC<
  BottomTabScreenProps<BookingsStackNavParams, "Bookings">
> = ({ navigation, route }) => {
  const {
    date: selectedDate,
    startTime: _startTime,
    endTime: _endTime,
    id,
  } = route.params ?? {};

  const {
    createBooking,
    loading,
    error,
    setError,
    getBookings,
    updateBooking,
  } = useBooking();

  const [selected, setSelected] = useState<string>(selectedDate ?? "");
  const [startTime, setStartTime] = useState<Date>(
    _startTime ? extractDate(_startTime) : new Date()
  );
  const [endTime, setEndTime] = useState<Date>(
    _endTime ? extractDate(_endTime) : new Date()
  );
  const [open, setOpen] = useState<boolean>(false);

  const onChangeStartTime = (event: DateTimePickerEvent, selectedTime: any) =>
    setStartTime(selectedTime);

  const onChangeEndTime = (event: DateTimePickerEvent, selectedTime: any) =>
    setEndTime(selectedTime);

  const handleSubmit = async () => {
    const payload = {
      date: selected,
      startTime: startTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      endTime: endTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };

    let res;
    id
      ? (res = await updateBooking({ id, ...payload }))
      : (res = await createBooking(payload));

    if (res && !res.error) {
      setOpen(true);
      await getBookings();
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={20}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.header24}>
          {selectedDate ? "Edit Availability" : "Schedule Availability"}
        </Text>

        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          minDate={String(new Date())}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: palette.ORANGE,
            },
          }}
          disabledDaysIndexes={[]}
          disabledDates={({ date }) => {
            return ["2024-03-20"].some(
              (disabledDate) => disabledDate.toString === date.dateString
            );
          }}
          style={spacing.marginTop32}
        />

        {/* <Agenda
          // The list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key has to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={{
            "2024-03-17": [
              { name: "item 1 - any js object", height: 80, day: "" },
            ],
            "2024-03-18": [{ name: "item 1 - any js object", height: 80, day: "" },],
            "2024-03-19": [],
            "2024-03-20": [
              { name: "item 1 - any js object", height: 80, day: "" },
              // { name: "any js object" },
            ],
          }}
          // Callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={(month) => {
            console.log("trigger items loading");
          }}
          // Callback that fires when the calendar is opened or closed
          onCalendarToggled={(calendarOpened) => {
            console.log(calendarOpened);
          }}
          // Callback that gets called on day press
          onDayPress={(day) => {
            console.log("day pressed");
          }}
          // Callback that gets called when day changes while scrolling agenda list
          onDayChange={(day) => {
            console.log("day changed");
          }}
          // Initially selected day
          selected={"2012-05-16"}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={"2012-05-10"}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={"2012-05-30"}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Specify how each item should be rendered in agenda
          renderItem={(item, firstItemInDay) => {
            return <View />;
          }}
          // Specify how each date should be rendered. day can be undefined if the item is not first in that day
          renderDay={(day, item) => {
            return <View />;
          }}
          // Specify how empty date content with no items should be rendered
          renderEmptyDate={() => {
            return <View />;
          }}
          // Specify how agenda knob should look like
          renderKnob={() => {
            return <View />;
          }}
          // Override inner list with a custom implemented component
          // renderList={(listProps) => {
          //   return <MyCustomList {...listProps} />;
          // }}
          // Specify what should be rendered instead of ActivityIndicator
          renderEmptyData={() => {
            return <View />;
          }}
          // Specify your item comparison function for increased performance
          // rowHasChanged={(r1, r2) => {
          //   return r1.text !== r2.text;
          // }}
          // Hide knob button. Default = false
          hideKnob={true}
          // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
          showClosingKnob={false}
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          markedDates={{
            "2012-05-16": { selected: true, marked: true },
            "2012-05-17": { marked: true },
            "2012-05-18": { disabled: true },
          }}
          // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
          disabledByDefault={true}
          // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
          onRefresh={() => console.log("refreshing...")}
          // Set this true while waiting for new data from a refresh
          refreshing={false}
          // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
          // refreshControl={null}
          // Agenda theme
          theme={{
            // ...calendarTheme,
            agendaDayTextColor: "yellow",
            agendaDayNumColor: "green",
            agendaTodayColor: "red",
            agendaKnobColor: "blue",
          }}
          // Agenda container style
          style={{}}
        /> */}

        <View style={spacing.marginTop20}>
          <View style={styles.flexedRow}>
            <View>
              <Text style={styles.text14}>Available from</Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={startTime}
                mode="time"
                // display="spinner"
                is24Hour={true}
                onChange={onChangeStartTime}
                textColor={palette.BLACK}
                accentColor={palette.BLUE}
                themeVariant="light"
                style={{ alignSelf: "flex-start", marginTop: 12 }}
              />
            </View>

            <Octicons name="dash" size={24} color="black" />

            <View>
              <Text style={styles.text14}>Available till</Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={endTime}
                mode="time"
                // display="spinner"
                is24Hour={true}
                onChange={onChangeEndTime}
                textColor={palette.BLACK}
                accentColor={palette.BLUE}
                themeVariant="light"
                style={{ alignSelf: "flex-start", marginTop: 12 }}
              />
            </View>
          </View>

          <Button
            title={id ? "Update" : "Add"}
            style={spacing.marginTop32}
            onPress={handleSubmit}
            loading={loading}
            disabled={loading || selected === ""}
          />
        </View>
      </KeyboardAwareScrollView>

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
        message={id ? "Availability Updated" : "Availability Created"}
      />
    </SafeAreaView>
  );
};

export default Bookings;
