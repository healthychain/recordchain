import React from "react";
import renderer from "react-test-renderer";
import Doctor from "./Doctor";

describe("Doctor", () => {
  it("should render correctly", () => {
    const tree = renderer
      .create(
        <Doctor loggedIn notifications={[]} fetchNotifications={() => []} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
