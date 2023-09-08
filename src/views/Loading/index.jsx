import { LoadingOutlined } from '@ant-design/icons';
import { createPortal } from 'react-dom';
import './index.sass';

export default function Loading() {
  return createPortal(
    <div className="myapp-comp-loading">
      <LoadingOutlined />
    </div>,
    document.body
  );
}
