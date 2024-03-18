import { FC, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Asset } from "expo-asset";
import { Provider } from "react-redux";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppNav } from "navigation";
import { navigationRef, navigate } from "navigation/utils";
import interceptors from "http/interceptors";
import { images } from "core/images";
import { customFonts, registerForPushNotificationsAsync } from "core/utils";
import { store } from "store/index";

export interface Subscription {
  remove: () => void;
}

interceptors.setup(store);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App: FC = () => {
  const [fontsLoaded] = useFonts(customFonts);

  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const pushNotificationRegister = async () => {
    const token = await registerForPushNotificationsAsync();
    await AsyncStorage.setItem("expoPushToken", token);

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        navigate("Authorization", {
          notificationData: notification.request.content.data,
        });
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        navigate("Authorization", {
          notificationData: response.notification.request.content.data,
        });
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  };

  useEffect(() => {
    async function _boostrap() {
      await Asset.loadAsync(Object.values(images));
    }

    _boostrap();
    pushNotificationRegister();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
            <AppNav />
          </NavigationContainer>
        </Provider>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
