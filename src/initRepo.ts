module.exports.initGitRepo = async (opts) => {
  const { dest } = opts;

  const gitIgnorePath = path.join(dest, ".gitignore");
  fs.writeFileSync(
    gitIgnorePath,
    `
# See https://help.github.com/ignore-files/ for more about ignoring files.

# dependencies
node_modules

# builds
build
dist
.rpt2_cache

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
`,
    "utf8"
  );

  const commands = [
    {
      cmd: "git",
      args: ["init"],
      cwd: dest,
    },
    {
      cmd: "git",
      args: ["add", "."],
      cwd: dest,
    },
    {
      cmd: "git",
      args: ["commit", "-m", `init ${pkg.name}@${pkg.version}`],
      cwd: dest,
    },
  ];

  return pEachSeries(commands, async ({ cmd, args, cwd }) => {
    return execa(cmd, args, { cwd });
  });
};
