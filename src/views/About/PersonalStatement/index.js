import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import dataUrl from '../../../../private/personalstatement.md';
import './index.sass';

const data = dataUrl.split(',')[1];

export default function PersonalStatement() {
  const [txt, setTxt] = useState('');

  useEffect(() => {
    if (window) {
      const bytes = window.atob(data);
      const u8arr = new Uint8Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) {
        u8arr[i] = bytes.charCodeAt(i);
      }
      setTxt(new TextDecoder().decode(u8arr));
    }
  }, []);

  return (
    <div className="myapp-comp-personalstatement">
      <ReactMarkdown>{txt}</ReactMarkdown>
    </div>
  );
}
