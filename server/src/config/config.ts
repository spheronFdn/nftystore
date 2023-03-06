import * as dotenv from "dotenv";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";
interface IEnvironmentConfig {
  port: string | number;
  uiUrl: string;
  maxUploadSize: string | number;
  rootUploadDirectory: string;
  hostingApi: {
    hostAddress: string;
    apiToken: string;
  };
}
const development: IEnvironmentConfig = {
  port: process.env.PORT || 8088,
  uiUrl: process.env.UI_URL,
  maxUploadSize: process.env.MAX_UPLOAD_SIZE,
  rootUploadDirectory:
    process.env.ROOT_UPLOAD_DIRECTORY || "./uploaded-content",
  hostingApi: {
    hostAddress: "http://localhost:8002",
    apiToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiIwZTZmY2U5OGNmY2RjY2Y5OWU0NjU5MmIwNGZlZTEwMzkwMGU5YmNjZWUxNzk0ZDViYmE4NDBiYjA3OWY1ZjIyZjhjMDg3OGNkYjlmMjBkOGVmYmNlNGMwN2NlMmNiMzhlNmVhYjZmZTY4OTk5ZDBhZDQyZDMwY2JiNDg0NWZjNyIsImlhdCI6MTY3MTEyMjUxNiwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.oasTsRUcXEWD39mZgS7T99os0ekYu8rpzGFQh8PKTK4",
  },
};

const test: IEnvironmentConfig = {
  port: process.env.PORT || 3001,
  uiUrl: process.env.UI_URL,
  maxUploadSize: process.env.MAX_UPLOAD_SIZE,
  rootUploadDirectory:
    process.env.ROOT_UPLOAD_DIRECTORY || "./uploaded-content",
  hostingApi: {
    hostAddress:
      process.env.HOSTING_API_HOST_ADDRESS || "http://localhost:8080/",
    apiToken: process.env.API_TOKEN,
  },
};

const production: IEnvironmentConfig = {
  port: process.env.PORT || 3001,
  uiUrl: process.env.UI_URL,
  maxUploadSize: process.env.MAX_UPLOAD_SIZE,
  rootUploadDirectory:
    process.env.ROOT_UPLOAD_DIRECTORY || "./uploaded-content",
  hostingApi: {
    hostAddress:
      process.env.HOSTING_API_HOST_ADDRESS || "http://localhost:8080",
    apiToken: process.env.API_TOKEN,
  },
};

const config: {
  [name: string]: IEnvironmentConfig;
} = {
  development,
  test,
  production,
};

export default config[NODE_ENV];
