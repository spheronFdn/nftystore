interface IEnvironmentConfig {
  api: {
    API_URL: string;
  };
}
const NODE_ENV: string = process.env.REACT_APP_STAGE || "local";
const development: IEnvironmentConfig = {
  api: {
    API_URL: process.env.REACT_APP_API_URL || "",
  },
};

const local: IEnvironmentConfig = {
  api: {
    API_URL: process.env.REACT_APP_API_URL || "",
  },
};

const production: IEnvironmentConfig = {
  api: {
    API_URL: process.env.REACT_APP_API_URL || "",
  },
};

const config: {
  [name: string]: IEnvironmentConfig;
} = {
  development,
  local,
  production,
};

export default config[NODE_ENV];
