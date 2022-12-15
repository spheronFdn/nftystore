import * as dotenv from "dotenv";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";
interface IEnvironmentConfig {
  port: string | number;
  uiUrl: string;
  hostingApi: {
    HOST_ADDRESS: string;
  };
}
const development: IEnvironmentConfig = {
  port: process.env.PORT || 3001,
  uiUrl: process.env.UI_URL,
  hostingApi: {
    HOST_ADDRESS:
      process.env.HOSTING_API_HOST_ADDRESS || "http://localhost:8080",
  },
};

const test: IEnvironmentConfig = {
  port: process.env.PORT || 3001,
  uiUrl: process.env.UI_URL,
  hostingApi: {
    HOST_ADDRESS:
      process.env.HOSTING_API_HOST_ADDRESS || "http://localhost:8080/",
  },
};

const production: IEnvironmentConfig = {
  port: process.env.PORT || 3001,
  uiUrl: process.env.UI_URL,
  hostingApi: {
    HOST_ADDRESS:
      process.env.HOSTING_API_HOST_ADDRESS || "http://localhost:8080",
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
