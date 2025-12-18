module.exports = function (api) {
  api.cache(true);

  // Keep config minimal, but allow opt-in parity with noona-mobile when the plugin exists.
  const plugins = [];

  try {
    // If available (e.g. hoisted in the monorepo), this matches noona-mobile's worklets setup.
    // eslint-disable-next-line import/no-extraneous-dependencies
    require.resolve("react-native-worklets/plugin");
    plugins.push("react-native-worklets/plugin");
  } catch {
    // Plugin not installed in this app; ignore so the repro still runs.
  }

  return {
    presets: ["babel-preset-expo"],
    plugins,
  };
};


