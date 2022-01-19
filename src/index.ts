#!/usr/bin/env node
// @ts-nocheck
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { program } from "commander";
import packageInfo from "../package.json";
import defaultConfig from "./defaultConfig";
import createLibrary from "./createLibrary";

const cli = async () => {
  clear();
  console.log(
    chalk.red(
      figlet.textSync("create-rnw-library", { horizontalLayout: "full" })
    )
  );

  const defaults = await defaultConfig();

  program
    .name(packageInfo.name)
    .version(packageInfo.version)
    .usage("[options] [package-name]")
    .description("Create React Web & React Native compatible library")
    .option("-d, --desc <string>", "package description")
    .option("-a, --author <string>", "author's github handle", defaults.author)
    .option("-l, --license <string>", "package license", defaults.license)
    .option("-r, --repo <string>", "package repo path")
    .option("-g, --no-git", "generate without git init")
    .option(
      "-m, --manager <npm|yarn>",
      "package manager to use",
      defaults.manager
    )
    .option(
      "-s, --skip-prompts",
      "skip all prompts (must provide package-name via cli)"
    )
    .parse(process.argv);

  const options = {
    name: program.name,
    description: program.desc,
    author: program.author,
    license: program.license,
    repo: program.repo,
    manager: program.manager,
    template: program.template,
    templatePath: program.templatePath,
    skipPrompts: program.skipPrompts,
    git: program.git,
  };

  Object.keys(options).forEach((key) => {
    if (!options[key] && defaults[key]) {
      options[key] = defaults[key];
    }
  });

  if (program.args.length === 1) {
    options.name = program.args[0];
  } else if (program.args.length > 1) {
    console.error("invalid arguments");
    program.help();
    process.exit(1);
  }
};

cli();
