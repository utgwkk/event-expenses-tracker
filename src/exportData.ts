import dayjs from "dayjs";
import { Expense } from "./types";

const createRows = (expenses: Expense[]) => {
  const rows = [["日時", "値段", "備考"]];
  for (const expense of expenses) {
    const row = [
      dayjs(expense.createdAt).format("YYYY/MM/DD HH:mm:ss"),
      expense.price.toString(),
      expense.label,
    ];
    rows.push(row);
  }
  return rows;
};

export const exportAsCSV = (expenses: Expense[]) => {
  const rows = createRows(expenses);

  const csv = rows.map((r) => r.join(",")).join(`\n`);
  const downloadUrl = URL.createObjectURL(new Blob([csv]));
  const anchor = document.createElement("a");
  anchor.href = downloadUrl;
  anchor.download = `${dayjs().format("YYYYMMDDHHmmss")}.csv`;
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(downloadUrl);
};
