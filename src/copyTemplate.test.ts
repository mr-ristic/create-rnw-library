import copyTemplate from "./copyTemplate";
import fs from 'fs'


const fileExists = (file : string) => {
  return new Promise((resolve) => {
      fs.access(file, fs.constants.F_OK, (err) => {
          err ? resolve(false) : resolve(true)
      });
  })
}

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
  it("should copy example eslintrc file from template to destination", async () => {
    const fileName = await copyTemplate({
      file: `${process.cwd()}/templates/default/.eslintrc`,
      source: `${process.cwd()}/templates/default`,
      destination: `${process.cwd()}/my-test-library`,
      info,
    });

    const doesExists = await fileExists(`${process.cwd()}/${fileName}`)

    expect(doesExists).toBe(true)

  });
});
