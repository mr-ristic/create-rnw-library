import rmrf from "rmfr";
import createLibrary from "./createLibrary";

const libOptions = {
  name: "my-test-library",
  author: "mr-ristic",
  description: "this is an auto-generated test module. please ignore.",
  repo: "mr-ristic/my-test-library",
  license: "MIT",
  manager: "yarn",
  template: "default",
  git: true,
};

describe("Create library test", () => {
  it("shoulld return proper destination path", async () => {
    jest.setTimeout(100000);
    const destination = await createLibrary(libOptions);
    expect(destination).toBe(`${process.cwd()}/${libOptions.name}`);
    await rmrf(destination);
  }, 100000);
});
