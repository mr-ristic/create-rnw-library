import rmfr from "rmfr";
import mkdirp from "make-dir";
import fs from "fs";
import initGitRepo from "./initGitRepo";
import { fileExists } from "./utilities";

describe("Init repo test", () => {
  xit("should init git in the destination provided", async () => {
    jest.setTimeout(30000);
    await mkdirp("git-test");
    fs.writeFileSync("git-test/index.js", `console.log('hello world')`);

    await initGitRepo({
      destination: "git-test",
    });

    const initietedRepo = await fileExists("git-test/.git/COMMIT_EDITMSG");

    expect(initietedRepo).toBe(true);
    await rmfr("git-test");
  }, 30000);
});
