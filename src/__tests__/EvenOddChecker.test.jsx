import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EvenOddChecker from "../EvenOddChecker";

test("shows nothing before clicking check", () => {
  render(<EvenOddChecker />);
  expect(screen.queryByText("Even number")).not.toBeInTheDocument();
  expect(screen.queryByText("Odd number")).not.toBeInTheDocument();
});

test("shows even for an even number", async () => {
  render(<EvenOddChecker />);
  await userEvent.type(screen.getByPlaceholderText("Enter a number"), "4");
  await userEvent.click(screen.getByText("Check"));
  expect(screen.getByText("Even number")).toBeInTheDocument();
});

test("shows odd for an odd number", async () => {
  render(<EvenOddChecker />);
  await userEvent.type(screen.getByPlaceholderText("Enter a number"), "7");
  await userEvent.click(screen.getByText("Check"));
  expect(screen.getByText("Odd number")).toBeInTheDocument();
});

test("shows error for invalid input", async () => {
  render(<EvenOddChecker />);
  await userEvent.type(screen.getByPlaceholderText("Enter a number"), "abc");
  await userEvent.click(screen.getByText("Check"));
  expect(screen.getByText("Please enter a valid number")).toBeInTheDocument();
});

test("shows error when input is empty", async () => {
  render(<EvenOddChecker />);
  await userEvent.click(screen.getByText("Check"));
  expect(screen.getByText("Please enter a valid number")).toBeInTheDocument();
});
