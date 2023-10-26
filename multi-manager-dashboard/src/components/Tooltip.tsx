import React, { useState } from 'react';

const Tooltip = ({ content, children, direction = 'top' }) => {
    const [show, setShow] = useState(false);
  
    const baseStyle = 'absolute px-2 py-2 text-xs rounded-md shadow-lg bg-white text-gray-600 whitespace-nowrap border border-gray-200';
  
    const positions = {
      top: 'bottom-full mb-2',
      bottom: 'top-full mt-2',
      left: 'right-full mr-2',
      right: 'left-full ml-2'
    };
  
    return (
      <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {show && <div className={`${baseStyle} ${positions[direction]}`}>{content}</div>}
        {children}
      </div>
    );
  };
  
  export default Tooltip;