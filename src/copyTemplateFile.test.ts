import rmrf from "rmfr";
import { fileExists } from "./utilities";
import copyTemplateFile from "./copyTemplateFile";

const info = {
  name: "my-test-library",
  author: "mr-ristic",
  description: "this is an auto-generated test module. please ignore.",
  repo: "mr-ristic/my-test-library",
  license: "MIT",
  manager: "yarn",
  template: "default",
  git: true,
};

describe("Copy template test", () => {
  it("should copy example yarn.lock file from template to destination", async () => {
    const fileName = await copyTemplateFile({
      file: `${process.cwd()}/templates/default/yarn.lock`,
      source: `${process.cwd()}/templates/default`,
      destination: `${process.cwd()}/my-test-library`,
      info,
    });

    const doesExists = await fileExists(`${process.cwd()}/${fileName}`);

    expect(doesExists).toBe(true);
    await rmrf(`${process.cwd()}/my-test-library`);
  });

  it("should copy nested template component file to destination", async () => {
    const fileName = await copyTemplateFile({
      file: `${process.cwd()}/templates/default/src/components/buttons/Button/Button.tsx`,
      source: `${process.cwd()}/templates/default`,
      destination: `${process.cwd()}/my-test-library`,
      info,
    });

    const doesExists = await fileExists(
      `${process.cwd()}/my-test-library/${fileName}`
    );

    expect(doesExists).toBe(true);
    await rmrf(`${process.cwd()}/my-test-library`);
  });
});
