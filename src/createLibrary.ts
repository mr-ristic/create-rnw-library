import handlebars from "handlebars";
import execa from "execa";
import fs from "fs";
import globby from "globby";
import mkdirp from "make-dir";
import { oraPromise } from "ora";
import path from "path";
// import pEachSeries from "p-each-series";
import { Opts } from "./types";

import packageInfo from "../package.json";

const templateBlacklist = new Set([
  "example/public/favicon.ico",
  "example/public/.gitignore",
  ".git",
]);

const createLibrary = async (info: Opts) => {
  const { manager, template, name, templatePath, git } = info;

  const parts = name.split("/");
  info.shortName = parts[parts.length - 1];

  const destinationPath = path.join(process.cwd(), info.shortName);
  info.destinationPath = destinationPath;
  await mkdirp(destinationPath);

  const source = path.join(__dirname, "..", "template", template);

  const files = await globby(source.replace(/\\/g, "/"), {
    dot: true,
  });

  console.log({ files });

  {
    // const promise = pEachSeries(files, async (file) => {
    //   return module.exports.copyTemplateFile({
    //     file,
    //     source,
    //     dest,
    //     info,
    //   });
    // });
    // oraPromise(promise, `Copying ${template} template to ${dest}`);
    // console.log();
    // await promise;
  }

  // {
  //   console.log();
  //   console.log("Initializing npm dependencies. This will take a minute.");
  //   console.log();

  //   const rootP = module.exports.initPackageManagerRoot({ dest, info });
  //   ora.promise(rootP, `Running ${manager} install in root directory`);
  //   await rootP;

  //   const exampleP = module.exports.initPackageManagerExample({ dest, info });
  //   ora.promise(exampleP, `Running ${manager} install in example directory`);
  //   await exampleP;
  // }

  // if (git) {
  //   const promise = module.exports.initGitRepo({ dest });
  //   ora.promise(promise, "Initializing git repo");
  //   await promise;
  // }

  return destinationPath;
};

// module.exports.initPackageManagerRoot = async (opts) => {
//   const { dest, info } = opts;

//   const commands = [
//     {
//       cmd: info.manager,
//       args: ["install"],
//       cwd: dest,
//     },
//   ];

//   return pEachSeries(commands, async ({ cmd, args, cwd }) => {
//     return execa(cmd, args, { cwd });
//   });
// };

// module.exports.initPackageManagerExample = async (opts) => {
//   const { dest, info } = opts;
//   const example = path.join(dest, "example");

//   const commands = [
//     {
//       cmd: info.manager,
//       args: ["install"],
//       cwd: example,
//     },
//   ];

//   return pEachSeries(commands, async ({ cmd, args, cwd }) => {
//     return execa(cmd, args, { cwd });
//   });
// };

export default createLibrary;
