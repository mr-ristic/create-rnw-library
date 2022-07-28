import promptParams from "./promptParams";

describe("Prompt params test", () => {
  const options = {
    name: "testing-prompts",
    author: "mr-ristic",
    description: "this is a auto-generated test module. please ignore.",
    repo: "mr-ristic/testing-prompts",
    license: "MIT",
    manager: "npm",
    template: "ts-web-microbundle",
    git: true,
    skipPrompts: true,
  };

  it("should retun passed params with skippedPropts true", async () => {
    const result = await promptParams(options);
    Object.entries(options).forEach((option) => {
      expect(result[option[0]]).toBe(option[1]);
    });
  }, 30000);
});
