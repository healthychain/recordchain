import React from "react";
import renderer from "react-test-renderer";
import Doctor from "./Doctor";

describe("Doctor", () => {
  it("should render correctly with mocked records", () => {
    const tree = renderer
      .create(
        <Doctor
          loggedIn
          notifications={[]}
          credDef={[]}
          fetchCredDef={() => console.log("")}
          fetchNotifications={() => []}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
