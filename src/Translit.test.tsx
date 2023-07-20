import { transliterate } from "./Translit";

describe("transliterate function", () => {
  it("should handle empty input", () => {
    const input = "";
    const expected = "";
    const output = transliterate(input);
    expect(output).toEqual(expected);
  });

  it("should leave untransliteratable characters unchanged", () => {
    const input = ",.-@!? ()#$1234567890";
    const expected = ",.-@!? ()#$1234567890";
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
    const input_keys = "Privet, kak dela?".split("");
    const expected = "Привет, как дела?";
    let buffer = "";
    for (let i = 0; i < input_keys.length; i++) {
      buffer = transliterate(buffer);
      buffer += input_keys[i];
    }
    expect(buffer).toEqual(expected);
  });

  it("should correcly transliterate key combinations in sequentially extended text", () => {
    const input_keys = "U kazhdogo pravila est' iskljuchenie.".split("");
    const expected = "У каждого правила есть исключение.";
    let buffer = "";
    for (let i = 0; i < input_keys.length; i++) {
      buffer = transliterate(buffer);
      buffer += input_keys[i];
    }
    expect(buffer).toEqual(expected);
  });

  it("should leave text unchanged if it's not immediately surrounding the cursor", () => {
    const input = "Shto russkomu horosho, to nemcu - smert'";
    // typing only this word     ^^^^^^^
    const start = 14;
    const end = 21;
    expect(input.substring(start, end)).toEqual("horosho");

    let buffer = input;
    for (let cursorPos = start; cursorPos < end; cursorPos++) {
      buffer = transliterate(buffer, cursorPos);
    }

    const expected = "Shto russkomу хорошо, to nemcu - smert'";
    expect(buffer).toEqual(expected);
  });
});
