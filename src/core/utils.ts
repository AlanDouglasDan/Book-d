import { Platform } from "react-native";
import * as Application from "expo-application";
// import { isDevice } from "expo-device";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { sprintf } from "sprintf-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const font = {
  regular: "ComfortaaRegular",
  medium: "ComfortaaMedium",
  bold: "ComfortaaBold",
  semiBold: "ComfortaaSemiBold",
};

export let customFonts = {
  ComfortaaBold: require("../../assets/fonts/Comfortaa-Bold.ttf"),
  ComfortaaRegular: require("../../assets/fonts/Comfortaa-Regular.ttf"),
  ComfortaaMedium: require("../../assets/fonts/Comfortaa-Medium.ttf"),
  ComfortaaSemiBold: require("../../assets/fonts/Comfortaa-SemiBold.ttf"),
};

export const noop = () => {};

export const getFormattedCounter = (timeInSeconds: number): string => {
  const seconds = timeInSeconds % 60;
  const minutes = (timeInSeconds / 60) % 60;
  return sprintf("%02d:%02d", minutes, seconds);
};

export const formatCurrency = (number, fixed = 0) => {
  const fixedValue = !Number.isInteger(number) ? 2 : fixed;
  return fixedValue > 0
    ? number && number.toFixed(fixedValue).replace(/\d(?=(\d{3})+\.)/g, "$&,")
    : Math.round(((number + Number.EPSILON) * 100) / 100)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

export const extractDate = (time: string) => {
  let hours = parseInt(time.slice(0, 2)); // Extract hours (08)
  const minutes = parseInt(time.slice(3, 5)); // Extract minutes (00)
  const isAM = time.slice(-2) === "AM"; // Check for AM/PM

  const currentDate = new Date();

  // Adjust hours for PM
  if (!isAM && hours !== 12) {
    hours += 12; // Add 12 for hours in PM format
  }

  currentDate.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, milliseconds

  return currentDate;
};

export const trimStringWithEllipsis = (
  inputString: string,
  charLimit: number | undefined = 20
): string => {
  if (inputString.length <= charLimit) {
    return inputString;
  }

  const trimmedString = inputString.slice(0, charLimit - 3);
  return trimmedString + "...";
};

export const formatDate = (date, noTime = false) => {
  const inputDate = new Date(date);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = inputDate.getDate();
  const month = months[inputDate.getMonth()];
  const year = inputDate.getFullYear();

  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  const formattedDate = noTime
    ? `${month} ${day}, ${year}`
    : `${day} ${month} ${year}, ${formattedHours}:${formattedMinutes} ${amPm}`;
  return formattedDate;
};

export const registerForPushNotificationsAsync = async () => {
  let token;
  let expCf = Constants?.expoConfig;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  // if (isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  token = await Notifications.getExpoPushTokenAsync({
    projectId: "77325c0e-42d5-49e5-a745-c75372f38ae0",
  });

  console.log(token);
  // } else {
  //   alert("Must use physical device for Push Notifications");
  // }

  return token.data;
};

export const timeDifference = (dateStr: string | number | Date) => {
  // Parse the date string into a Date object
  const date = new Date(dateStr);

  // Calculate the time difference in milliseconds
  const timeDiff = Math.abs(date.getTime() - Date.now());

  // Define units and their corresponding thresholds in milliseconds
  const units: [string, number][] = [
    ["y", 365 * 24 * 60 * 60 * 1000],
    ["m", 30 * 24 * 60 * 60 * 1000],
    ["d", 24 * 60 * 60 * 1000],
    ["h", 60 * 60 * 1000],
    ["min", 60 * 1000],
    ["", 1000],
  ];

  // Find the most suitable unit
  for (const [unit, threshold] of units) {
    if (timeDiff >= threshold) {
      const numUnits = Math.floor(timeDiff / threshold);
      return `${numUnits} ${unit} ago`;
    }
  }

  // If no suitable unit is found, return "just now"
  return "just now";
};

export const getApplicationVersion = () => {
  return Application.nativeApplicationVersion;
};

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
export async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Welcome",
    body: "Welcome to the Coauth community!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export const generateRandomUUID = () => {
  const timestamp = new Date().getTime().toString();
  const randomPart = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  AsyncStorage.setItem("deviceId", timestamp + randomPart);

  return timestamp + randomPart;
};
