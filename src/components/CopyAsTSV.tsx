import React from "react";
import { Button } from "react-bootstrap";
import { copyAsTSV } from "../exportData";
import { useRecoilValue } from "recoil";
import { expensesAtom } from "../recoil/expenses";

export const CopyAsTSV: React.FC = () => {
  const expenses = useRecoilValue(expensesAtom);

  return (
    <Button type="button" onClick={() => copyAsTSV(expenses)}>
      TSVとしてコピー
    </Button>
  );
};
