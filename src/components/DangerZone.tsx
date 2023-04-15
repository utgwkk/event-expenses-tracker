import React from "react";
import { Button } from "react-bootstrap";
import { useSetRecoilState } from "recoil";
import { expensesAtom } from "../recoil/expenses";
import { presetsAtom } from "../recoil/presets";

export const DangerZone: React.FC = () => {
  const setExpenses = useSetRecoilState(expensesAtom);
  const setPresets = useSetRecoilState(presetsAtom);

  return (
    <>
      <h2>スーパー危険ゾーン</h2>
      <Button
        type="button"
        variant="danger"
        className="me-1"
        onClick={() => {
          if (window.confirm("全部の支出記録を消しますか？")) {
            if (window.confirm("本当に全部の支出記録を消してよいですか？？")) {
              setExpenses([]);
            }
          }
        }}
      >
        支出記録を全部消す
      </Button>
      <Button
        type="button"
        variant="outline-danger"
        className="me-1"
        onClick={() => {
          if (window.confirm("全部のプリセットを消しますか？")) {
            setPresets([]);
          }
        }}
      >
        プリセットを全部消す
      </Button>
    </>
  );
};
