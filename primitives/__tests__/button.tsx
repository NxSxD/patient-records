import React from "react";
import { render } from "@testing-library/react";
import { Button } from "../button";

describe("Button", () => {
  it("should render according to snapshot", () => {
    const { container } = render(<Button>Some Text</Button>);
    expect(container).toMatchSnapshot();
  });
});
