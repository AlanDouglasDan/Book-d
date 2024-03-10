import React, { FC } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { BottomTabsNavParams } from "navigation/bottom-tabs-nav/BottomTabsNav";
import { spacing, palette, common } from "core/styles";
// import {images} from 'core/images';
import styles from "./Dashboard.styles";

const Dashboard: FC<BottomTabScreenProps<BottomTabsNavParams, "Dashboard">> = ({
  navigation,
}) => {
  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={20}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
      >
        <View style={[styles.header]}>
          <View style={styles.flexedRow}>
            <View
              style={[
                styles.flexedRow,
                { justifyContent: "flex-start", gap: 10 },
              ]}
            >
              <FontAwesome5
                name="user-circle"
                size={35}
                color={palette.GREY1}
              />

              <View>
                <Text style={styles.semiHeader16}>Welcome Alan 😊</Text>
              </View>
            </View>

            {/* <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <FontAwesome name="bell-o" size={24} color={palette.WHITE} />
          </TouchableOpacity> */}
          </View>
        </View>

        <View style={styles.paddedContainer}>
          <View style={styles.flexedRow}>
            <View style={[common.shadow, styles.topContainer]}>
              <View
                style={[styles.circle, { backgroundColor: palette.LIGHT_BLUE }]}
              >
                <Ionicons name="eye" size={15} color={palette.BLUE} />
              </View>

              <Text style={styles.text14}>Reviews</Text>
              <Text style={[styles.text14, { color: palette.BLUE }]}>0</Text>
            </View>

            <View style={[common.shadow, styles.topContainer]}>
              <View
                style={[
                  styles.circle,
                  { backgroundColor: palette.LIGHT_ORANGE },
                ]}
              >
                <Ionicons name="calendar" size={15} color={palette.ORANGE} />
              </View>

              <Text style={styles.text14}>Appointments</Text>
              <Text style={[styles.text14, { color: palette.ORANGE }]}>34</Text>
            </View>
          </View>

          <View style={spacing.marginTop32}>
            {/* <Text style={styles.header20}>Upcoming Bookings</Text> */}

            {/* <Calendar
              // onDayPress={(day) => {
              //   setSelected(day.dateString);
              // }}
              markedDates={{
                "2024-03-01": {
                  selected: true,
                  selectedColor: palette.ORANGE,
                },
                "2024-03-02": { selected: true, selectedColor: palette.ORANGE },
                "2024-03-03": {
                  selected: true,
                  selectedColor: palette.ORANGE,
                },
              }}
            /> */}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Dashboard;
