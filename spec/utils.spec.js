const { expect } = require("chai");
const {
  formatRepositoryData,
  createLookupTable
} = require("../db/utils/utils");

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

describe("createLookupTable", () => {
  it("returns an empty object when given an empty array", () => {
    const inputRows = [];
    const expected = {};
    expect(createLookupTable(inputRows)).to.deep.equal(expected);
  });
  it("returns a lookup table of one key/value when given an array of length 1", () => {
    const inputRows = [{ name: "C", id: 1 }];
    const expected = { C: 1 };
    expect(createLookupTable(inputRows, "name", "id")).to.deep.equal(expected);
  });
  it("works for multiple rows", () => {
    const inputRows = [{ name: "C", id: 1 }, { name: "node", id: 2 }];
    const expected = { C: 1, node: 2 };
    expect(createLookupTable(inputRows, "name", "id")).to.deep.equal(expected);
  });
});
