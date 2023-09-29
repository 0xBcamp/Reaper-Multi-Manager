import React from 'react';

interface Props {
  title: string;
  value: string;
}

const VaultSummaryMetrics: React.FC<Props> = ({ title, value }) => {
  return (
    <div className='flex flex-col items-start'>
      <div className="text-gray-400 text-xs">{title}:</div>
      <div className="text-gray-700 text-sm">{value}</div>
    </div>
  );
}

export default VaultSummaryMetrics;