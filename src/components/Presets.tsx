import React, { useCallback, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useRecoilState, useSetRecoilState } from "recoil";
import { presetsAtom } from "../recoil/presets";
import { Expense, Preset } from "../types";
import { expensesAtom } from "../recoil/expenses";

export const Presets: React.FC = () => {
  const [presets, setPresets] = useRecoilState(presetsAtom);
  const setExpenses = useSetRecoilState(expensesAtom);
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
  const addExpense = useCallback(
    (exp: Expense) => {
      setExpenses((curr) => [exp, ...curr]);
    },
    [setExpenses]
  );

  return (
    <>
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
              className="mb-2"
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
    </>
  );
};
