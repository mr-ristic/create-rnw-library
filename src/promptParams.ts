import inquirer from "inquirer";
import validateNpmName from "validate-npm-package-name";

import config from "./config";

const promptParams = async (options: any) => {
  if (options.name && !validateNpmName(options.name).validForNewPackages) {
    throw new Error(`invalid package name "${options.name}"`);
  }

  if (options.skipPrompts) {
    if (!options.name) {
      throw new Error(
        "invalid input; you must pass a package name with --skip-prompts"
      );
    }

    Object.keys(options).forEach((key) => {
      const value = options[key];
      if (typeof value === "function") {
        options[key] = value(options);
      }
    });

    return options;
  }

  const info = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Package Name",
      validate: (name: any) => {
        return name && validateNpmName(name).validForNewPackages;
      },
      default: options.name,
    },
    {
      type: "input",
      name: "description",
      message: "Package Description",
      default: options.description,
    },
    {
      type: "input",
      name: "author",
      message: "Author's GitHub Handle",
      default: options.author,
    },
    {
      type: "input",
      name: "repo",
      message: "GitHub Repo Path",
      default: options.repo,
    },
    {
      type: "input",
      name: "license",
      message: "License",
      default: options.license,
    },
    {
      type: "list",
      name: "manager",
      message: "Package Manager",
      choices: ["npm", "yarn"],
      default: options.manager,
    },
    {
      type: "list",
      name: "template",
      message: "Template",
      choices: ["default", "ts-web-microbundle"],
      default: options.template,
    },
  ]);

  config.set("author", info.author);
  config.set("license", info.license);
  config.set("manager", info.manager);
  config.set("template", 'ts-web-microbundle');

  return {
    ...info,
    git: options.git,
  };
};

export default promptParams;
