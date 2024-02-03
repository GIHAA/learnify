import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Landing from "../components/Landing";

test("should render landing component", () => {
  render(<Landing />);
  const homeElement = screen.getByTestId("landing");
  expect(homeElement).toBeInTheDocument();
});
