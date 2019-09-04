const ENV = process.env.NODE_ENV || "development";

const data = {
  development: require("./dev-data"),
  test: require("./test-data")
};

module.exports = data[ENV];
