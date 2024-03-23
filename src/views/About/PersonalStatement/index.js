import { forwardRef /* , useEffect, useState */ } from 'react';
// import ReactMarkdown from 'react-markdown';
// import dataUrl from '../../../../private/personalstatement.md';
import skillHtml from '../../../../private/skill.html';
import './index.sass';

// const data = dataUrl.split(',')[1];

export default forwardRef(function PersonalStatement(props, ref) {
  // const { labels,jump } = props;
  // const foo = JSON.stringify(labels);

  // console.log(labels);
  // const [txt, setTxt] = useState('');

  // useEffect(() => {
  //   if (window) {
  //     const bytes = window.atob(data);
  //     const u8arr = new Uint8Array(bytes.length);
  //     for (let i = 0; i < bytes.length; i++) {
  //       u8arr[i] = bytes.charCodeAt(i);
  //     }
  //     setTxt(new TextDecoder().decode(u8arr));
  //   }
  // }, []);

  return (
    <div className="myapp-comp-skill">
      <div
        ref={ref}
        dangerouslySetInnerHTML={{ __html: skillHtml }}
        className="myapp-comp-skill-content"
      ></div>
      <div className="myapp-comp-skill-labels">
        <Labels {...props}></Labels>
      </div>
      {/* <div className="myapp-comp-personalstatement">
        <ReactMarkdown>{txt}</ReactMarkdown>
      </div> */}
    </div>
  );
});

function Labels({ labels, jump }) {
  return labels.map((label) => {
    return label.tag === 'h3' ? (
      <div className="myapp-comp-skill-labels-h3" key={label.idx}>
        {label.text}
      </div>
    ) : (
      <div
        className="myapp-comp-skill-labels-h4"
        key={label.idx}
        onClick={() => jump(label.idx)}
      >
        {label.text}
      </div>
    );
  });
}
