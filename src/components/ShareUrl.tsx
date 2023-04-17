import React from "react";
import { Button } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { expensesAtom } from "../recoil/expenses";
import { makeShareUrl } from "../shareUrl";

export const ShareUrl: React.FC = () => {
  const expenses = useRecoilValue(expensesAtom);

  return (
    <Button
      type="button"
      onClick={() => {
        const url = new URL(location.href);
        url.hash = makeShareUrl(expenses);
        navigator.clipboard.writeText(url.toString());
      }}
    >
      URLをコピー
    </Button>
  );
};
