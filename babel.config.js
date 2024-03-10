// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["src"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@navigation": "./src/navigation",
            "@src": "./src",
            "@store": "./src/store",
            "@http": "./src/http",
          },
          extensions: [".tsx", ".ts", "json"],
        },
      ],
    ],
  };
};
