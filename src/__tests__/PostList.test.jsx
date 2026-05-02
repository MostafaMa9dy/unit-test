import { render, screen, act } from "@testing-library/react";
import PostList from "../PostList";

const mockFetch = (data) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  });
};

afterEach(() => jest.restoreAllMocks());

test("shows loading state", () => {
  global.fetch = jest.fn().mockReturnValue(new Promise(() => {}));
  render(<PostList />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("shows posts after data loads", async () => {
  mockFetch([
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" },
  ]);
  await act(async () => render(<PostList />));
  expect(screen.getByText("First Post")).toBeInTheDocument();
  expect(screen.getByText("Second Post")).toBeInTheDocument();
});

test("shows empty message when no posts", async () => {
  mockFetch([]);
  await act(async () => render(<PostList />));
  expect(screen.getByText("No posts found.")).toBeInTheDocument();
});

test("shows error when fetch fails", async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
  await act(async () => render(<PostList />));
  expect(screen.getByText("Error: Network error")).toBeInTheDocument();
});
