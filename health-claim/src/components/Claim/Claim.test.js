import React from "react";
import renderer from "react-test-renderer";
import Claim from "./Claim.js";

describe("Claim", () => {
  it("should render correctly with mocked records", () => {
    const tree = renderer.create(<Claim />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
