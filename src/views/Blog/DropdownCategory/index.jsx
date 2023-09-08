import { useEffect, useState } from 'react';
import Category from '../Category';
import './index.sass';

export default function DropdownCategory() {
  const [dropdown, setDropdown] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsWaiting(false), 400);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div onMouseLeave={() => setDropdown(false)}>
      <div
        onClick={() => setDropdown(true)}
        className="myapp-comp-dropdowncategory-button"
      >
        {isWaiting ? <div>Loading...</div> : <div>Catalog&gt;&gt;</div>}
      </div>
      {dropdown && (
        <div className="myapp-comp-dropdowncategory-files">
          <Category />
        </div>
      )}
    </div>
  );
}
