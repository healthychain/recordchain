import React from "react";
// import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow"; // ES6
import App from "./App";
import store from "../../store";
describe("App", () => {
  const renderer = new ShallowRenderer();
  it("should render without crashing", () => {
    const tree = renderer.render(<App store={store} />);
    expect(tree).toMatchSnapshot();
  });
});
