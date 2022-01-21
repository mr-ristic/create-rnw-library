import getGitConfigPath from "git-config-path";
import parseGitConfig from "parse-git-config";
import which from "which";
import { Params } from "./types";

import config from "./config";

const defaultConfig = async () => {
  const defaults: Params = {
    name: "",
    description: "Made with create-rnw-library",
    author: config.get("author"),
    repo: (info: any) => `${info.author}/${info.name}`,
    license: config.get("license", "MIT"),
    manager: config.get("manager", "yarn"),
    template: config.get("template", "default"),
  };

  try {
    if (!config.get("author")) {
      const gitConfigPath = getGitConfigPath("global");

      if (gitConfigPath) {
        const gitConfig = parseGitConfig.sync({ path: gitConfigPath });

        const user = gitConfig.github?.user
          ? gitConfig.github.user
          : "";

        defaults.author = user;
      }

      if (defaults.author) {
        config.set("author", defaults.author);
      }
    }

    if (!config.get("manager")) {
      if (which.sync("yarn", { nothrow: true })) {
        defaults.manager = "yarn";
      }

      config.set("manager", defaults.manager);
    }

    if (!config.get("template")) {
      config.set("template", defaults.template);
    }
  } catch (err) {
    console.log(err);
  }

  return defaults;
};

export default defaultConfig;
