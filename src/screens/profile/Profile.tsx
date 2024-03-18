import React, { FC, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { BottomTabsNavParams } from "navigation/bottom-tabs-nav/BottomTabsNav";
import { useNotification } from "store/notification/hooks";
import { timeDifference } from "core/utils";
import { layout, palette, spacing } from "core/styles";
import styles from "./Profile.styles";

const _notifications = [
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

const Profile: FC<
  BottomTabScreenProps<BottomTabsNavParams, "Notifications">
> = ({ navigation }) => {
  const { getNotifications, loading, notifications } = useNotification();

  useEffect(() => {
    getNotifications();
  }, []);

  if (loading)
    return (
      <ActivityIndicator
        style={{ flex: 1, backgroundColor: palette.BG_COLOR }}
        size="large"
        color={palette.ORANGE}
      />
    );

  console.log(notifications, "yowza");

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => getNotifications()}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.header24}>Notifications</Text>

        <View>
          {notifications?.length !== 0 ? (
            notifications?.map((notification) => (
              <View
                style={[styles.flexedRow, spacing.marginBottom36]}
                key={notification._id}
              >
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

                  <Text style={styles.text12}>
                    {timeDifference(notification.createdAt)}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.center}>
              <Text style={styles.header18}>
                Your notifications folder is currently empty
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
