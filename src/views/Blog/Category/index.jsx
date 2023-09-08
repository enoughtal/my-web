import {
  CaretRightOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import filesSlice, { getFile } from '../../../store/files';
import './index.sass';

export default function Category() {
  const selectedSubjects = useSelector((state) => state.files.selectedSubjects);
  const selectedFile = useSelector((state) => state.files.selectedFile);
  const category = useSelector((state) => state.files.category);
  const dispatch = useDispatch();

  const clickSubject = (subject) => {
    dispatch(filesSlice.actions.selectSubject(subject));
  };

  const clickFile = (subject, file) => {
    if (file !== selectedFile) {
      dispatch(filesSlice.actions.selectFile(file));
      const data = {
        subject,
        filename: file + '.md',
      };
      dispatch(getFile(data));
    }
  };

  return Object.entries(category).map(([subject, files], i) => {
    return (
      <div key={i} className="myapp-comp-category-subject">
        <span onClick={() => clickSubject(subject)}>
          {subject}
          &nbsp;&nbsp;
          {selectedSubjects.includes(subject) ? (
            <UpOutlined />
          ) : (
            <DownOutlined />
          )}
        </span>

        {selectedSubjects.includes(subject)
          ? files.map((file, j) => {
              return (
                <div key={j} className="myapp-comp-category-file">
                  <span>
                    {file === selectedFile ? <CaretRightOutlined /> : ''}
                  </span>
                  <span onClick={() => clickFile(subject, file)}>{file}</span>
                </div>
              );
            })
          : ''}
      </div>
    );
  });
}
