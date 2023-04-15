import React, { useState } from "react";
import { useCallback } from "react";
import { useStateWithLocalStorage } from "./hooks/useStateWithLocalStorage";

type Expense = {
  price: number;
  label: string;
  // new Date().getTime()
  createdAt: number;
};

type Preset = {
  price: number;
  // new Date().getTime()
  createdAt: number;
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

  const [presets, setPresets] = useStateWithLocalStorage<Preset[]>(
    [],
    "presets"
  );
  const addPreset = useCallback(
    (p: Preset) => {
      setPresets((curr) => [...curr, p]);
    },
    [setPresets]
  );
  const [newPresetPrice, setNewPresetPrice] = useState(0);

  const [price, setPrice] = useState(0);

  return (
    <div className="App">
      <h2>プリセット</h2>
      <input
        type="number"
        min={0}
        value={newPresetPrice}
        onChange={(e) => setNewPresetPrice(Number(e.target.value))}
      />
      <button
        type="button"
        onClick={() =>
          addPreset({
            price: newPresetPrice,
            createdAt: new Date().getTime(),
          })
        }
      >
        追加
      </button>
      <div>
        {presets.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() =>
              addExpense({
                price: p.price,
                label: "",
                createdAt: new Date().getTime(),
              })
            }
          >
            {p.price}
          </button>
        ))}
      </div>
      <h2>支出記録</h2>
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
            onClick={() =>
              addExpense({ price, label: "", createdAt: new Date().getTime() })
            }
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
