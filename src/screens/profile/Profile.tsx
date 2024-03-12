import React, { FC } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { BottomTabsNavParams } from "navigation/bottom-tabs-nav/BottomTabsNav";
import { layout, palette, spacing } from "core/styles";
import styles from "./Profile.styles";

const notifications = [
  {
    id: 1,
    body: "You have successfully booked an appointment for saturday afternoon",
    time: "9h",
  },
  {
    id: 2,
    body: "You have successfully booked an appointment for monday evening",
    time: "19h",
  },
];

const Profile: FC<BottomTabScreenProps<BottomTabsNavParams, "Notifications">> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={20}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.header24}>Notifications</Text>

        <View>
          {notifications.map((notification) => (
            <View style={[styles.flexedRow, spacing.marginBottom36]} key={notification.id}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="notifications"
                  size={24}
                  color={palette.ORANGE2}
                />
              </View>

              <View style={[layout.flex1, styles.flexedRow]}>
                <Text style={[styles.text14, layout.flex1]}>
                  {notification.body}
                </Text>

                <View style={styles.dot} />

                <Text style={styles.text14}>{notification.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Profile;
