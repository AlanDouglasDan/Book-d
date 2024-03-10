import { createNavigationContainerRef } from "@react-navigation/native";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const navigationRef = createNavigationContainerRef<any>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const navigate = (name: any, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
