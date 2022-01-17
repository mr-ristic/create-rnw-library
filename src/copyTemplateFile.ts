import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import mkdirp from "make-dir";
import { templateOptions } from "./types";

const templateBlacklist = new Set([
  "example/public/favicon.ico",
  "example/public/.gitignore",
  ".git",
]);

const copyTemplateFile = async (options: templateOptions) => {
  const { file, source, destination, info } = options;

  const relativePath = path.relative(source, file).replace(/\\/g, "/");
  if (relativePath.startsWith(".git")) {
    return;
  }

  const destinationPath = path.join(destination, relativePath);
  const destinationDirectory = path.parse(destinationPath).dir;

  await mkdirp(destinationDirectory);

  if (templateBlacklist.has(relativePath)) {
    const content = fs.readFileSync(file);
    fs.writeFileSync(destinationPath, content);
  } else {
    const template = handlebars.compile(fs.readFileSync(file, "utf8"));
    const content = template({
      ...info,
      yarn: info.manager === "yarn",
    });

    fs.writeFileSync(destinationPath, content, "utf8");
  }

  return relativePath;
};

export default copyTemplateFile;
