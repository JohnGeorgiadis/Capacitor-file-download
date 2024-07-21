import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Feed from "./Feed";

test("renders the feed", async () => {
  const { baseElement } = render(<Feed />);
  expect(baseElement).toBeDefined();
});

test("renders the header of feed with the proper title", async () => {
  render(<Feed />);
  expect(screen.getByRole("header-title")).toHaveTextContent("Feed");
});

test("renders a card in the feed", async () => {
  render(<Feed />);
  expect(screen.getAllByRole("payslip-card")[0]).toBeDefined();
});
