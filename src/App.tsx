import React, { useState } from "react";
import { useCallback } from "react";
import { useStateWithLocalStorage } from "./hooks/useStateWithLocalStorage";
import dayjs from "dayjs";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";

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

const exportAsCSV = (expenses: Expense[]) => {
  const rows = [["日時", "値段", "備考"]];
  for (const expense of expenses) {
    const row = [
      dayjs(expense.createdAt).format("YYYY/MM/DD HH:mm:ss"),
      expense.price.toString(),
      expense.label,
    ];
    rows.push(row);
  }

  const csv = rows.map((r) => r.join(",")).join(`\n`);
  const downloadUrl = URL.createObjectURL(new Blob([csv]));
  const anchor = document.createElement("a");
  anchor.href = downloadUrl;
  anchor.download = `${dayjs().format("YYYYMMDDHHmmss")}.csv`;
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(downloadUrl);
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
      setPresets((curr) => {
        const newPresets = [...curr, p];
        newPresets.sort((a, b) => a.price - b.price);
        return newPresets;
      });
    },
    [setPresets]
  );
  const [newPresetPrice, setNewPresetPrice] = useState(0);

  const [price, setPrice] = useState(0);

  return (
    <div className="App">
      <h1>イベント支出記録君</h1>
      <h2>プリセット</h2>
      <Row className="mb-2">
        <Col xs="auto">
          <Form.Control
            type="text"
            inputMode="numeric"
            value={newPresetPrice}
            onChange={(e) => setNewPresetPrice(Number(e.target.value))}
          />
        </Col>
        <Col xs="auto">
          <Button
            type="button"
            disabled={newPresetPrice === 0}
            onClick={() => {
              addPreset({
                price: newPresetPrice,
                createdAt: new Date().getTime(),
              });
              setNewPresetPrice(0);
            }}
          >
            追加
          </Button>
        </Col>
      </Row>
      <Row>
        {presets.map((p, i) => (
          <Col key={i} xs="auto">
            <Button
              className="me-1 mb-2"
              size="lg"
              variant="secondary"
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
            </Button>
          </Col>
        ))}
      </Row>
      <h2>支出記録</h2>
      <ListGroup className="mb-2">
        <ListGroup.Item>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                inputMode="numeric"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Col>
            <Col xs="auto">
              <Button
                type="button"
                disabled={price === 0}
                onClick={() => {
                  addExpense({
                    price,
                    label: "",
                    createdAt: new Date().getTime(),
                  });
                  setPrice(0);
                }}
              >
                追加
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
        {expenses.map((exp, i) => (
          <ListGroup.Item key={i}>
            <Row>
              <Col xs="10">
                {exp.price} {exp.label !== "" && <>({exp.label})</>}(
                {dayjs(exp.createdAt).format("M/D HH:mm")})
              </Col>
              <Col xs="1">
                <Button
                  variant="close"
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        `${exp.price} (${dayjs(exp.createdAt).format(
                          "M/D HH:mm"
                        )} を消しますか？)`
                      )
                    ) {
                      deleteExpense(i);
                    }
                  }}
                ></Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button type="button" onClick={() => exportAsCSV(expenses)}>
        CSVとしてエクスポート
      </Button>
    </div>
  );
}

export default App;
