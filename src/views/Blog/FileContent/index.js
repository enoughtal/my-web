import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import './index.sass';

export default function FileContent() {
  const { title, createdAt, content } = useSelector(
    (state) => state.files.article
  );
  const time = createdAt ? new Date(createdAt).toISOString().slice(0, 10) : '';

  return (
    <div className="myapp-comp-filecontent">
      <div className="myapp-comp-filecontent-title">{title}</div>
      <div className="myapp-comp-filecontent-time">{time}</div>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
