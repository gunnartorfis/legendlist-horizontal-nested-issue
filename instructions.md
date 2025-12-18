# Reproduce LegendList + Uniwind Nested Horizontal FlatList Issue

## Problem Summary

When using `LegendList` from `@legendapp/list` wrapped with `withUniwind` from `uniwind`, nested horizontal FlatLists inside a vertical FlatList have their item heights cut off/clipped. The same code works correctly when using React Native's native `FlatList`.

## Goal

Create a minimal reproduction that demonstrates this issue so we can:

1. Confirm the root cause
2. Report it to the appropriate library maintainers (LegendList or Uniwind)
3. Find a proper fix

## Stack Requirements

Use ONLY these libraries (already installed):

- `expo` (React Native)
- `@legendapp/list` - LegendList virtualized list
- `uniwind` - Tailwind-style className support for React Native

## Setup Instructions

1. The repository already has the dependencies installed
2. Create a simple Expo app with a single screen

## Reproduction Steps

### Step 1: Create a custom FlatList component

Create a file that wraps LegendList with withUniwind, mimicking our production setup:

```tsx
// src/components/FlatList.tsx
import { LegendList, LegendListProps } from "@legendapp/list";
import { withUniwind } from "uniwind";

const StyledLegendList = withUniwind(LegendList);

export const FlatList = StyledLegendList as <T = any>(
  props: LegendListProps<T>
) => React.ReactElement;
```

### Step 2: Create the reproduction screen

Create a screen with:

1. A **vertical** FlatList (the parent/outer list)
2. One of the items in the vertical list contains a **horizontal** FlatList (the nested list)
3. The horizontal FlatList items should have explicit heights (e.g., 200px)

```tsx
// src/App.tsx (or main screen)
import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "./components/FlatList";

// Test data for the nested horizontal list
const horizontalItems = [
  { id: "1", title: "Card 1" },
  { id: "2", title: "Card 2" },
  { id: "3", title: "Card 3" },
];

// Horizontal list component (this is what breaks)
const HorizontalSection = () => {
  return (
    <FlatList
      horizontal
      data={horizontalItems}
      estimatedItemSize={300}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={{
            width: 300,
            height: 200, // THIS HEIGHT GETS CUT OFF
            backgroundColor: "red",
            marginRight: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 24 }}>{item.title}</Text>
        </View>
      )}
    />
  );
};

// Sections for the vertical list
const sections = [
  { id: "header", type: "header" },
  { id: "horizontal-section", type: "horizontal" }, // The problematic nested list
  { id: "footer", type: "footer" },
];

export default function App() {
  return (
    <FlatList
      data={sections}
      estimatedItemSize={100}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        if (item.type === "header") {
          return (
            <View style={{ padding: 20, backgroundColor: "#f0f0f0" }}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                Header Section
              </Text>
            </View>
          );
        }

        if (item.type === "horizontal") {
          return (
            <View>
              <Text style={{ padding: 20, fontSize: 18 }}>
                Horizontal Section (items should be 200px tall)
              </Text>
              <HorizontalSection />
            </View>
          );
        }

        return (
          <View style={{ padding: 20, backgroundColor: "#e0e0e0" }}>
            <Text style={{ fontSize: 24 }}>Footer Section</Text>
          </View>
        );
      }}
    />
  );
}
```

### Step 3: Run and observe the bug

Run the app and observe that the red cards in the horizontal section are **cut off** - they do not display at their full 200px height.

### Step 4: Verify it works with native FlatList

Change the import in the horizontal section to use React Native's native FlatList:

```tsx
import { FlatList as RNFlatList } from "react-native";

const HorizontalSection = () => {
  return (
    <RNFlatList // Changed from FlatList to RNFlatList
      horizontal
      // ... rest of props
    />
  );
};
```

The cards should now display at their full 200px height, confirming the issue is with the LegendList + withUniwind combination.

## Expected vs Actual Behavior

### Expected

- Red cards in the horizontal section should be 200px tall
- The horizontal list should be scrollable and show all cards

### Actual

- Red cards are clipped/cut off (only partial height visible)
- The height specified in the style is not respected

## Variations to Test

Once reproduced, test these variations to isolate the cause:

1. **LegendList without withUniwind** - Does the issue occur?
2. **Native FlatList with withUniwind** - Does the issue occur?
3. **LegendList with explicit container height** - Does wrapping in a View with fixed height help?
4. **Different estimatedItemSize values** - Does this affect the clipping?

## Notes

- The issue only occurs with **nested** lists (horizontal inside vertical)
- The issue only occurs when the **inner** list is horizontal
- Wrapping the horizontal FlatList in a View container may or may not help
- The `estimatedItemSize` prop on LegendList may be related to the issue

## Files to Create

1. `src/components/FlatList.tsx` - LegendList wrapped with withUniwind
2. `src/App.tsx` or main screen - Reproduction case
3. Optionally: `src/components/NativeFlatList.tsx` - For comparison testing

## Success Criteria

The reproduction is successful when:

1. You can see the red cards being cut off with LegendList + withUniwind
2. Switching to native FlatList makes the cards display correctly
3. The issue is isolated to the minimal code necessary to reproduce it
