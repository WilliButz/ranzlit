const transliterationMap: { [key: string]: string } = {
  a:   "а",
  b:   "б",
  v:   "в",
  w:   "в",
  g:   "г",
  d:   "д",
  e:   "е",
  ыo:  "ё", // yo
  йo:  "ё", // jo
  зh:  "ж", // zh
  z:   "з",
  i:   "и",
  j:   "й",
  k:   "к",
  l:   "л",
  m:   "м",
  n:   "н",
  o:   "о",
  p:   "п",
  r:   "р",
  s:   "с",
  t:   "т",
  u:   "у",
  f:   "ф",
  h:   "х",
  c:   "ц",
  тz:  "ц", // tz
  цh:  "ч", // ch
  сh:  "ш", // sh
  шh:  "щ", // ssh
  '"': "ъ",
  y:   "ы",
  "'": "ь",
  ä:   "э",
  ыu:  "ю", // yu
  йu:  "ю", // ju
  ыa:  "я", // ya
  йa:  "я", // ja
};

const isUpperCase = (s: string): boolean => {
  // there are different cases for s and it is currently in upper case
  return s.toUpperCase() !== s.toLowerCase() && s === s.toUpperCase();
}

export function transliterate(input: string): string {
  let transliteratedText = '';

  for (let i = 0; i < input.length; i++) {
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

  return transliteratedText;
};
