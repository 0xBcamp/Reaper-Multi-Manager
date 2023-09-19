import React from 'react';

interface IFormLinkProps {
  text: string;
  clicked: () => void;
}

const FormLink: React.FC<IFormLinkProps> = ({ text, clicked }) => {
  return (
    <div className={`text-sm font-medium text-blue-400 cursor-pointer`} onClick={clicked}>
      {text}
    </div>
  );
}

export default FormLink;
