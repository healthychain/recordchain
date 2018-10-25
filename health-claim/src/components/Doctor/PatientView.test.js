import React from "react";
import renderer from "react-test-renderer";
import PatientView from "./PatientView";

describe("PatientView", () => {
  it("should render given name and ID", () => {
    const patient = renderer.create(
      <PatientView patient={{ name: "Name", id: 10 }} />
    );
    expect(patient).toMatchSnapshot();
  });
});
