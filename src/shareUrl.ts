import { Expense } from "./types";

export const makeShareUrl = (expenses: Expense[]) => {
  return `#${btoa(JSON.stringify(expenses))}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isExpense = (x: any): x is Expense => {
  return (
    "price" in x &&
    typeof x.price === "number" &&
    "label" in x &&
    typeof x.label === "string" &&
    "createdAt" in x &&
    typeof x.createdAt === "number"
  );
};

export const parseShareUrl = (hash: string): Expense[] => {
  return parseJsonB64Url(hash);
};

const parseJsonB64Url = (hash: string): Expense[] => {
  try {
    const b64decoded = atob(hash);
    const parsed = JSON.parse(b64decoded);

    if (!(Array.isArray(parsed) && parsed.every((x) => isExpense(x)))) {
      return [];
    }

    return parsed;
  } catch (ex: unknown) {
    return [];
  }
};
