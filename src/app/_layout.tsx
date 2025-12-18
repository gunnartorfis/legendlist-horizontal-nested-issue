import "../global.css";

import { Slot } from "expo-router";
import React from "react";
import { View } from "react-native";

/**
 * NOTE:
 * Metro does not support `require(id)` where `id` is dynamic.
 * For debugging, we use static imports and you can comment/uncomment wrappers below.
 *
 * Start from the minimal version (just `<Slot />`), then uncomment ONE wrapper at a time.
 */

// Uncomment to test gesture handler root:
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Uncomment to test keyboard provider:
import { KeyboardProvider } from "react-native-keyboard-controller";

// Uncomment to test portals:
// import { PortalProvider } from "@gorhom/portal";

// Uncomment to test bottom sheet provider:
// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// Uncomment to test edge-to-edge SystemBars:
// import { SystemBars } from "react-native-edge-to-edge";

export default function Layout() {
  // Minimal root (baseline)
  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    // <KeyboardProvider>
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
    // </KeyboardProvider>
    // </GestureHandlerRootView>
  );

  /**
   * Wrapper template (copy/paste and uncomment the corresponding import above):
   *
   * return (
   *   <GestureHandlerRootView style={{ flex: 1 }}>
   *     <SystemBars style="auto" />
   *     <KeyboardProvider>
   *       <BottomSheetModalProvider>
   *         <PortalProvider>
   *           <Slot />
   *         </PortalProvider>
   *       </BottomSheetModalProvider>
   *     </KeyboardProvider>
   *   </GestureHandlerRootView>
   * );
   */
}
