const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

module.exports = (phase) => {
  const env = {
    API_URL: (() => {
      if (process.env.API_URL) return process.env.API_URL;
    })(),
  };
  return {
    async rewrites() {
      return [
        {
          source: "/bee.js",
          destination: "https://cdn.splitbee.io/sb.js",
        },
        {
          source: "/_hive/:slug",
          destination: "https://hive.splitbee.io/:slug",
        },
      ];
    },
    env,
    images: {
      domains: [
        "koopr.fra1.cdn.digitaloceanspaces.com",
        "koopr.fra1.digitaloceanspaces.com",
      ],
      imageSizes: [64, 128],
      loader: "default",
    },
  };
};
