interface IEnvironmentConfig {
  api: {
    BASE_URI: string;
  };
}
const NODE_ENV: string = process.env.REACT_APP_STAGE || "local";
const development: IEnvironmentConfig = {
  api: {
    BASE_URI: process.env.REACT_APP_BASE_URI || "",
  },
};

const local: IEnvironmentConfig = {
  api: {
    BASE_URI: process.env.REACT_APP_BASE_URI || "",
  },
};

const production: IEnvironmentConfig = {
  api: {
    BASE_URI: process.env.REACT_APP_BASE_URI || "",
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
