import React, { FC, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Calendar } from "react-native-calendars";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { BottomTabsNavParams } from "navigation/bottom-tabs-nav/BottomTabsNav";
import { Button } from "components/Button";
import { palette, spacing, common } from "core/styles";
import styles from "./Bookings.styles";

const Bookings: FC<BottomTabScreenProps<BottomTabsNavParams, "Bookings">> = ({
  navigation,
}) => {
  const [selected, setSelected] = useState("");
  const [time, setTime] = useState<string>("");

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={20}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.header24}>Bookings</Text>
        
        {/* <Text style={styles.header24}>Book a session</Text> */}

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
          style={spacing.marginTop32}
        />

        <View style={spacing.marginTop20}>
          <Text style={styles.text14}>Time of the Day</Text>

          <View style={[styles.flexedRow, spacing.marginTop16]}>
            <TouchableOpacity
              style={[
                styles.optionContainer,
                time === "morning" && common.shadow,
              ]}
              onPress={() => setTime("morning")}
            >
              <Text style={styles.header14}>12am - 12pm</Text>
              <Text style={styles.text12}>Morning</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionContainer,
                time === "afternoon" && common.shadow,
              ]}
              onPress={() => setTime("afternoon")}
            >
              <Text style={styles.header14}>12pm - 6pm</Text>
              <Text style={styles.text12}>Afternoon</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionContainer,
                time === "evening" && common.shadow,
              ]}
              onPress={() => setTime("evening")}
            >
              <Text style={styles.header14}>6pm - 12am</Text>
              <Text style={styles.text12}>Evening</Text>
            </TouchableOpacity>
          </View>

          <Button title="Add" style={spacing.marginTop32} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Bookings;
