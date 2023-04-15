import React from "react";
import { Button } from "react-bootstrap";
import { exportAsCSV } from "../csvExport";
import { useRecoilValue } from "recoil";
import { expensesAtom } from "../recoil/expenses";

export const CSVExport: React.FC = () => {
  const expenses = useRecoilValue(expensesAtom);

  return (
    <Button type="button" onClick={() => exportAsCSV(expenses)}>
      CSVとしてエクスポート
    </Button>
  );
};
