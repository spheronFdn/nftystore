import * as dotenv from "dotenv";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";
interface IEnvironmentConfig {
  port: string | number;
  uiUrl: string;
  maxUploadSize: string | number;
  maxUploadTimeout: string | number;
  rootUploadDirectory: string;
  hostingApi: {
    hostAddress: string;
    apiToken: string;
  };
}
const development: IEnvironmentConfig = {
  port: process.env.PORT || 8088,
  uiUrl: process.env.UI_URL || "https://nftystore.io/",
  maxUploadSize: process.env.MAX_UPLOAD_SIZE || 1024 * 1024 * 1024,
  maxUploadTimeout: process.env.MAX_UPLOAD_TIMEOUT || 1000 * 60 * 30,
  rootUploadDirectory:
    process.env.ROOT_UPLOAD_DIRECTORY || "./uploaded-content",
  hostingApi: {
    hostAddress:
      process.env.HOSTING_API_HOST_ADDRESS || "http://localhost:8002",
    apiToken: process.env.API_TOKEN,
  },
};

const test: IEnvironmentConfig = {
  port: process.env.PORT || 3001,
  uiUrl: process.env.UI_URL,
  maxUploadSize: process.env.MAX_UPLOAD_SIZE || 1024 * 1024 * 1024,
  maxUploadTimeout: process.env.MAX_UPLOAD_TIMEOUT || 1000 * 60 * 30,
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
  maxUploadSize: process.env.MAX_UPLOAD_SIZE || 1024 * 1024 * 1024,
  maxUploadTimeout: process.env.MAX_UPLOAD_TIMEOUT || 1000 * 60 * 30,
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
