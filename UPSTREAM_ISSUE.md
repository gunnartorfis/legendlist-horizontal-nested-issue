# LegendList horizontal cross-axis clipping (investigation harness)

This app (`apps/uniwind-horizontal`) exists to help isolate a production bug in `noona-mobile` where **horizontal `LegendList` items are clipped vertically** (their `height` is not respected).

## What this repo now matches

`src/app/index.tsx` has been updated to mirror the stripped production setup:

- Outer list: **React Native** `FlatList`
- Inner list: **`@legendapp/list`** `LegendList` with `horizontal={true}`
- Inner item: `height: 500`, `width: 400`, background red

It also logs `onLayout` values for the list wrapper and the item to help spot when the list’s cross-axis size is 0/too small.

## Hypothesis

LegendList positions children absolutely. If the list ends up with a 0 (or too-small) cross-axis size (height for horizontal lists), the absolutely-positioned children won’t contribute to layout and will appear **clipped**.

LegendList itself warns about this in dev:
> “List width/height is 0. You may need to set a style or `flex:` for the list, because children are absolutely positioned.”

## Root-wrapper toggles (to find the trigger)

`src/app/_layout.tsx` contains guarded toggles to add common “app root” wrappers that may affect measurement. Enable them one-by-one:

- `ENABLE_GESTURE_HANDLER_ROOT`
- `ENABLE_KEYBOARD_PROVIDER`
- `ENABLE_PORTAL_PROVIDER`
- `ENABLE_BOTTOM_SHEET_PROVIDER`
- `ENABLE_SYSTEM_BARS`

These are guarded `require()` calls so the app can still run if a module isn’t installed locally.

## Next upstreamable info to collect

To file a high-quality upstream issue, we still need the *flipping change*:

1. Confirm the bug reproduces in `noona-mobile` (it does today).
2. Toggle wrappers / Metro config deltas until this app reproduces the same clipping.
3. Capture:
   - a screenshot
   - the `onLayout` logs
   - which toggle/config change flipped it


