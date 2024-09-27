import * as React from "react";
import {render} from "@testing-library/react";

import {Toast} from "../src";

describe("Toast", () => {
  it("should render correctly", () => {
    const wrapper = render(<Toast />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Toast ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
