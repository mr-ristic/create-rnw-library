import pEachSeries from "p-each-series";
import execa from "execa";
import packageInfo from "../package.json";
import { initGitOptions } from "./types";

const initGitRepo = async (options: initGitOptions) => {
  const { destination } = options;

  const commands = [
    {
      cmd: "git",
      args: ["init"],
      cwd: destination,
    },
    {
      cmd: "git",
      args: ["add", "."],
      cwd: destination,
    },
    {
      cmd: "git",
      args: ["commit", "-m", `init ${packageInfo.name}@${packageInfo.version}`],
      cwd: destination,
    },
  ];

  return pEachSeries(commands, async ({ cmd, args, cwd }) => {
    return execa(cmd, args, { cwd });
  });
};

export default initGitRepo;
