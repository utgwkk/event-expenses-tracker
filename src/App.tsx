import React, { useState } from "react";
import { useCallback } from "react";
import { useStateWithLocalStorage } from "./hooks/useStateWithLocalStorage";

type Expense = {
  price: number;
  label: string;
};

function App() {
  const [expenses, setExpenses] = useStateWithLocalStorage<Expense[]>(
    [],
    "expenses"
  );
  const addExpense = useCallback(
    (exp: Expense) => {
      setExpenses((curr) => [exp, ...curr]);
    },
    [setExpenses]
  );
  const deleteExpense = useCallback(
    (index: number) => {
      setExpenses((curr) => [
        ...curr.slice(0, index),
        ...curr.slice(index + 1, curr.length),
      ]);
    },
    [setExpenses]
  );

  const [price, setPrice] = useState(0);

  return (
    <div className="App">
      <h1>支出記録</h1>
      <ul>
        <li>
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <button
            type="button"
            onClick={() => addExpense({ price, label: "" })}
          >
            追加
          </button>
        </li>
        {expenses.map((exp, i) => (
          <li key={i}>
            <button type="button" onClick={() => deleteExpense(i)}>
              x
            </button>
            {exp.price} {exp.label !== "" && <>({exp.label})</>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
