import React from "react";
import renderer from "react-test-renderer";
import RecordCard from "./RecordCard.js";

describe("RecordCard", () => {
  it("should render correctly", () => {
    const tree = renderer
      .create(
        <RecordCard
          record={{ title: "sample", description: "test" }}
          onClick={() => console.log("")}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render without onClick prop", () => {
    const tree = renderer
      .create(<RecordCard record={{ title: "sample", description: "test" }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
