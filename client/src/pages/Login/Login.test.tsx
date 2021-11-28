import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

test("should render Login page", () => {
  render(<Login />);
  const loginElement = screen.getByText(/Login/i);
  expect(loginElement).toBeInTheDocument();
});
