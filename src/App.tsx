import { ChangeEvent, useRef, useState } from "react";
import { transliterate } from "./Translit";
import "./App.css";

const App = () => {
  const yandexPrefix =
    "https://translate.yandex.com/?source_lang=ru&target_lang=en&text=";
  const googlePrefix =
    "https://translate.google.com/?op=translate&sl=ru&tl=en&text=";
  const deeplPrefix = "https://www.deepl.com/translator#ru/en/";
  const initialUrlState = { yandexUrl: "", googleUrl: "", deeplUrl: "" };

  const [text, setText] = useState("");
  const [urls, setUrls] = useState(initialUrlState);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let cursorPos = inputRef.current?.selectionStart || 0;
    const inputLength = event.target.value.length;

    let transliteration = transliterate(event.target.value, cursorPos);
    setText(transliteration);

    // correct cursor position if multiple input characters were transliterated
    // to a single character, only relevant if text is inserted instead of appended
    if (transliteration.length < inputLength) {
      let newPos = cursorPos - (inputLength - transliteration.length);
      // should never be false but check anyway
      cursorPos = newPos >= 1 ? newPos : 1;
    }

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(cursorPos, cursorPos);
      }
    });

    if (transliteration !== "") {
      setUrls({
        yandexUrl: yandexPrefix + encodeURIComponent(transliteration),
        googleUrl: googlePrefix + encodeURIComponent(transliteration),
        deeplUrl: deeplPrefix + encodeURIComponent(transliteration),
      });
    } else {
      setUrls(initialUrlState);
    }
  };

  return (
    <div>
      <div>
        <textarea
          autoFocus
          lang="ru"
          rows={23}
          cols={55}
          onChange={handleChange}
          ref={inputRef}
          value={text}
        />
      </div>
      <div>
        <a target="_blank" rel="noopener noreferrer" href={urls.yandexUrl}>
          {decodeURI(urls.yandexUrl)}
        </a>
      </div>
      <div>
        <a target="_blank" rel="noopener noreferrer" href={urls.googleUrl}>
          {decodeURI(urls.googleUrl)}
        </a>
      </div>
      <div>
        <a target="_blank" rel="noopener noreferrer" href={urls.deeplUrl}>
          {decodeURI(urls.deeplUrl)}
        </a>
      </div>
    </div>
  );
};

export default App;
