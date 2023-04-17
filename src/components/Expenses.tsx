import React, { useCallback, useState } from "react";
import dayjs from "dayjs";
import { ListGroup, Row, Col, Form, Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { expensesAtom } from "../recoil/expenses";
import { Expense } from "../types";
import { isReadonly } from "../readonly";

export const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useRecoilState(expensesAtom);
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

  return (
    <>
      <h2>支出記録</h2>
      <ListGroup className="mb-2">
        {!isReadonly() && (
          <ListGroup.Item>
            <AddExpenseInput
              onAddExpense={(price) =>
                addExpense({
                  price,
                  label: "",
                  createdAt: new Date().getTime(),
                })
              }
            />
          </ListGroup.Item>
        )}
        {expenses.map((exp, i) => (
          <ListGroup.Item key={i}>
            <Row>
              <Col xs="10">
                {exp.price.toLocaleString()}{" "}
                {exp.label !== "" && <>({exp.label})</>}(
                <time dateTime={dayjs(exp.createdAt).toISOString()}>
                  {dayjs(exp.createdAt).format("M/D HH:mm:ss")}
                </time>
                )
              </Col>
              {!isReadonly() && (
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
              )}
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

type AddExpenseInputProps = {
  onAddExpense: (price: number) => void;
};

const AddExpenseInput: React.FC<AddExpenseInputProps> = ({ onAddExpense }) => {
  const [price, setPrice] = useState(0);

  return (
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
            onAddExpense(price);
            setPrice(0);
          }}
        >
          追加
        </Button>
      </Col>
    </Row>
  );
};
