import AppFunctional from "./AppFunctional";
import React from "react";
import {
  fireEvent,
  getByRole,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

// Write your tests here
test("render ediliyor", () => {
  render(<AppFunctional />);
});

beforeEach(() => {
  render(<AppFunctional />);
});

test("Başlangıc değerleri standart mı?", () => {
  const crdt = screen.getByTestId("crdt");

  expect(crdt).toHaveTextContent("Koordinatlar (2, 2)");

  const stepVal = screen.getByTestId("stp");
  expect(stepVal).toHaveTextContent("0 kere ilerlediniz");

  const email = document.querySelector("#email");

  expect(email.value).toBe("");
});

test("Başlıklardaki, butonlardaki, bağlantılardaki görünür metinlerin ekranda göründüğünü test edin.", () => {
  const left = screen.getByTestId("left");
  expect(left).toHaveTextContent("SOL");
  const up = screen.getByTestId("up");
  expect(up).toHaveTextContent("YUKARI");
  const right = screen.getByTestId("right");
  expect(right).toHaveTextContent("SAĞ");
  const down = screen.getByTestId("down");
  expect(down).toHaveTextContent("AŞAĞI");
  const reset = screen.getByTestId("reset");
  expect(reset).toHaveTextContent("reset");
});

test("Inputa metin girildiğinde value değişimini test eden bir test yazın.", async () => {
  const email = screen.getByTestId("email");

  userEvent.type(email, "abc@abc.com");

  await waitFor(() => {
    expect(email.value).toBe("abc@abc.com");
  });

  //userEvent asenkron bir işlem olduğu için async fonksiyonunu ve await waitFor methodunu kullandık
});
