import execa from "execa";
import pEachSeries from "p-each-series";

const installDependencies = async (options: any) => {
  const { destination, info } = options;

  const commands = [
    {
      cmd: info.manager,
      args: ["install"],
      cwd: destination,
    },
  ];

  return pEachSeries(commands, async ({ cmd, args, cwd }) => {
    return execa(cmd, args, { cwd });
  });
};

export default installDependencies;
