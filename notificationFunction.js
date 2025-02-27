import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import Constants from "expo-constants"
import * as Device from "expo-device";

export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
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
    const projectId = Constants.expoConfig?.extra?.eas?.projectId
    console.log("Constants.expoConfig?.extra?.eas.projectId",Constants.expoConfig?.extra?.eas?.projectId)
    const response = await Notifications.getExpoPushTokenAsync({ projectId });
    token = response.data
  } else {
    alert("Must use a physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#224E7F",
    });
  }


  return token;
}