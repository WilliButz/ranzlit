import { transliterate } from "./Translit"

describe("transliterate function", () => {
  it("should handle empty input", () => {
    const input = "";
    const expected = "";
    const output = transliterate(input);
    expect(output).toEqual(expected);
  });

  it("should leave untransliteratable characters unchanged", () => {
    const input = ',.-@!? ()#$1234567890';
    const expected = ',.-@!? ()#$1234567890';
    const output = transliterate(input);
    expect(output).toEqual(expected);
  });

  it("should preserve upper and lower case", () => {
    const input = "TEST test";
    const expected = "ТЕСТ тест";
    const output = transliterate(input);
    expect(output).toEqual(expected);
  });

  it("should correcly transliterate sequentially extended text", () => {
    const input_keys = [
      "P","r","i","v","e","t",
      ","," ",
      "k","a","k",
      " ",
      "d","e","l","a","?"
    ];
    const expected = "Привет, как дела?"
    let buffer = "";
    for (let i = 0; i < input_keys.length; i++ ) {
      buffer = transliterate(buffer);
      buffer += input_keys[i];
    }
    expect(buffer).toEqual(expected);
  });

  it("should correcly transliterate key combinations in sequentially extended text", () => {
    const input_keys = [
     "U",
     " ",
     "k","a","z","h","d","o","g","o",
     " ",
     "p","r","a","v","i","l","a",
     " ",
     "e","s","t","'",
     " ",
     "i","s","k","l","j","u","c","h","e","n","i","e","."
    ];
    const expected = "У каждого правила есть исключение."
    let buffer = "";
    for (let i = 0; i < input_keys.length; i++ ) {
      buffer = transliterate(buffer);
      buffer += input_keys[i];
    }
    expect(buffer).toEqual(expected);
  });
});
