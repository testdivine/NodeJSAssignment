module.exports = {
  presets: ["@babel/preset-typescript", "@babel/preset-env"],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ["transform-class-properties"],
    ["@babel/plugin-transform-regenerator", {
      "asyncGenerators": true,
      "generators": true,
      "async": true,
    }],
    ["@babel/plugin-transform-runtime"]
  ],
};