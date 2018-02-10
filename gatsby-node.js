exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-html") {
    config.loader("null", {
      test: /PaypalForm/,
      loader: "null-loader",
    });
  }
};