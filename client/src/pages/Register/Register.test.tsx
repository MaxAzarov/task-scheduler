import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "./Register";

test("should render Register page", () => {
  render(<Register />);
  const loginElement = screen.getByText(/Login/i);
  expect(loginElement).toBeInTheDocument();
});
