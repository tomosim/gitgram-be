const { expect } = require("chai");
const {
  formatRepositoryData,
  createLookupTable,
  createJunctionTable
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
  it("works for different keys and values", () => {
    const inputRows = [
      {
        repository_id: 1,
        title: "hello-world",
        owner: "jessjelly",
        description: "my first repo"
      },
      {
        repository_id: 2,
        title: "watson-image-analyser",
        owner: "jessjelly",
        description:
          "express server that uses IBM's watson to tell you what's in an image"
      }
    ];
    const expected = { "hello-world": 1, "watson-image-analyser": 2 };
    expect(
      createLookupTable(inputRows, "title", "repository_id")
    ).to.deep.equal(expected);
  });
});

describe("createJunctionTable", () => {
  it("returns an empty array when passed an empty array", () => {
    expect(createJunctionTable([])).to.deep.equal([]);
  });
  it("will create one pair of ids when given a dataset containing one repo that uses one language", () => {
    let repoLookup = { "hello-world": 1 };
    let langLookup = { Node: 1 };
    let repositories = [
      {
        name: "hello-world",
        owner: "jessjelly",
        description: "my first repo",
        languages: ["Node"]
      }
    ];
    let expected = [{ repository_id: 1, language_id: 1 }];
    let actual = createJunctionTable(repositories, repoLookup, langLookup);
    expect(actual).to.deep.equal(expected);
    repoLookup = { "watson-image-analyser": 2 };
    langLookup = { C: 2 };
    repositories = [
      {
        name: "watson-image-analyser",
        owner: "jessjelly",
        description: "my first repo",
        languages: ["C"]
      }
    ];
    expected = [{ repository_id: 2, language_id: 2 }];
    actual = createJunctionTable(repositories, repoLookup, langLookup);
    expect(actual).to.deep.equal(expected);
  });
  it("will create multiple pairs between a repo and several languages when the dataset contains one repo that uses multiple languages", () => {
    const repoLookup = { "hello-world": 1 };
    const langLookup = { Node: 1, HTML: 2 };
    const repositories = [
      {
        name: "hello-world",
        owner: "jessjelly",
        description: "my first repo",
        languages: ["Node", "HTML"]
      }
    ];
    const expected = [
      { repository_id: 1, language_id: 1 },
      { repository_id: 1, language_id: 2 }
    ];
    const actual = createJunctionTable(repositories, repoLookup, langLookup);
    expect(actual).to.deep.equal(expected);
  });
  it("will create pairs for every combination of repo and language in the dataset", () => {
    const repoLookup = { "hello-world": 1, "watson-image-analyser": 2 };
    const langLookup = { Node: 1, HTML: 2, C: 3 };
    const repositories = [
      {
        name: "hello-world",
        owner: "jessjelly",
        description: "my first repo",
        languages: ["Node", "HTML"]
      },
      {
        name: "watson-image-analyser",
        owner: "jessjelly",
        description: "my first repo",
        languages: ["C"]
      }
    ];
    const expected = [
      { repository_id: 1, language_id: 1 },
      { repository_id: 1, language_id: 2 },
      { repository_id: 2, language_id: 3 }
    ];
    const actual = createJunctionTable(repositories, repoLookup, langLookup);
    expect(actual).to.deep.equal(expected);
  });
});
