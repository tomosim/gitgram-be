const { expect } = require("chai");
const { formatRepositoryData } = require("../db/utils/utils");

describe("formatRepositoryData", () => {
  it("will return an empty array when given an empty array", () => {
    expect(formatRepositoryData([])).to.deep.equal([]);
  });
  it("will change the key 'name' to 'title' for one repo", () => {
    expect(formatRepositoryData([{ name: "hello-world" }])).to.deep.equal([
      { title: "hello-world" }
    ]);
  });
  it("will retain all other keys except 'languages'", () => {
    expect(
      formatRepositoryData([
        {
          name: "hello-world",
          description: "cool repo",
          languages: ["JavaScript"]
        }
      ])
    ).to.deep.equal([{ title: "hello-world", description: "cool repo" }]);
  });
  it("works for multiple repos", () => {
    const input = [
      {
        name: "hello-world",
        description: "cool repo",
        languages: ["Java"]
      },
      { name: "my-first-repo", description: "no. 1!", languages: ["Python"] }
    ];
    const expected = [
      { title: "hello-world", description: "cool repo" },
      { title: "my-first-repo", description: "no. 1!" }
    ];
    expect(formatRepositoryData(input)).to.deep.equal(expected);
  });
});
