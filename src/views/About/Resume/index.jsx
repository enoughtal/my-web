import { GithubOutlined, WechatOutlined } from '@ant-design/icons';
import Tooltip from '@cdztt/tooltip-react';
import avatar from './avatar-transparent.png';
import './index.sass';

export default function Resume() {
  return (
    <div className="myapp-comp-resume">
      <img src={avatar} alt="avatar" width={60} />

      <div className="myapp-comp-resume-github">
        <a href="https://github.com/cdztt" target="_blank" rel="noreferrer">
          <GithubOutlined />
        </a>
      </div>

      <div>
        <WechatOutlined />
        <Tooltip place="bottom">TEL/WX: 181 1825 5713</Tooltip>
      </div>
    </div>
  );
}
