import React from "react";
import { Button, Container } from "react-bootstrap";
import { useSetRecoilState } from "recoil";
import { expensesAtom } from "./recoil/expenses";
import { Presets } from "./components/Presets";
import { presetsAtom } from "./recoil/presets";
import { Expenses } from "./components/Expenses";
import { CSVExport } from "./components/CSVExport";

function App() {
  const setExpenses = useSetRecoilState(expensesAtom);
  const setPresets = useSetRecoilState(presetsAtom);

  return (
    <Container className="p-3">
      <h1>イベント支出記録君</h1>
      <Presets />
      <Expenses />
      <CSVExport />
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
        variant="danger"
        className="me-1"
        onClick={() => {
          if (window.confirm("全部のプリセットを消しますか？")) {
            setPresets([]);
          }
        }}
      >
        プリセットを全部消す
      </Button>
    </Container>
  );
}

export default App;
