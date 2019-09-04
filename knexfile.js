const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  connection: { database: "gitgram_test" },
  seeds: { directory: "./db/seeds" }
};

const customConfig = {
  test: { connection: { database: "gitgram_test" } },
  development: { connection: { database: "gitgram" } }
};

module.exports = { ...baseConfig, ...customConfig[ENV] };
