import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import list from '../../../private/projects.json';
import PersonalStatement from './PersonalStatement';
import ProjectList from './ProjectList';
import Resume from './Resume';
import './index.sass';

export default function About() {
  const [tab, setTab] = useState('projects');
  const [labels, setLabels] = useState([]);

  const theme = useSelector((state) => state.user.preference.theme);

  const scrollRef = useRef(null);
  const skillRef = useRef(null);

  const tabClassName = (thisTag, voidItem = false) => {
    const className = voidItem
      ? 'myapp-about-main-center-tabs-voiditem'
      : 'myapp-about-main-center-tabs-item';
    if (thisTag === tab) {
      return className + '-chosen-' + theme;
    }
    return className;
  };

  const jump = (idx) => {
    const base = skillRef.current.children[0].offsetTop;

    scrollRef.current.scrollTop =
      skillRef.current.children[idx].offsetTop - base;
  };

  useEffect(() => {
    if (window) {
      const hElements = [];
      for (const [idx, el] of Array.from(skillRef.current.children).entries()) {
        const tag = el.tagName.toLowerCase();
        if (['h3', 'h4'].includes(tag)) {
          hElements.push({ tag, text: el.innerHTML, idx });
        }
      }
      setLabels(hElements);
    }
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTop = 0;
  }, [tab]);

  return (
    <div className="myapp-about">
      <div className="myapp-about-main-left">
        <Resume />
      </div>

      <div className="myapp-about-main-center" ref={scrollRef}>
        <div
          className={
            theme === 'light'
              ? 'myapp-about-main-center-tabs tabs-theme-light'
              : 'myapp-about-main-center-tabs tabs-theme-dark'
          }
        >
          <span
            className={tabClassName('projects')}
            onClick={() => setTab('projects')}
          >
            个人项目
          </span>
          <span className={tabClassName('projects', true)}>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>

          <span
            className={tabClassName('statement')}
            onClick={() => setTab('statement')}
          >
            个人技能
          </span>
          <span className={tabClassName('statement', true)}>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>

          <div className="myapp-about-main-center-tabs-blank">&nbsp;</div>
        </div>

        <div className="myapp-about-main-center-content">
          <div
            className={
              'myapp-about-main-center-content-projects' +
              (tab === 'projects' ? '' : ' invisible')
            }
          >
            <hr />
            <ProjectList list={list} />
          </div>

          <div className={tab === 'statement' ? '' : 'invisible'}>
            <PersonalStatement ref={skillRef} labels={labels} jump={jump} />
          </div>
        </div>
      </div>
    </div>
  );
}
