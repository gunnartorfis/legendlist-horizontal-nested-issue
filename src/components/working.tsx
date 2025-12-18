import { LegendList } from "@legendapp/list";
import React from "react";
import { Dimensions, View } from "react-native";

// ---- Parity target (match the stripped noona-mobile setup) ----
// Outer list: React Native FlatList
// Inner list: LegendList (horizontal)
// Inner item: fixed height 500, fixed width 400

const VOUCHER_WIDTH = Dimensions.get("window").width - 83;

const windowW = Dimensions.get("window").width;

const BrokenList: React.FC<{
  vouchers: { id: string }[];
}> = ({ vouchers }) => {
  const [measuredHeight, setMeasuredHeight] = React.useState<number | null>(
    null
  );
  return (
    <LegendList
      horizontal
      estimatedItemSize={VOUCHER_WIDTH}
      estimatedListSize={{ width: windowW, height: 1 }}
      style={measuredHeight != null ? { height: measuredHeight } : undefined}
      keyExtractor={({ id }) => id}
      showsHorizontalScrollIndicator={false}
      data={vouchers}
      contentContainerStyle={{
        paddingBottom: 32,
      }}
      renderItem={() => {
        const item = (
          <View
            style={{
              height: 200,
              width: 200,
              marginHorizontal: 16,
              backgroundColor: "red",
            }}
          />
        );

        if (measuredHeight !== null) {
          return item;
        }

        return (
          <View
            onLayout={(e) => {
              const h = e.nativeEvent.layout.height;
              if (h > 0) {
                setMeasuredHeight(h);
              }
            }}
          >
            {item}
          </View>
        );
      }}
    />
  );
};

export default function Broken() {
  return <BrokenList vouchers={[{ id: "1" }, { id: "2" }, { id: "3" }]} />;
}
