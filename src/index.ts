#!/usr/bin/env node
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
// import path from 'path';
import { program } from "commander";
import packageInfo from "../package.json";

clear();
console.log(
  chalk.red(figlet.textSync("create-rnw-library", { horizontalLayout: "full" }))
);

program
  .version(packageInfo.version)
  .description("Create React Web & React Native compatible library")
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
