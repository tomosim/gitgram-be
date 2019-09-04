const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  seeds: { directory: "./db/seeds" },
  migrations: { directory: "./db/migrations" }
};

const customConfig = {
  test: { connection: { database: "gitgram_test", host: "localhost" } },
  development: { connection: { database: "gitgram", host: "localhost" } }
};

module.exports = { ...baseConfig, ...customConfig[ENV] };
