import { ChangeEvent, useState } from 'react';
import { transliterate } from './Translit';
import './App.css';

const App = () => {
  const yandexPrefix = 'https://translate.yandex.com/?source_lang=ru&target_lang=en&text=';
  const googlePrefix = 'https://translate.google.com/?op=translate&sl=ru&tl=en&text=';
  const deeplPrefix = 'https://www.deepl.com/translator#ru/en/';
  const initialUrlState = {yandexUrl:'', googleUrl:'', deeplUrl:''};

  const [text, setText] = useState('');
  const [urls, setUrls] = useState(initialUrlState);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let transliteration = transliterate(event.target.value);
    setText(transliteration);

    if (transliteration !== '') {
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
        <textarea autoFocus lang="ru" rows={23} cols={55} onChange={handleChange} value={text} />
      </div>
      <div>
        <a target="_blank" rel="noopener noreferrer" href={urls.yandexUrl}>{decodeURI(urls.yandexUrl)}</a>
      </div>
      <div>
        <a target="_blank" rel="noopener noreferrer" href={urls.googleUrl}>{decodeURI(urls.googleUrl)}</a>
      </div>
      <div>
        <a target="_blank" rel="noopener noreferrer" href={urls.deeplUrl}>{decodeURI(urls.deeplUrl)}</a>
      </div>
    </div>
  );
};

export default App;
