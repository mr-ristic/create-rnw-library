import rmfr from "rmfr";
import installDependencies from "./installDependencies";
import copyTemplateFile from "./copyTemplateFile";
import { fileExists } from "./utilities";

describe("Install npm dependencies", () => {
  it("should install dependecies for destination provided", async () => {
    jest.setTimeout(100000);
    const info = {
      name: "my-dependencies",
      author: "mr-ristic",
      description: "this is an auto-generated test module. please ignore.",
      repo: "mr-ristic/my-test-library",
      license: "MIT",
      manager: "yarn",
      template: "default",
      git: true,
    };

    const fileName = await copyTemplateFile({
      file: `${process.cwd()}/package.json`,
      source: `${process.cwd()}`,
      destination: `${process.cwd()}/${info.name}`,
      info,
    });

    const fileCopied = await fileExists(`${process.cwd()}/${fileName}`);

    expect(fileCopied).toBe(true);

    await installDependencies({
      destination: `${process.cwd()}/${info.name}`,
      info,
    });

    const lockExists = await fileExists(
      `${process.cwd()}/${info.name}/${info.manager}.lock`
    );
    expect(lockExists).toBe(true);
    await rmfr(`${process.cwd()}/${info.name}`);
  }, 100000);
});
