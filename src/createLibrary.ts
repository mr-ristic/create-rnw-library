import globby from "globby";
import mkdirp from "make-dir";
import path from "path";
import ora from "ora";
import pEachSeries from "p-each-series";
import { LibaryProps } from "./types";
import copyTemplateFile from "./copyTemplateFile";
import installDependencies from "./installDependencies";
import initGitRepo from "./initGitRepo";

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

    const directories = ["", "example"];

    for (let i = 0; i < directories.length; i++) {
      let installingDirectory = installDependencies({
        destination: `${destinationPath}/${directories[i]}`,
        info,
      });
      ora.promise(
        installingDirectory,
        `Running ${manager} install in ${directories[i]} directory`.replace(
          "  ",
          " root "
        )
      );
      await installingDirectory;
    }
  }

  if (git) {
    const promise = initGitRepo({ destination: destinationPath });
    ora.promise(promise, "Initializing git repo");
    await promise;
  }

  return destinationPath;
};

export default createLibrary;
