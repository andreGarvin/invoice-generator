const packageJSON = require("../package.json");

type ProjectConfig = {
  appName: string;
  description: string;
  displayName: string;
};

export const getProjectConfig = () => {
  return packageJSON.project as ProjectConfig;
};
