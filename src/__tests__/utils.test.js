import {
  add,
  isPrime,
  reverseString,
  getCharactersCount,
  formatDate,
  validatePassword,
  maskCardNumber,
  range,
  groupBy,
  deepEqual,
} from "../utils";

describe("add", () => {
  test("adds two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("adds negative numbers", () => {
    expect(add(-1, -2)).toBe(-3);
  });

  test("adds zero", () => {
    expect(add(5, 0)).toBe(5);
  });
});

describe("isPrime", () => {
  test("returns true for prime numbers", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(13)).toBe(true);
  });

  test("returns false for non-prime numbers", () => {
    expect(isPrime(1)).toBe(false);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(9)).toBe(false);
  });

  test("returns false for 0 and negative numbers", () => {
    expect(isPrime(0)).toBe(false);
    expect(isPrime(-5)).toBe(false);
  });
});

describe("reverseString", () => {
  test("reverses a normal string", () => {
    expect(reverseString("hello")).toBe("olleh");
  });

  test("reverses a single character", () => {
    expect(reverseString("a")).toBe("a");
  });

  test("reverses an empty string", () => {
    expect(reverseString("")).toBe("");
  });
});

describe("getCharactersCount", () => {
  test("counts characters correctly", () => {
    expect(getCharactersCount("hello")).toEqual({ h: 1, e: 1, l: 2, o: 1 });
  });

  test("returns empty object for empty string", () => {
    expect(getCharactersCount("")).toEqual({});
  });

  test("counts repeated characters", () => {
    expect(getCharactersCount("aaa")).toEqual({ a: 3 });
  });
});

describe("formatDate", () => {
  test("formats date as YYYY-MM-DD", () => {
    const date = new Date(2024, 0, 5);
    expect(formatDate(date)).toBe("2024-01-05");
  });

  test("pads month and day with zeros", () => {
    const date = new Date(2024, 8, 9);
    expect(formatDate(date)).toBe("2024-09-09");
  });
});

describe("validatePassword", () => {
  test("returns true for a valid password", () => {
    expect(validatePassword("Hello1@aa")).toBe(true);
  });

  test("returns false if less than 8 characters", () => {
    expect(validatePassword("Hi1@")).toBe(false);
  });

  test("returns false if no uppercase letter", () => {
    expect(validatePassword("hello1@bb")).toBe(false);
  });

  test("returns false if no number", () => {
    expect(validatePassword("Hello@sasa")).toBe(false);
  });

  test("returns false if no special character", () => {
    expect(validatePassword("Hello1sasa")).toBe(false);
  });
});

describe("maskCardNumber", () => {
  test("masks all digits except last 4", () => {
    expect(maskCardNumber("1234567890123456")).toBe("************3456");
  });

  test("works with short card numbers", () => {
    expect(maskCardNumber("12345678")).toBe("****5678");
  });
});

describe("range", () => {
  test("generates range with default step", () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
  });

  test("generates range with custom step", () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
  });

  test("returns empty array when start equals end", () => {
    expect(range(5, 5)).toEqual([]);
  });

  test("generates range starting from non-zero", () => {
    expect(range(3, 7)).toEqual([3, 4, 5, 6]);
  });
});

describe("groupBy", () => {
  const people = [
    { name: "Mostafa", role: "admin" },
    { name: "Magdy", role: "user" },
    { name: "Lotfy", role: "admin" },
  ];

  test("groups array by key", () => {
    const result = groupBy(people, "role");
    expect(result["admin"]).toHaveLength(2);
    expect(result["user"]).toHaveLength(1);
  });

  test("returns empty object for empty array", () => {
    expect(groupBy([], "role")).toEqual({});
  });
});

describe("deepEqual", () => {
  test("returns true for equal primitives", () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual("a", "a")).toBe(true);
  });

  test("returns false for different primitives", () => {
    expect(deepEqual(1, 2)).toBe(false);
  });

  test("returns true for equal objects", () => {
    expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
  });

  test("returns false for different objects", () => {
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  test("returns false for objects with different keys", () => {
    expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
  });

  test("returns true for equal nested arrays", () => {
    expect(deepEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
  });
});
