import { render, screen } from "@testing-library/react";
import { PayslipCard } from "./PayslipCard";

test("renders the PayslipCard component", async () => {
  render(
    <PayslipCard
      id="1"
      fromDate="2022-01-01"
      toDate="2022-01-31"
      fileUrl="https://example.com/payslip.pdf"
    />
  );
  expect(screen.getByRole("payslip-card")).toBeInTheDocument();
});

test("renders the payslip card image", async () => {
  render(
    <PayslipCard
      id="1"
      fromDate="2022-01-01"
      toDate="2022-01-31"
      fileUrl="https://example.com/payslip.pdf"
    />
  );
  expect(screen.getByRole("payslip-card-image")).toBeInTheDocument();
  expect(screen.getByRole("payslip-card-image")).toHaveAttribute(
    "src",
    "https://example.com/payslip.pdf"
  );
});

test("renders the payslip card header with the title 'Payslip'", async () => {
  render(
    <PayslipCard
      id="1"
      fromDate="2022-01-01"
      toDate="2022-01-31"
      fileUrl="https://example.com/payslip.pdf"
    />
  );
  expect(screen.getByRole("payslip-card-header")).toBeInTheDocument();
  expect(screen.getByRole("payslip-card-header")).toHaveTextContent("Payslip");
});

test("renders the payslip card dates with the provided fromDate and toDate", async () => {
  render(
    <PayslipCard
      id="1"
      fromDate="2022-01-01"
      toDate="2022-01-31"
      fileUrl="https://example.com/payslip.pdf"
    />
  );
  expect(screen.getByRole("payslip-card-dates")).toBeInTheDocument();
  expect(screen.getByRole("payslip-card-dates")).toHaveTextContent(
    "2022-01-01 to 2022-01-31"
  );
});
