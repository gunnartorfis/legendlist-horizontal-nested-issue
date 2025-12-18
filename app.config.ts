import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "uniwind-horizontal",
  newArchEnabled: true,
  experiments: {
    tsconfigPaths: true,
    typedRoutes: false,
    reactCompiler: true,
  },
  slug: "uniwind-horizontal",
  runtimeVersion: "14.0.0",
  version: "14.0.0",
  scheme: "acme",
  orientation: "portrait",
  platforms: ["ios", "android"],
  android: {
    versionCode: Math.floor(new Date().getTime() / 1000),
    package: "com.gunnartorfis.uniwindhorizontal",
    softwareKeyboardLayoutMode: "pan",
    permissions: ["android.permission.WRITE_CALENDAR"],
  },
  ios: {
    buildNumber: String(Math.floor(new Date().getTime() / 1000)),
    bundleIdentifier: "com.gunnartorfis.uniwindhorizontal",
    associatedDomains: [],
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      NSCalendarsWriteOnlyAccessUsageDescription:
        "We use these permissions to add booked appointments to your calendar.",
      NSCalendarsUsageDescription:
        "We use these permissions to add booked appointments to your calendar.",
    },
  },
  userInterfaceStyle: "automatic",
  plugins: [
    "expo-router",
    "react-native-edge-to-edge",
    ["expo-build-properties"],
  ],
});
