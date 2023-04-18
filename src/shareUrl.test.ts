import { makeShareUrl, parseShareUrl } from "./shareUrl";

describe("shareUrl", () => {
  it("decode(encode(x)) = x", () => {
    const expenses = [
      { price: 100, label: "", createdAt: 1681602213424 },
      { price: 500, label: "", createdAt: 1681602213424 },
      { price: 500, label: "", createdAt: 1681602213424 },
      { price: 1000, label: "", createdAt: 1681602213424 },
      { price: 500, label: "", createdAt: 1681602213424 },
      { price: 500, label: "", createdAt: 1681602213424 },
      { price: 100, label: "", createdAt: 1681602213424 },
      { price: 100, label: "", createdAt: 1681602213424 },
      { price: 500, label: "", createdAt: 1681602213424 },
      { price: 500, label: "", createdAt: 1681602213424 },
    ];
    const url = makeShareUrl(expenses);
    const decoded = parseShareUrl(url.substring(1));
    expect(decoded).toStrictEqual(expenses);
  });
});
