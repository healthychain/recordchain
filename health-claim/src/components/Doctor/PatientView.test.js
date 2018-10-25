import React from "react";
import renderer from "react-test-renderer";
import PatientView from "./PatientView";

describe("PatientView", () => {
  it("should render given name and ID", () => {
    const patient = renderer.create(
      <PatientView name="Name" id={10} fetchClaims={() => null} />
    );
    expect(patient).toMatchSnapshot();
  });
});
