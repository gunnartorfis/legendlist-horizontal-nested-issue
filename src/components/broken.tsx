import { LegendList } from "@legendapp/list";
import React from "react";
import { Dimensions, FlatList, View } from "react-native";

// ---- Parity target (match the stripped noona-mobile setup) ----
// Outer list: React Native FlatList
// Inner list: LegendList (horizontal)
// Inner item: fixed height 500, fixed width 400

const VOUCHER_WIDTH = Dimensions.get("window").width - 83;

const windowW = Dimensions.get("window").width;

const BrokenList: React.FC<{
  vouchers: { id: string }[];
}> = ({ vouchers }) => {
  return (
    <View>
      <LegendList
        horizontal
        estimatedItemSize={VOUCHER_WIDTH}
        estimatedListSize={{ width: windowW, height: 1 }}
        keyExtractor={({ id }) => id}
        showsHorizontalScrollIndicator={false}
        data={vouchers}
        contentContainerStyle={{
          paddingBottom: 32,
        }}
        renderItem={() => {
          return (
            <View
              style={{
                height: 200,
                width: 200,
                marginHorizontal: 16,
                backgroundColor: "red",
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default function Broken() {
  return (
    <FlatList
      data={[
        {
          id: "user-vouchers",
          component: (
            <BrokenList vouchers={[{ id: "1" }, { id: "2" }, { id: "3" }]} />
          ),
        },
      ]}
      keyExtractor={(item) => item?.id ?? ""}
      contentInsetAdjustmentBehavior="automatic"
      renderItem={({ item }) => {
        return <>{item?.component ?? null}</>;
      }}
    />
  );
}
