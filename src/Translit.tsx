const transliterationMap: { [key: string]: string } = {
  a: "а",
  b: "б",
  v: "в",
  w: "в",
  g: "г",
  d: "д",
  e: "е",
  ыo: "ё", // yo
  йo: "ё", // jo
  зh: "ж", // zh
  z: "з",
  i: "и",
  j: "й",
  k: "к",
  l: "л",
  m: "м",
  n: "н",
  o: "о",
  p: "п",
  r: "р",
  s: "с",
  t: "т",
  u: "у",
  f: "ф",
  h: "х",
  c: "ц",
  тz: "ц", // tz
  цh: "ч", // ch
  сh: "ш", // sh
  шh: "щ", // ssh
  '"': "ъ",
  y: "ы",
  "'": "ь",
  ä: "э",
  ыu: "ю", // yu
  йu: "ю", // ju
  ыa: "я", // ya
  йa: "я", // ja
};

const isUpperCase = (s: string): boolean => {
  // there are different cases for s and it is currently in upper case
  return s.toUpperCase() !== s.toLowerCase() && s === s.toUpperCase();
};

const getTranslitRange = (
  length: number,
  cursorPos?: number,
): [number, number] => {
  if (typeof cursorPos !== "undefined") {
    // start up to two chars left of the cursor
    let start =
      cursorPos - 2 >= 0
        ? cursorPos - 2
        : cursorPos - 1 >= 0
        ? cursorPos - 1
        : 0;
    // end up to one char right of the cursor
    let end = cursorPos + 1 > length ? length : cursorPos + 1;

    return [start, end];
  } else {
    // transliterate whole input if no cursorPos is passed
    return [0, length];
  }
};

// transliterates the input string
// optionally only transliterates a substring of `input` when `cursorPos`
// is specified
export function transliterate(input: string, cursorPos?: number): string {
  let transliteratedText = "";

  // get the limits of the substring that is to be transliterated
  let range = getTranslitRange(input.length, cursorPos);

  // parts of the intput string that will remain unchanged
  let prefix = input.substring(0, range[0]);
  let suffix = input.substring(range[1], input.length);

  for (let i = range[0]; i < range[1]; i++) {
    // save case information here instead of having a
    // transliteration map of twice the size or doing
    // arithmetic unicode shenanigans
    const upperCase = isUpperCase(input[i]);

    const currentChar = input[i].toLowerCase();
    const nextChar = input[i + 1]?.toLowerCase();
    const combination = currentChar + nextChar;

    let replacement;

    // first check if current and next char can be replaced
    if (combination in transliterationMap) {
      replacement = transliterationMap[combination];
      // increment index because we replace two characters
      i++;
      // then check if current char can be replaced
    } else if (currentChar in transliterationMap) {
      replacement = transliterationMap[currentChar];

      // or leave char unchanged
    } else {
      replacement = input[i];
    }
    // restore upper case
    if (upperCase) {
      replacement = replacement.toUpperCase();
    }

    transliteratedText += replacement;
  }

  return prefix + transliteratedText + suffix;
}
