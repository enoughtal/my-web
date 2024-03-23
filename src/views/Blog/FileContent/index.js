import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import './index.sass';

export default function FileContent() {
  const { title, createdAt, content, random } = useSelector(
    (state) => state.files.article
  );

  const prompt = random ? '（ 这篇为随机选取，在右侧目录选择 ）' : undefined;
  const time = createdAt ? new Date(createdAt).toISOString().slice(0, 10) : '';

  return (
    <div className="myapp-comp-filecontent">
      <div className="myapp-comp-filecontent-prompt">{prompt}</div>
      <div className="myapp-comp-filecontent-title">
        {title?.replace('#', '')}
      </div>
      <div className="myapp-comp-filecontent-time">{time}</div>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
