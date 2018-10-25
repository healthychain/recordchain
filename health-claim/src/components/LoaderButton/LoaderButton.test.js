import React from "react";
import renderer from "react-test-renderer";
import LoaderButton from "./LoaderButton";

describe("LoaderButton", () => {
  it("should render correctly", () => {
    const tree = renderer.create(<LoaderButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render with disabled set to true", () => {
    const tree = renderer.create(<LoaderButton disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render with loading text if isLoading", () => {
    const tree = renderer
      .create(<LoaderButton loadingText="LOADING" isLoading />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render with normal text when not loading", () => {
    const tree = renderer.create(<LoaderButton loadingText="LOADING" />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
