import { Expense } from "./types";
import {
  encode as encodeMsgpack,
  decode as decodeMsgpack,
} from "@msgpack/msgpack";

export const makeShareUrl = (expenses: Expense[]) => {
  const flatten = expenses.flatMap((e) => [e.createdAt, e.price, e.label]);
  const encoded = encodeMsgpack(flatten);
  return `#${btoa(String.fromCharCode(...encoded))}`;
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
  const xs = parseMsgpackB64Url(hash);
  if (xs.length === 0) {
    // fallback
    return parseJsonB64Url(hash);
  } else {
    return xs;
  }
};

const parseMsgpackB64Url = (hash: string): Expense[] => {
  try {
    const b64decoded = atob(hash);
    const arr = Uint8Array.from(
      // @ts-expect-error ref: https://gist.github.com/borismus/1032746#gistcomment-1493026
      Array.prototype.map.call(b64decoded, (x) => x.charCodeAt(0))
    );
    const decoded = decodeMsgpack(arr);

    if (!(Array.isArray(decoded) && decoded.length % 3 === 0)) {
      return [];
    }

    const expenses: Expense[] = [];

    for (let i = 0; i < decoded.length; i += 3) {
      const createdAt = decoded[i],
        price = decoded[i + 1],
        label = decoded[i + 2];

      if (
        !(
          typeof createdAt === "number" &&
          typeof price === "number" &&
          typeof label === "string"
        )
      ) {
        return [];
      }

      expenses.push({ price, label, createdAt });
    }

    return expenses;
  } catch (ex: unknown) {
    console.error(ex);
    return [];
  }
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
