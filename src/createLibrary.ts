// @ts-nocheck
import globby from "globby";
import mkdirp from "make-dir";
import path from "path";
import ora from "ora";
import pEachSeries from "p-each-series";
import { LibaryProps } from "./types";
import copyTemplateFile from "./copyTemplateFile";
import installDependencies from "./installDependencies";

import packageInfo from "../package.json";

const createLibrary = async (info: LibaryProps) => {
  const { manager, template, name, templatePath, git } = info;

  const parts = name.split("/");
  info.shortName = parts[parts.length - 1];

  const destinationPath = path.join(process.cwd(), info.shortName);
  info.destinationPath = destinationPath;
  await mkdirp(destinationPath);

  const source = path.join(__dirname, "..", "templates", template);

  const files = await globby(source.replace(/\\/g, "/"), {
    dot: true,
  });

  {
    const promise = pEachSeries(files, async (file) => {
      return copyTemplateFile({
        file,
        source,
        destination: destinationPath,
        info,
      });
    });
    ora.promise(promise, `Copying ${template} template to ${destinationPath}`);
    await promise;
  }

  {
    console.log("Initializing npm dependencies. This can take a while...");

    const rootDirectory = installDependencies({
      destination: destinationPath,
      info,
    });
    ora.promise(rootDirectory, `Running ${manager} install in root directory`);
    await rootDirectory;

    const exampleDirectory = installDependencies({
      destination: `${destinationPath}/example`,
      info,
    });
    ora.promise(
      exampleDirectory,
      `Running ${manager} install in example directory`
    );
    await exampleDirectory;

    // const exampleP = module.exports.initPackageManagerExample({ dest, info });
    // ora.promise(exampleP, `Running ${manager} install in example directory`);
    // await exampleP;
  }

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
