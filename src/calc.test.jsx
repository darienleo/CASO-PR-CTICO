import { expect, test } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "./Calculator";

test("sumar 2 + 3 = 5", () => {
  render(<Calculator />);
  fireEvent.change(screen.getByTestId("input-a"), { target: { value: "2" } });
  fireEvent.change(screen.getByTestId("input-b"), { target: { value: "3" } });
  fireEvent.click(screen.getByTestId("calc-btn"));
  expect(screen.getByText(/Resultado:/)).toHaveTextContent("5");
});

test("bloquea división por cero", () => {
  render(<Calculator />);
  fireEvent.change(screen.getByTestId("input-a"), { target: { value: "10" } });
  fireEvent.change(screen.getByTestId("input-b"), { target: { value: "0" } });
  fireEvent.change(screen.getByTestId("op-select"), { target: { value: "div" } });
  fireEvent.click(screen.getByTestId("calc-btn"));
  expect(screen.getByText(/División por cero/)).toBeInTheDocument();
});
